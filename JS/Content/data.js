


// Something to base off from...
let EN_SYS_SCHEMA = {
    TestUnit1: {
        DisplayName:                    "foo",

        Base_OvercurrentUsage:          1,

        SlotsInto:                      [
                                            "BMC.Depot",
                                        ],

        Modifiers:                      [
                                            {   Stat:          "BMC.Depot.Base_MaximumCapacity",
                                                EffectType:     "ADD",
                                                Effect:         D(1)
                                            }
                                        ]
    }
}

let STORY_SYS_SCHEMA = {
    Ch_0: {
        1: {
            Title: "Prologue I",
            Description: "ee"
        }
    }
}

let RESEARCH_SYS_SCHEMA = {
    PL0: {
        1: {
            UNLOCKED: true,
            RESEARCHED: false,

            HASH_REQUIREMENT: D(10),

            Title: "Test I",
            Description: "This is a test",

            X_POS: 0,
            Y_POS: 0,
            NODES: [2, 3]
        },
        2: {
            UNLOCKED: true,
            RESEARCHED: false,

            HASH_REQUIREMENT: D(10),

            Title: "Test II",
            Description: "This is a test",

            X_POS: 1,
            Y_POS: 0,
        },
        3: {
            UNLOCKED: () => { return RESEARCH_SYS_SCHEMA.PL0[2].RESEARCHED },
            RESEARCHED: false,

            HASH_REQUIREMENT: D(10),

            Title: "Test III",
            Description: "This is a test",

            X_POS: 2,
            Y_POS: 1,
        }
    }
}

let CUTSCENE_SYS_SCHEMA = {
    1: {

    }
}

addLayer("data", {
    startData() {
        return {
            unlocked: true,
            points: D(0), // UNUSED
            caution: false,

            BMC: {
                IS_UNLOCKED:                    false,

                Progress:                       D(0),
                BASE_Maximum_Progress:          D(10),
                Tickrate:                       D(1),

                Bits:                           D(0),
                BASE_Bit_Gain:                  D(1),

                Level_SCHEMA: {
                    Level:                      D(0),

                    XP_Progress:                D(0),
                    BASE_Level_Requirement:     D(100),
                }
            },
            Depot: {
                IS_UNLOCKED:                                    false,
                DISREGARD_LOCKED_STATUS_AS_NON_FIRST_TIME:      false,

                RESET_PERMITTED:                                false,
                DEPOT_IX:                                       0
            },
            R_AND_D: {
                DevelopmentTree: {
                    BOUGHT_NODES: {}
                },
                ResearchTree: {
                    // TBD
                }
            }
        }
    },


    // MISC
    row: 0,
    layerShown: () => { return true },


    // MAIN
    update(delta) {
        const BMC_REF = player.data.BMC
        if (!BMC_REF) return


        const ACTUAL_Tickspeed = BMC_Hash_Rate()

        BitMachineRender_V2()
        DepotRender_V2()
        caution()
        CheckForProgress(delta)


        if (window.TooltipV3) {
            TooltipV3.RUN();
        }
    },

    buyables: {
        "WORK_AMOUNT": {
            cost(x) {
                let PowerI = new Decimal(1.5)
                let Calculation = new Decimal(2).mul(Decimal.pow(PowerI, x.pow(1))).ceil()
                return Calculation;
            },
            effect(x) {
                let Flat = new Decimal(1)
                let Calculation = new Decimal(1).mul(Flat.mul(x).floor())
                return Calculation
            },
            buy() {
                player[this.layer].BMC.Bits = player[this.layer].BMC.Bits.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            canAfford() {
                return player[this.layer].BMC.Bits.gte(this.cost())
            },
            unlocked() {
                return true
            }
        },
    },


    tabFormat: {
        "Main": {
            content: [
                ['raw-html', () => {
                    return `
                        <div class="bit-machine-container">
                            <div class="bit-machine-container-BG"></div>
                            
                            <div class="bit-machine-container-inline" 
                                onmouseenter="" 
                                onmouseleave="TooltipV3.CLOSE()">
                            <span class="container-name">Bit Machine</span>
                            <span class="container-description" id="Bit-Machine-DESC"></span>
                            
                            <span class="container-state">PRODUCE</span>
                            <span class="container-state-ghost-l">PRODUCE</span>
                            <span class="container-state-ghost-r1">PRODUCE</span>
                            <span class="container-state-ghost-r2">PRODUCE</span>
                            
                            <div class="container-state-sub-window">
                                <div class="container-state-sub-strip">
                                    <div class="strip-item">DATA STREAM</div>
                                    <div class="strip-item">DATA STREAM</div>
                                    <div class="strip-item">DATA STREAM</div>
                                    <div class="strip-item">DATA STREAM</div>
                                    <div class="strip-item">DATA STREAM</div>
                                    <div class="strip-item">DATA STREAM</div>
                                    <div class="strip-item">DATA STREAM</div>
                                    <div class="strip-item">DATA STREAM</div> 
                                    <div class="strip-item">DATA STREAM</div>
                                    <div class="strip-item">DATA STREAM</div>  
                                </div>
                            </div>
                            
                            <div class="bit-machine-progress-container">
                                <div class="bit-machine-progress"></div>
                            </div>
                            
                            <div class="container-main-currency" id="BITS">
                                <span 
                                    class="value-amount" 
                                    id="BIT-AM"
                                ></span>
                                <img src="images/Resource-Bits.png" width="48" style="opacity: 0.125">
                                <img 
                                    src="images/Resource-Bits.png" 
                                    width="16"
                                    id="BIT-RESOURCE-IMG">
                                <span id="BIT-RESOURCE-NAME">BITS</span>
                            </div>
                        </div>
                    </div>
                    <div class="depot-container">
                    <button id="depot-permit-button">Advance</button>
                        <div class="depot-stage-change-container">
                            <video 
                                src="images/DepotStageSeq.webm" 
                                muted 
                                height="64" 
                                id="DEPOT-VID"></video>
                        </div>
                        <div class="depot-BG"></div>
                        <div class="depot-inline">
                            <span class="s-container-name">Depot</span>
                            <span class="s-container-description">STAGE <span id="stage-change" style="font-size: 2rem; font-family: CRDISerifReg">0</span></span>
                            
                            <div class="depot-progress-container">
                                <span class="depot-progress-requirement"></span>
                            </div>
                        </div>  
                    </div>
                    
                 
                    `
                }],
            ]
        },
        "Research": {
            content: [
                ['raw-html', () => {
                    return `
                    <span>[ Not available in ${VERSION.num} ]</span>
                    `
                }]
            ]
        }
    }

})