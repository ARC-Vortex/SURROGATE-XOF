function Depot_Progression() {
    let IX = player.data.Depot.DEPOT_IX
    let REQ_Table = [
        D(5),
        D(1E4)
    ]

    if (IX >= REQ_Table.length) return D("1EE9")


    return REQ_Table[IX]
}

function Check_For_Depot() {
    let RESET_PERMITTED = player.data.BMC.Bits.gte(Depot_Progression()) ? true : false
    if (RESET_PERMITTED && !player.data.Depot.DISREGARD_LOCKED_STATUS_AS_NON_FIRST_TIME) {
        player.data.Depot.DISREGARD_LOCKED_STATUS_AS_NON_FIRST_TIME = true
    }
    return RESET_PERMITTED
}

function Depot_Progression_Reset() {
        player.data.BMC.Bits = D(0)
        player.data.Depot.DEPOT_IX += 1
}