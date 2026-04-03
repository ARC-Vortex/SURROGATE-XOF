// Depot Render V2.001
function DepotRender_V2() {
    if (!DEPOT_PRELOAD_OBJECT.DEPOT_CONTAINER || !document.contains(DEPOT_PRELOAD_OBJECT.DEPOT_CONTAINER)) {
        Depot_Init()


        // Exit for NOW
        return
    }
    let ROOT_STATE_KEY = "LOCKED"
    let STATE_KEY = Check_For_Depot() ? "UNLOCKED" : "LOCKED"
    if (Check_For_Depot() || player.data.Depot.DISREGARD_LOCKED_STATUS_AS_NON_FIRST_TIME) ROOT_STATE_KEY = "UNLOCKED"

    if (DEPOT_PRELOAD_OBJECT.DEPOT_CONTAINER) {
        DEPOT_PRELOAD_OBJECT.DEPOT_CONTAINER.setAttribute("data-state", ROOT_STATE_KEY)
        DEPOT_PRELOAD_OBJECT.DEPOT_PROG_BTN.setAttribute("data-state", STATE_KEY)
        DEPOT_PRELOAD_OBJECT.DEPOT_PROG_BTN_TEXT.setAttribute("data-state", STATE_KEY)
    }



    DEPOT_PRELOAD_OBJECT.DEPOT_PROG_BTN_TEXT.innerText = `You need ${format(Depot_Progression())} Bits`
    DEPOT_PRELOAD_OBJECT.DEPOT_STAGE_CHANGE.innerText = `${player.data.Depot.DEPOT_IX}`
}