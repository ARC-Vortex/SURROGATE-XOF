let DEPOT_PRELOAD_OBJECT = {
}

function Fill_Depot_Preload() {
    DEPOT_PRELOAD_OBJECT.DEPOT_CONTAINER = document.querySelector(".depot-container")

    DEPOT_PRELOAD_OBJECT.DEPOT_PROG_BTN = document.getElementById("depot-permit-button")
    DEPOT_PRELOAD_OBJECT.DEPOT_PROG_BTN_TEXT = document.querySelector(".depot-progress-requirement")
    DEPOT_PRELOAD_OBJECT.DEPOT_STAGE_CHANGE = document.getElementById("stage-change")
    DEPOT_PRELOAD_OBJECT.DEPOT_PROG_VID = document.getElementById("DEPOT-VID")
}

function Depot_Init() {
    Fill_Depot_Preload()
    if (!DEPOT_PRELOAD_OBJECT.DEPOT_CONTAINER) {
        // Exit IMMEDIATELY, to avoid a fatal error
        return
    }

    DEPOT_PRELOAD_OBJECT.DEPOT_PROG_BTN.addEventListener("mousedown", function () {
        if (player.data.BMC.Bits.gte(Depot_Progression())) {
            const VID = DEPOT_PRELOAD_OBJECT.DEPOT_PROG_VID
            if (VID) {
                VID.currentTime = 0
                VID.style.display = "block"
                VID.play()

                CHECK_FOR_CANCEL = setInterval(() => {
                    if (VID.ended) {
                        clearInterval(CHECK_FOR_CANCEL)
                        Depot_Progression_Reset()
                        VID.style.display = "none"
                    } else if (!document.contains(VID)) {
                        clearInterval(CHECK_FOR_CANCEL)
                        Depot_Progression_Reset()
                    }
                }, 16.666)
            }
        }
    })
}