// Bit Machine Render V2.002
function BitMachineRender_V2() {
    if (!BMC_PRELOAD_OBJECT.BMC_CONTAINER || !document.contains(BMC_PRELOAD_OBJECT.BMC_CONTAINER)) {
        BMC_Init()


        // Exit for NOW
        return
    }
    const {BASE_Reward, DEPOT_Nerf} = BMC_Hash_Reward()


    BMC_PRELOAD_OBJECT.BIT_AM.innerHTML = `${FormatV2(value_transition_smoothing("bits", player.data.BMC.Bits))}`


    const STATE_KEY = OVERWRITE_DESCRIPTION_VIA_RESOURCE_HOVER ? "OBSERVE" : "BASE"

    const BMC_DESCRIPTION_DEPOT_NERF = Check_For_Depot() ? `<br> Current nerf <span style="font-family: CRDIReg">^${DEPOT_Nerf}</span> or <span style="font-family: CRDIReg">${format(BASE_Reward)}</span> Bits / cycle` : ``
    const BMC_DESCRIPTION_TEXTS = OVERWRITE_DESCRIPTION_VIA_RESOURCE_HOVER ? `Bits are generated passively, without any user input required. However "Bit Machine" will have it's output heavily penalized once it's past "Depot's" requirement. ${BMC_DESCRIPTION_DEPOT_NERF}` : `This module generates Bits!`

    const BMC_STATE_TEXTS = OVERWRITE_DESCRIPTION_VIA_RESOURCE_HOVER ? `OBSERVE` : `PRODUCE`
    const GHOST_REF = [
        BMC_PRELOAD_OBJECT.CSG_L,
        BMC_PRELOAD_OBJECT.CSG_R1,
        BMC_PRELOAD_OBJECT.CSG_R2,
    ]
    GHOST_REF.forEach(GHOST => {
        if (GHOST) {
            GHOST.style.opacity = OVERWRITE_DESCRIPTION_VIA_RESOURCE_HOVER ? 1 : 0
            SyncUIHover(GHOST, BMC_STATE_TEXTS, STATE_KEY)
        }
    })
    SyncUIHover(BMC_PRELOAD_OBJECT.BMC_DESCRIPTION, BMC_DESCRIPTION_TEXTS, STATE_KEY)
    SyncUIHover(BMC_PRELOAD_OBJECT.BMC_STATE, BMC_STATE_TEXTS, STATE_KEY)
    BMC_PRELOAD_OBJECT.BIT_RES_IMG.style.opacity = OVERWRITE_DESCRIPTION_VIA_RESOURCE_HOVER ? 0 : 1
    BMC_PRELOAD_OBJECT.BIT_RES_NAME.style.opacity = OVERWRITE_DESCRIPTION_VIA_RESOURCE_HOVER ? 1 : 0


    if (BMC_PRELOAD_OBJECT.BMC_Progress) {
        let {Quantization} = CheckForProgress()
        BMC_PRELOAD_OBJECT.BMC_Progress.style.width = `${Quantization.mul(100)}%`
    }
}

