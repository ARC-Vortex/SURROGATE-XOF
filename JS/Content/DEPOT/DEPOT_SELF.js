// Depot Render V2.001
function DepotRender_V2() {
    if (Check_For_Depot() || player.data.Depot.DISREGARD_LOCKED_STATUS_AS_NON_FIRST_TIME) {
        DEPOT_PRELOAD_OBJECT.DEPOT_CONTAINER.style.opacity = "1"
        DEPOT_PRELOAD_OBJECT.DEPOT_CONTAINER.style.userSelect = "all"
    } else {
        DEPOT_PRELOAD_OBJECT.DEPOT_CONTAINER.style.opacity = "0"
        DEPOT_PRELOAD_OBJECT.DEPOT_CONTAINER.style.userSelect = "none"
    }
    if (Check_For_Depot()) {
        DEPOT_PRELOAD_OBJECT.DEPOT_PROG_BTN.style.opacity = "1"
        DEPOT_PRELOAD_OBJECT.DEPOT_PROG_BTN_TEXT.style.opacity = "0"
    } else {
        DEPOT_PRELOAD_OBJECT.DEPOT_PROG_BTN.style.opacity = "0"
        DEPOT_PRELOAD_OBJECT.DEPOT_PROG_BTN_TEXT.style.opacity = "1"
    }

    DEPOT_PRELOAD_OBJECT.DEPOT_PROG_BTN_TEXT.innerText = `You need ${format(Depot_Progression())} Bits`
    DEPOT_PRELOAD_OBJECT.DEPOT_STAGE_CHANGE.innerText = `${player.data.Depot.DEPOT_IX}`
}