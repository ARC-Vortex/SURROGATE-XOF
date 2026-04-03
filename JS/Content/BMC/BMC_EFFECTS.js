function BMC_Hash_Rate() {
    let BASE_Rate = D(1)
    let DEPOT_Nerf = D(0.200)
    BASE_Rate = BASE_Rate.add(tmp.data.buyables["WORK_AMOUNT"].effect)

    return BASE_Rate
}

function BMC_Hash_Reward() {
    let BASE_Reward = D(1)
    let DEPOT_Nerf = D(8)

    if (Check_For_Depot()) BASE_Reward = BASE_Reward.mul(D(0.500)).pow(DEPOT_Nerf)

    return {BASE_Reward, DEPOT_Nerf}
}


function CheckForProgress(delta) {
    const HashRate = BMC_Hash_Rate()
    const {BASE_Reward} = BMC_Hash_Reward()

    let Quantization = player.data.BMC.Progress.div(player.data.BMC.BASE_Maximum_Progress).clamp(0, 1)


    player.data.BMC.Progress = player.data.BMC.Progress.add(HashRate.mul(delta))
    if (player.data.BMC.Progress.gte(player.data.BMC.BASE_Maximum_Progress)) {
        player.data.BMC.Progress = new Decimal(0)
        player.data.BMC.Bits = player.data.BMC.Bits.add(BASE_Reward)
    }


    return {Quantization}
}