// function GetBMCRender() {
//     // Whenever DOM can't access the first object in a list, 99% of cases it can't access next elements after it either
//     // so force call it
//     if (!PRELOAD_OBJECT.BIT_AM || !document.contains(PRELOAD_OBJECT.BIT_AM)) { FillPreloadObject(); BMC_RESOURCE_HOVER = false }
//     if (!PRELOAD_OBJECT.BIT_AM) return
//
//     PRELOAD_OBJECT.BIT_AM.innerHTML = `${FormatV2(value_transition_smoothing("bits", player.data.BMC.Bits))}`
//
//
//     const BMC_DESCRIPTION_TEXTS = {
//         DEF: `This module generates Bits!`,
//         DEPOT: `Bits will be generated till depot gets full. If depot does reach to maximum capacity, no more Bits will be generated and those that are, will be considered as waste which don't get added.`,
//     }
//     const STATE_TEXTS = {
//         DEF: `PRODUCE`,
//         DEPOT: `OBSERVE`,
//     }
//     if (PRELOAD_OBJECT.BMC_DESCRIPTION) {
//         let IX = BMC_DESCRIPTION_TEXTS.DEF
//
//
//         if (OVERWRITE_DESCRIPTION_VIA_RESOURCE_HOVER)  {
//             IX = BMC_DESCRIPTION_TEXTS.DEPOT
//         }
//         if (PRELOAD_OBJECT.BMC_DESCRIPTION.getAttribute("IX-CHG-INP") !== IX) {
//             Scrambler(PRELOAD_OBJECT.BMC_DESCRIPTION, IX)
//             PRELOAD_OBJECT.BMC_DESCRIPTION.setAttribute("IX-CHG-INP", IX)
//         }
//     }
//     if (PRELOAD_OBJECT.BMC_STATE) {
//         let IX = STATE_TEXTS.DEF
//
//
//         if (OVERWRITE_DESCRIPTION_VIA_RESOURCE_HOVER)  {
//             IX = STATE_TEXTS.DEPOT
//             PRELOAD_OBJECT.CSG_L.innerText = IX
//             PRELOAD_OBJECT.CSG_R1.innerText = IX
//             PRELOAD_OBJECT.CSG_R2.innerText = IX
//         }
//         if (PRELOAD_OBJECT.BMC_STATE.getAttribute("IX-CHG-INP") !== IX) {
//             Scrambler(PRELOAD_OBJECT.BMC_STATE, IX)
//             PRELOAD_OBJECT.BMC_STATE.setAttribute("IX-CHG-INP", IX)
//         }
//     }
//
//
//     if (PRELOAD_OBJECT.BMC_Progress) {
//         let {Quantization} = CheckForProgress()
//         PRELOAD_OBJECT.BMC_Progress.style.width = `${Quantization.mul(100)}%`
//     }
//
//     PRELOAD_OBJECT.DEPOT_STAGE_CHANGE.innerHTML = `${player.data.Depot.DEPOT_IX}`
//
//     if (document.querySelector(".depot-progress-requirement")) {
//         document.querySelector(".depot-progress-requirement").innerHTML = `You need ${format(value_transition_smoothing("bmc_depot", BMC_Depot_Progression()), 3)} Bits`
//     }
//
//     if (BMC_RESOURCE_HOVER) return
//     if (PRELOAD_OBJECT.BIT_AM_CONT) {
//         PRELOAD_OBJECT.BIT_AM_CONT.addEventListener("mouseenter", () => {
//             OVERWRITE_DESCRIPTION_VIA_RESOURCE_HOVER = true
//             console.log("test")
//
//             document.getElementById("BIT-RESOURCE-IMG").style.opacity = 0
//             document.getElementById("BIT-RESOURCE-NAME").style.opacity = 1
//             document.querySelector(".container-state-sub-window").style.opacity = 1
//
//             document.querySelector(".container-state-ghost-l").style.opacity = 1
//             document.querySelector(".container-state-ghost-r1").style.opacity = 1
//             document.querySelector(".container-state-ghost-r2").style.opacity = 1
//         })
//
//         PRELOAD_OBJECT.BIT_AM_CONT.addEventListener("mouseleave", () => {
//             OVERWRITE_DESCRIPTION_VIA_RESOURCE_HOVER = false
//
//
//             document.getElementById("BIT-RESOURCE-IMG").style.opacity = 1
//             document.getElementById("BIT-RESOURCE-NAME").style.opacity = 0
//             document.querySelector(".container-state-sub-window").style.opacity = 0
//
//             document.querySelector(".container-state-ghost-l").style.opacity = 0
//             document.querySelector(".container-state-ghost-r1").style.opacity = 0
//             document.querySelector(".container-state-ghost-r2").style.opacity = 0
//
//             TooltipV3.CLOSE()
//         })
//
//         BMC_RESOURCE_HOVER = true
//     }
//
//     document.getElementById("kill-me").addEventListener("mousedown", () => {
//         document.getElementById("DEPOT-VID").style.opacity = 1
//         document.getElementById("DEPOT-VID").play()
//         document.getElementById("kill-me").enabled = false
//         document.getElementById("kill-me").style.display = "none"
//     })
//     document.getElementById("DEPOT-VID").addEventListener("ended", () => {
//         document.getElementById("DEPOT-VID").style.opacity = 0
//         document.getElementById("kill-me").enabled = true
//         document.getElementById("kill-me").style.display = "block"
//
//         BMC_Depot_Progression_Reset()
//     })
//
// }
//
// GetBMCRender()

function caution() {

    if (player.data.caution == false) {
        document.getElementById("understood").addEventListener("mousedown", () => {
            player.data.caution = true
            document.querySelector(".caution").style.display = "none"
        })
    } else {
        document.querySelector(".caution").style.display = "none"
    }
}