let BMC_PRELOAD_OBJECT = {
}

function Fill_BMC_Preload() {
    BMC_PRELOAD_OBJECT.BMC_CONTAINER = document.querySelector(".bit-machine-container")


    BMC_PRELOAD_OBJECT.BIT_AM = document.querySelector("#BIT-AM")
    BMC_PRELOAD_OBJECT.BIT_AM_CONT = document.querySelector("#BITS")
    BMC_PRELOAD_OBJECT.BIT_RES_IMG = document.querySelector("#BIT-RESOURCE-IMG")
    BMC_PRELOAD_OBJECT.BIT_RES_NAME = document.querySelector("#BIT-RESOURCE-NAME")

    BMC_PRELOAD_OBJECT.BMC_DESCRIPTION = document.getElementById("Bit-Machine-DESC")
    BMC_PRELOAD_OBJECT.DEPOT_DESCRIPTION = document.getElementById("Depot-DESC")

    BMC_PRELOAD_OBJECT.BMC_STATE = document.querySelector(".container-state")
    BMC_PRELOAD_OBJECT.BMC_Progress = document.querySelector(".bit-machine-progress")

    BMC_PRELOAD_OBJECT.TICKER_TRACK = document.querySelector(".container-state-sub-strip")
    BMC_PRELOAD_OBJECT.TICKER_ITEMS = document.querySelectorAll(".strip-item")

    BMC_PRELOAD_OBJECT.CSG_L = document.querySelector(".container-state-ghost-l")
    BMC_PRELOAD_OBJECT.CSG_R1 = document.querySelector(".container-state-ghost-r1")
    BMC_PRELOAD_OBJECT.CSG_R2 = document.querySelector(".container-state-ghost-r2")


    BMC_PRELOAD_OBJECT.DEPOT_STAGE_CHANGE = document.getElementById("stage-change")
}


let BMC_RESOURCE_HOVER = false
let OVERWRITE_DESCRIPTION_VIA_RESOURCE_HOVER = false
function BMC_Init() {
    BMC_RESOURCE_HOVER = false
    OVERWRITE_DESCRIPTION_VIA_RESOURCE_HOVER = false


    Fill_BMC_Preload()
    if (!BMC_PRELOAD_OBJECT.BMC_CONTAINER) {
        // Exit IMMEDIATELY, to avoid a fatal error
        return
    }


    BMC_PRELOAD_OBJECT.BIT_AM_CONT.addEventListener("mouseover", () => {OVERWRITE_DESCRIPTION_VIA_RESOURCE_HOVER = true})
    BMC_PRELOAD_OBJECT.BIT_AM_CONT.addEventListener("mouseleave", () => {OVERWRITE_DESCRIPTION_VIA_RESOURCE_HOVER = false})
}