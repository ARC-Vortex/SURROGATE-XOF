function Engrams(ACT, PAYLOAD = {}) {
    const BMC_REF = player.data.BMC
    const INVENTORY = player.data.Engram_TMP
    const ENGRAM_SCHEMA = EN_SYS_SCHEMA


    // meat and potatoes
    const GetModuleState = (TARGET) => {
        if (TARGET === "BMC.Machine") return BMC_REF.Machine
        if (TARGET === "BMC.Depot") return BMC_REF.Depot
        if (TARGET === "BMC.Proficiency") return BMC_REF.Proficiency


        return null
    }


    const HandleModuleSlots = (MOD_STATE) => {
        const N = MOD_STATE.Base_SlotAmount


        if (!Array.isArray(MOD_STATE.SlottedEngrams)) MOD_STATE.SlottedEngrams = []
        while (MOD_STATE.SlottedEngrams.length < N) MOD_STATE.SlottedEngrams.push(null)
    }


    const GetTypeID = (INSTANCE_ID) => INVENTORY.Instances?.[INSTANCE_ID]?.TypeID


    const CalculateEffects = (MOD_STATE) => {
        const OUT = []


        for (const INSTANCE_ID of MOD_STATE.SlottedEngrams) {
            if (!INSTANCE_ID) continue


            const TypeID = GetTypeID(INSTANCE_ID)
            const DEF = ENGRAM_SCHEMA[TypeID]
            if (!DEF?.Modifiers) continue


            for (const MODIFIER of DEF.Modifiers) {
                const STAT = MODIFIER.Stat
                const EFFECT_TYPE = MODIFIER.EffectType
                const EFFECT = MODIFIER.Effect

                OUT.push({ Stat: STAT, EffectType: EFFECT_TYPE, Effect: EFFECT })
            }
        }


        return OUT
    }

    const IsEngramBeingUsedAlready = (INSTANCE_ID) => {
        const MODS = [BMC_REF.Machine, BMC_REF.Depot, BMC_REF.Proficiency]


        return MODS.some((M) => Array.isArray(M.SlottedEngrams)
            && M.SlottedEngrams.includes(INSTANCE_ID))
    }


    const FindInstanceLocation = (INSTANCE_ID) => {
        const TARGETS = [
            { TargetID: "BMC.Machine", MOD: BMC_REF.Machine },
            { TargetID: "BMC.Depot", MOD: BMC_REF.Depot },
            { TargetID: "BMC.Proficiency", MOD: BMC_REF.Proficiency },
        ]


        for (const T of TARGETS) {
            if (!Array.isArray(T.MOD.SlottedEngrams)) continue


            const IDx = T.MOD.SlottedEngrams.indexOf(INSTANCE_ID)
            if (IDx !== -1) return { TargetID: T.TargetID , SlotIndex: IDx }
        }


        return null
    }


    const GetOvercurrentUsed = (MOD_STATE) => {
        let UsedOvercurrent = 0


        for (const INSTANCE_ID of MOD_STATE.SlottedEngrams) {
            if (!INSTANCE_ID) continue // please do


            const TypeID = GetTypeID(INSTANCE_ID)
            const DEF = ENGRAM_SCHEMA[TypeID]
            if (!DEF) continue


            UsedOvercurrent += DEF.Base_OvercurrentUsage ?? 0
        }


        return UsedOvercurrent
    }


    // main system
    if (ACT === "HANDLE_MODULE_SLOTS") {
        [BMC_REF.Machine, BMC_REF.Depot, BMC_REF.Proficiency].forEach(HandleModuleSlots)


        return { OK: true }
    }


    if (ACT === "GET_MODULE_INFO") {
        const { TargetID } = PAYLOAD


        const MOD_STATE = GetModuleState(TargetID)
        if (!MOD_STATE) return {
                                    OK: false,
                                    Reason: "Unknown or bad TargetID"
        }


        HandleModuleSlots(MOD_STATE)
        return {
                                    OK: true,
                                    TargetID,
                                    Slots: MOD_STATE.SlottedEngrams.slice(),
                                    UsedOvercurrent: GetOvercurrentUsed(MOD_STATE),
                                    OvercurrentLimit: MOD_STATE.Base_OvercurrentLimit ?? 0,
                                    SlotAmount: MOD_STATE.Base_SlotAmount ?? (MOD_STATE.SlottedEngrams?.length ?? 0)
        }
    }


    if (ACT === "FIND_INSTANCE_LOCATION") {
        const { INSTANCE_ID } = PAYLOAD
        if (!INSTANCE_ID) return {
                                    OK: false,
                                    Reason: "Missing INSTANCE_ID"
        }


        const LOCATION = FindInstanceLocation(INSTANCE_ID)
        return {
                                    OK: true,
                                    Location: LOCATION
        }
    }


    if (ACT === "PERMIT_INSTANCE") {
        const { TypeID_USER } = PAYLOAD
        if (!ENGRAM_SCHEMA[TypeID_USER]) return {
                                    OK: false,
                                    Reason: "Mismatch of TypeID",
        }


        if (!INVENTORY.NextInstanceNumber) INVENTORY.NextInstanceNumber = 1
        if (!INVENTORY.Instances) INVENTORY.Instances = {}


        const INSTANCE_ID = `EN_${INVENTORY.NextInstanceNumber++}`
        INVENTORY.Instances[INSTANCE_ID] = { TypeID: TypeID_USER }


        return { OK: true , INSTANCE_ID }
    }


    if (ACT === "ACTIVE_EFFECT_CALCULATION") {
        const { TargetID } = PAYLOAD
        const MOD_STATE = GetModuleState(TargetID)
        if (!MOD_STATE) return {
                                    OK: false,
                                    Reason: "Unknown or bad TargetID"
        }


        HandleModuleSlots(MOD_STATE)


        return { OK: true , Modifiers: CalculateEffects(MOD_STATE) }
    }


    if (ACT === "SLOT") {
        const { TargetID , INSTANCE_ID } = PAYLOAD
        const SlotIndex = Number(PAYLOAD.SlotIndex)


        const MOD_STATE = GetModuleState(TargetID)
        if (!MOD_STATE) return {
                                    OK: false,
                                    Reason: "Unknown or bad TargetID"
        }


        HandleModuleSlots(MOD_STATE)


        if (!Number.isInteger(SlotIndex) || SlotIndex < 0 || SlotIndex >= MOD_STATE.Base_SlotAmount) return {
                                    OK: false,
                                    Reason: "Unknown or bad SlotIndex"
        }
        if (MOD_STATE.SlottedEngrams[SlotIndex] != null) return {
                                    OK: false,
                                    Reason: "SlotIndex may be already in use"
        }


        if (!INVENTORY?.Instances?.[INSTANCE_ID]) return {
                                    OK: false,
                                    Reason: "Unknown or bad INSTANCE_ID"
        }
        if (IsEngramBeingUsedAlready(INSTANCE_ID)) return {
                                    OK: false,
                                    Reason: "INSTANCE_ID is being used already"
        }


        const TypeID = GetTypeID(INSTANCE_ID)
        const DEF = ENGRAM_SCHEMA[TypeID]
        if (!DEF) return {
                                    OK: false,
                                    Reason: "Unknown or bad Engram type"
        }


        if (!DEF.SlotsInto?.includes(TargetID)) return {
                                    OK: false,
                                    Reason: "Engram cannot be slotted here - mismatched type"
        }


        const UsedOvercurrent = GetOvercurrentUsed(MOD_STATE)
        const OvercurrentCost = DEF.Base_OvercurrentUsage ?? 0
        const OvercurrentLimit = MOD_STATE.Base_OvercurrentLimit ?? 0
        if (UsedOvercurrent + OvercurrentCost > OvercurrentLimit) return {
                                    OK: false,
                                    Reason: "Insufficient Overcurrent"
        }


        MOD_STATE.SlottedEngrams[SlotIndex] = INSTANCE_ID
        return { OK: true }
    }


    if (ACT === "UNSLOT") {
        const { TargetID } = PAYLOAD
        const SlotIndex = Number(PAYLOAD.SlotIndex)


        const MOD_STATE = GetModuleState(TargetID)
        if (!MOD_STATE) return {
                                    OK: false,
                                    Reason: "Unknown or bad TargetID"
        }


        HandleModuleSlots(MOD_STATE)


        if (!Number.isInteger(SlotIndex) || SlotIndex < 0 || SlotIndex >= MOD_STATE.Base_SlotAmount) return {
                                    OK: false,
                                    Reason: "Unknown or bad SlotIndex"
        }


        MOD_STATE.SlottedEngrams[SlotIndex] = null
        return { OK: true }
    }


    return {
                                    OK: false,
                                    Reason: "Wrong ACT call"
    }
}