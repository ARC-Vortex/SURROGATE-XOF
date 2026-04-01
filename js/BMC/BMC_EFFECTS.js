function BMC_Hash_Rate() {
    let BASE_Rate = D(1)

    BASE_Rate = BASE_Rate.add(tmp.data.buyables["WORK_AMOUNT"].effect)


    return BASE_Rate
}

function BMC_Hash_Reward() {
    let BASE_Reward = D(1)


    return BASE_Reward
}

function BMC_Depot_Progression() {
    let IX = player.data.Depot.DEPOT_IX
    let REQ_Table = [
        D(5),
        D(1E4)
    ]

    if (IX > 0 && player.data.Depot.DISREGARD_LOCKED_STATUS_AS_NON_FIRST_TIME === false) {
        player.data.Depot.DISREGARD_LOCKED_STATUS_AS_NON_FIRST_TIME = true
    }
    if (IX >= REQ_Table.length) return D("1EE9")

    return REQ_Table[IX]
}

function BMC_Depot_Progression_Reset() {
    if (player.data.BMC.Bits.gte(BMC_Depot_Progression())) {
        player.data.BMC.Bits = D(0)
        player.data.Depot.DEPOT_IX += 1
    }
}

function CheckForProgress(delta) {
    BMC_Depot_Progression()


    const HashRate = BMC_Hash_Rate()
    const HashReward = BMC_Hash_Reward()
    const DepotProgress = BMC_Depot_Progression()

    let Quantization = player.data.BMC.Progress.div(player.data.BMC.BASE_Maximum_Progress).clamp(0, 1)


    player.data.BMC.Progress = player.data.BMC.Progress.add(HashRate.mul(delta))
    if (player.data.BMC.Progress.gte(player.data.BMC.BASE_Maximum_Progress)) {
        player.data.BMC.Progress = new Decimal(0)
        player.data.BMC.Bits = player.data.BMC.Bits.add(HashReward)
    }


    return {Quantization}
}