addLayer("AC", {
    name: "",
    rawText() {
        return `
     <div style="line-height: 10px">
     <b class="mT">C</b><br>
     <b class="ide">non-volatile</b>
     </div>`
    },
    position: 0,
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            RESOURCES: {
                "HEAT": {
                    "DISPLAY": "Heat",
                    "AMOUNT": new Decimal(0),
                    "LFTM_AMOUNT": new Decimal(0),
                    "MAX_CAPACITY": new Decimal(10),
                    "REQUIRED_RESOURCES": null,
                    "PRODUCTION": new Decimal(1),
                    "VOLUME": new Decimal(1),
                    "DIMENSIONALITY": new Decimal(1),
                    "AUTOMATION_STATE": new Decimal(0),
                    "AUTOMATION_CPT": new Decimal(4),
                    "AUTOMATORS_ASG": new Decimal(0),
                    "AUTOMATION_EFF": new Decimal(.2),
                    "UNLOCKED": new Decimal(0), // 0 for no , 1 for yes and 2 for perm
                    "UNLOCKED_AT": [null]
                },
                "TANKS": {
                    "DISPLAY": "Tanks",
                    "AMOUNT": new Decimal(0),
                    "LFTM_AMOUNT": new Decimal(0),
                    "MAX_CAPACITY": new Decimal(30),
                    "REQUIRED_RESOURCES": {
                        "I": new Decimal(10)
                    },
                    "PRODUCTION": new Decimal(1),
                    "VOLUME": new Decimal(1),
                    "DIMENSIONALITY": new Decimal(1),
                    "AUTOMATION_STATE": new Decimal(0),
                    "AUTOMATION_CPT": new Decimal(4),
                    "AUTOMATORS_ASG": new Decimal(0),
                    "AUTOMATION_EFF": new Decimal(.2),
                    "UNLOCKED": new Decimal(0),
                    "UNLOCKED_AT": [null, new Decimal(10)] // takes LFTM to account
                },
                "KILNS": {
                    "DISPLAY": "Kilns",
                    "AMOUNT": new Decimal(0),
                    "LFTM_AMOUNT": new Decimal(0),
                    "MAX_CAPACITY": new Decimal(10),
                    "REQUIRED_RESOURCES": {
                        "I": new Decimal(150),
                        "II": new Decimal(50)
                    },
                    "PRODUCTION": new Decimal(1),
                    "VOLUME": new Decimal(1),
                    "DIMENSIONALITY": new Decimal(1),
                    "AUTOMATION_STATE": new Decimal(0),
                    "AUTOMATION_CPT": new Decimal(4),
                    "AUTOMATORS_ASG": new Decimal(0),
                    "AUTOMATION_EFF": new Decimal(.2),
                    "UNLOCKED": new Decimal(0),
                    "UNLOCKED_AT": [null, null, new Decimal(50)] // takes LFTM to account
                },
                "FLUID": {
                    "DISPLAY": "Fluid",
                    "AMOUNT": new Decimal(0),
                    "LFTM_AMOUNT": new Decimal(0),
                    "MAX_CAPACITY": new Decimal(1000),
                    "REQUIRED_RESOURCES": {
                        "I": new Decimal(2.5e4),
                        "II": new Decimal(0),
                        "III": new Decimal(0)
                    },
                    "PRODUCTION": new Decimal(1),
                    "VOLUME": new Decimal(1),
                    "DIMENSIONALITY": new Decimal(1),
                    "AUTOMATION_STATE": new Decimal(0),
                    "AUTOMATION_CPT": new Decimal(4),
                    "AUTOMATORS_ASG": new Decimal(0),
                    "AUTOMATION_EFF": new Decimal(.2),
                    "UNLOCKED": new Decimal(0),
                    "UNLOCKED_AT": [null, new Decimal(1e5), new Decimal(20000), new Decimal(250)] // takes LFTM to
                                                                                                  // account
                },
                "RAW_MATERIALS": {
                    "DISPLAY": "Raw Materials",
                    "AMOUNT": new Decimal(0),
                    "LFTM_AMOUNT": new Decimal(0),
                    "MAX_CAPACITY": new Decimal(100),
                    "REQUIRED_RESOURCES": {
                        "I": new Decimal(1e7),
                        "II": new Decimal(1e5),
                        "III": new Decimal(1000),
                        "IV": null
                    },
                    "PRODUCTION": new Decimal(1),
                    "VOLUME": new Decimal(1),
                    "DIMENSIONALITY": new Decimal(1),
                    "AUTOMATION_STATE": new Decimal(0),
                    "AUTOMATION_CPT": new Decimal(4),
                    "AUTOMATORS_ASG": new Decimal(0),
                    "AUTOMATION_EFF": new Decimal(.2),
                    "UNLOCKED": new Decimal(0),
                    "UNLOCKED_AT": [null, new Decimal(1e90), new Decimal(1e60), new Decimal(1e40), null] // takes LFTM
                                                                                                         // to account
                }
            },
            SPECIAL_RESOURCES: {
                "Workers": {
                    "AMOUNT": new Decimal(0),
                    "USED_AM": new Decimal(0),
                    "MAX_CAPACITY": new Decimal(25),
                    "PRODUCTION_TIME": new Decimal(120),
                    "TIME_ELAPSED": new Decimal(0),
                    "IS_PRODUCING": false,
                    "REQUIRED_RESOURCES": [null, new Decimal(1000)]
                }
            },
        }
    },
    color: "#ffffff",
    requires: new Decimal(10),
    resource: "Accelerant",
    baseResource: "Points",
    baseAmount() {
        return player.points
    },
    type: "normal",
    exponent: 1,
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    update(delta) {
        let TICKRATE = new Decimal(1)

        if (player.AC.SPECIAL_RESOURCES["Workers"]["IS_PRODUCING"] === true) {
            player.AC.SPECIAL_RESOURCES["Workers"]["TIME_ELAPSED"] = player.AC.SPECIAL_RESOURCES["Workers"]["TIME_ELAPSED"].add((TICKRATE).mul(delta))
        }
        if (player.AC.SPECIAL_RESOURCES["Workers"]["TIME_ELAPSED"].gte(player.AC.SPECIAL_RESOURCES["Workers"]["PRODUCTION_TIME"])) {
            tmp.AC.PRODUCE_WORKERS_2();
            player.AC.SPECIAL_RESOURCES["Workers"]["IS_PRODUCING"] = false
        }

        if (player.AC.RESOURCES["HEAT"]["AUTOMATION_STATE"].eq(1) && player.AC.RESOURCES["HEAT"]["AUTOMATORS_ASG"].gt(0) && player.AC.RESOURCES["HEAT"]["AMOUNT"].lte(player.AC.RESOURCES["HEAT"]["MAX_CAPACITY"])) {
            player.AC.RESOURCES["HEAT"]["AMOUNT"] = player.AC.RESOURCES["HEAT"]["AMOUNT"].add(((player.AC.RESOURCES["HEAT"]["PRODUCTION"]).mul(delta)).mul(player.AC.RESOURCES["HEAT"]["AUTOMATION_EFF"]).mul(player.AC.RESOURCES["HEAT"]["AUTOMATORS_ASG"]))
            player.AC.RESOURCES["HEAT"]["LFTM_AMOUNT"] = player.AC.RESOURCES["HEAT"]["LFTM_AMOUNT"].add(((player.AC.RESOURCES["HEAT"]["PRODUCTION"]).mul(delta)).mul(player.AC.RESOURCES["HEAT"]["AUTOMATION_EFF"]).mul(player.AC.RESOURCES["HEAT"]["AUTOMATORS_ASG"]))

            player.AC.RESOURCES["HEAT"]["AMOUNT"] = player.AC.RESOURCES["HEAT"]["AMOUNT"].clampMax(player.AC.RESOURCES["HEAT"]["MAX_CAPACITY"])
            player.AC.RESOURCES["HEAT"]["AMOUNT"] = player.AC.RESOURCES["HEAT"]["AMOUNT"].clampMin(0) // failsafe?
        }

        if (player.AC.RESOURCES["TANKS"]["AUTOMATION_STATE"].eq(1) && player.AC.RESOURCES["TANKS"]["AUTOMATORS_ASG"].gt(0) && player.AC.RESOURCES["TANKS"]["AMOUNT"].lte(player.AC.RESOURCES["TANKS"]["MAX_CAPACITY"]) && player.AC.RESOURCES["HEAT"]["AMOUNT"].gte(player.AC.RESOURCES["TANKS"]["REQUIRED_RESOURCES"]["I"])) {
            player.AC.RESOURCES["TANKS"]["AMOUNT"] = player.AC.RESOURCES["TANKS"]["AMOUNT"].add(((player.AC.RESOURCES["TANKS"]["PRODUCTION"]).mul(delta)).mul(player.AC.RESOURCES["TANKS"]["AUTOMATION_EFF"]).mul(player.AC.RESOURCES["TANKS"]["AUTOMATORS_ASG"]))
            player.AC.RESOURCES["TANKS"]["LFTM_AMOUNT"] = player.AC.RESOURCES["TANKS"]["LFTM_AMOUNT"].add(((player.AC.RESOURCES["TANKS"]["PRODUCTION"]).mul(delta)).mul(player.AC.RESOURCES["TANKS"]["AUTOMATION_EFF"]).mul(player.AC.RESOURCES["TANKS"]["AUTOMATORS_ASG"]))

            player.AC.RESOURCES["HEAT"]["AMOUNT"] = player.AC.RESOURCES["HEAT"]["AMOUNT"].sub(((player.AC.RESOURCES["TANKS"]["REQUIRED_RESOURCES"]["I"]).mul(delta)).mul(player.AC.RESOURCES["TANKS"]["AUTOMATION_EFF"]).mul(player.AC.RESOURCES["TANKS"]["AUTOMATORS_ASG"]))

            player.AC.RESOURCES["TANKS"]["AMOUNT"] = player.AC.RESOURCES["TANKS"]["AMOUNT"].clampMax(player.AC.RESOURCES["TANKS"]["MAX_CAPACITY"])
            player.AC.RESOURCES["TANKS"]["AMOUNT"] = player.AC.RESOURCES["TANKS"]["AMOUNT"].clampMin(0)
        }

        if (player.AC.RESOURCES["KILNS"]["AUTOMATION_STATE"].eq(1) && player.AC.RESOURCES["KILNS"]["AUTOMATORS_ASG"].gt(0) && player.AC.RESOURCES["KILNS"]["AMOUNT"].lte(player.AC.RESOURCES["KILNS"]["MAX_CAPACITY"]) && player.AC.RESOURCES["HEAT"]["AMOUNT"].gte(player.AC.RESOURCES["KILNS"]["REQUIRED_RESOURCES"]["I"]) && player.AC.RESOURCES["TANKS"]["AMOUNT"].gte(player.AC.RESOURCES["KILNS"]["REQUIRED_RESOURCES"]["II"])) {
            player.AC.RESOURCES["KILNS"]["AMOUNT"] = player.AC.RESOURCES["KILNS"]["AMOUNT"].add(((player.AC.RESOURCES["KILNS"]["PRODUCTION"]).mul(delta)).mul(player.AC.RESOURCES["KILNS"]["AUTOMATION_EFF"]).mul(player.AC.RESOURCES["KILNS"]["AUTOMATORS_ASG"]))
            player.AC.RESOURCES["KILNS"]["LFTM_AMOUNT"] = player.AC.RESOURCES["KILNS"]["LFTM_AMOUNT"].add(((player.AC.RESOURCES["KILNS"]["PRODUCTION"]).mul(delta)).mul(player.AC.RESOURCES["KILNS"]["AUTOMATION_EFF"]).mul(player.AC.RESOURCES["KILNS"]["AUTOMATORS_ASG"]))

            player.AC.RESOURCES["HEAT"]["AMOUNT"] = player.AC.RESOURCES["HEAT"]["AMOUNT"].sub(((player.AC.RESOURCES["KILNS"]["REQUIRED_RESOURCES"]["I"]).mul(delta)).mul(player.AC.RESOURCES["KILNS"]["AUTOMATION_EFF"]).mul(player.AC.RESOURCES["KILNS"]["AUTOMATORS_ASG"]))

            player.AC.RESOURCES["TANKS"]["AMOUNT"] = player.AC.RESOURCES["TANKS"]["AMOUNT"].sub(((player.AC.RESOURCES["KILNS"]["REQUIRED_RESOURCES"]["II"]).mul(delta)).mul(player.AC.RESOURCES["KILNS"]["AUTOMATION_EFF"]).mul(player.AC.RESOURCES["KILNS"]["AUTOMATORS_ASG"]))

            player.AC.RESOURCES["KILNS"]["AMOUNT"] = player.AC.RESOURCES["KILNS"]["AMOUNT"].clampMax(player.AC.RESOURCES["KILNS"]["MAX_CAPACITY"])
            player.AC.RESOURCES["KILNS"]["AMOUNT"] = player.AC.RESOURCES["KILNS"]["AMOUNT"].clampMin(0)
        }
    },
    StoryProgression() {
        if (player.AC.RESOURCES["HEAT"]["LFTM_AMOUNT"].gte(player.AC.RESOURCES["TANKS"]["UNLOCKED_AT"][1]) && player.AC.RESOURCES["TANKS"]["UNLOCKED"].eq(0)) {
            player.AC.RESOURCES["TANKS"]["UNLOCKED"] = new Decimal(1);
            setTimeout(function () {
                createToast("Tanks are unlocked now!", "toast-success", 4000);
            }, 0);

            setTimeout(function () {
                createToast("Tanks need to use Heat on production", "toast-notify", 3000);
            }, 4300);

            setTimeout(function () {
                createToast("While Tanks help a lot for progression", "toast-notify", 3000);
            }, 7600);

            setTimeout(function () {
                createToast("I promise that next currency helps more =)", "toast-notify", 3000);
            }, 10900);

            setTimeout(function () {
                createToast("( Reach 50 LFTM Tanks to unlock it )", "toast-alert", 5000);
            }, 14200);

            setTimeout(function () {
                createToast("A new Index entry was added...", "toast-neutral", 5000);
            }, 19500);
        }

        if (player.AC.RESOURCES["TANKS"]["LFTM_AMOUNT"].gte(player.AC.RESOURCES["KILNS"]["UNLOCKED_AT"][2]) && player.AC.RESOURCES["KILNS"]["UNLOCKED"].eq(0)) {
            player.AC.RESOURCES["KILNS"]["UNLOCKED"] = new Decimal(1);
            setTimeout(function () {
                createToast("Kilns are unlocked now!", "toast-success", 4000);
            }, 0);

            setTimeout(function () {
                createToast("Kilns need to use alot of Heat and moderate amount of Tanks on production", "toast-notify", 3000);
            }, 4300);

            setTimeout(function () {
                createToast("However, Kilns might be your next best friend", "toast-notify", 3000);
            }, 7600);

            setTimeout(function () {
                createToast("Because their use for automation and such!", "toast-success", 4000);
            }, 10900);

            setTimeout(function () {
                createToast("You have also unlocked Workers, which takes 2 minutes to produce", "toast-notify", 3000);
            }, 15200);

            setTimeout(function () {
                createToast("But they allow automatic production of any resource!", "toast-notify", 3000);
            }, 18200);

            setTimeout(function () {
                createToast("( Reach 250 LFTM Kilns , 20K LFTM Tanks and 100K LFTM Heat, to unlock something new )", "toast-alert", 5000);
            }, 21200);
        }

        if (player.AC.RESOURCES["HEAT"]["LFTM_AMOUNT"].gte(player.AC.RESOURCES["FLUID"]["UNLOCKED_AT"][1]) && player.AC.RESOURCES["TANKS"]["LFTM_AMOUNT"].gte(player.AC.RESOURCES["FLUID"]["UNLOCKED_AT"][2]) && player.AC.RESOURCES["KILNS"]["LFTM_AMOUNT"].gte(player.AC.RESOURCES["FLUID"]["UNLOCKED_AT"][3]) && player.AC.RESOURCES["FLUID"]["UNLOCKED"].eq(0)) {
            player.AC.RESOURCES["FLUID"]["UNLOCKED"] = new Decimal(1);
            setTimeout(function () {
                createToast("Fluids are unlocked now!", "toast-success", 4000);
            }, 0);

            setTimeout(function () {
                createToast("Fluids only need alot of Heat for production", "toast-notify", 3000);
            }, 4300);

            setTimeout(function () {
                createToast("But they allow to increase efficiency of Workers!", "toast-success", 4000);
            }, 7600);

            setTimeout(function () {
                createToast("This should allow you to get much further now", "toast-notify", 3000);
            }, 11900);

            setTimeout(function () {
                createToast("Oh also you have unlocked few more permament upgrades!", "toast-notify", 3000);
            }, 15200);

            setTimeout(function () {
                createToast("I'm sure you'll like them", "toast-notify", 3000);
            }, 18500);

            setTimeout(function () {
                createToast("( Reach ??? LFTM Kilns , ??? LFTM Tanks and ??? LFTM Heat, to unlock something new )", "toast-alert", 5000);
            }, 21800);
        }
    },
    UniversalUpdate() {
        var x = player.AC.RESOURCES

        let HEAT_CAPACITY = new Decimal(10)
        let HEAT_PRODUCTION = new Decimal(1)
        let HEAT_AUTOMATION_CAPACITY = new Decimal(4)
        let HEAT_AUTOMATION_EFFICIENCY = new Decimal(.2)
        HEAT_CAPACITY = HEAT_CAPACITY.mul(buyableEffect("AC", "HEAT_CAPACITY_I"))
        HEAT_PRODUCTION = HEAT_PRODUCTION.mul(buyableEffect("AC", "HEAT_QUANTITY_I"))
        HEAT_AUTOMATION_CAPACITY = HEAT_AUTOMATION_CAPACITY.add(buyableEffect("AC", "HEAT_AUTOMATION_CAPACITY_I"))
        HEAT_AUTOMATION_EFFICIENCY = HEAT_AUTOMATION_EFFICIENCY.add(buyableEffect("AC", "HEAT_AUTOMATION_EFFICIENCY_I"))
        x["HEAT"]["MAX_CAPACITY"] = HEAT_CAPACITY.ceil()
        x["HEAT"]["PRODUCTION"] = HEAT_PRODUCTION
        x["HEAT"]["AUTOMATION_CPT"] = HEAT_AUTOMATION_CAPACITY
        x["HEAT"]["AUTOMATION_EFF"] = HEAT_AUTOMATION_EFFICIENCY


        let TANK_CAPACITY = new Decimal(30)
        let TANK_PRODUCTION = new Decimal(1)
        let TANK_NEED = new Decimal(10)
        let TANK_AUTOMATION_CAPACITY = new Decimal(4)
        let TANK_AUTOMATION_EFFICIENCY = new Decimal(.2)
        TANK_CAPACITY = TANK_CAPACITY.mul(buyableEffect("AC", "TANK_CAPACITY_I"))
        TANK_PRODUCTION = TANK_PRODUCTION.mul(buyableEffect("AC", "TANK_QUANTITY_I"))
        TANK_NEED = TANK_NEED.mul(buyableEffect("AC", "TANK_QUANTITY_I"))
        TANK_AUTOMATION_CAPACITY = TANK_AUTOMATION_CAPACITY.add(buyableEffect("AC", "TANK_AUTOMATION_CAPACITY_I"))
        TANK_AUTOMATION_EFFICIENCY = TANK_AUTOMATION_EFFICIENCY.add(buyableEffect("AC", "TANK_AUTOMATION_EFFICIENCY_I"))
        x["TANKS"]["MAX_CAPACITY"] = TANK_CAPACITY.ceil()
        x["TANKS"]["PRODUCTION"] = TANK_PRODUCTION
        x["TANKS"]["REQUIRED_RESOURCES"]["I"] = TANK_NEED
        x["TANKS"]["AUTOMATION_CPT"] = TANK_AUTOMATION_CAPACITY
        x["TANKS"]["AUTOMATION_EFF"] = TANK_AUTOMATION_EFFICIENCY


        let KILN_CAPACITY = new Decimal(20)
        let KILN_PRODUCTION = new Decimal(1)
        let KILN_NEED_1 = new Decimal(100)
        let KILN_NEED_2 = new Decimal(50)
        let KILN_AUTOMATION_CAPACITY = new Decimal(4)
        let KILN_AUTOMATION_EFFICIENCY = new Decimal(.2)
        KILN_CAPACITY = KILN_CAPACITY.mul(buyableEffect("AC", "KILN_CAPACITY_I"))
        KILN_PRODUCTION = KILN_PRODUCTION.mul(buyableEffect("AC", "KILN_QUANTITY_I"))
        KILN_NEED_1 = KILN_NEED_1.mul(buyableEffect("AC", "KILN_QUANTITY_I"))
        KILN_NEED_2 = KILN_NEED_2.mul(buyableEffect("AC", "KILN_QUANTITY_I"))
        KILN_AUTOMATION_CAPACITY = KILN_AUTOMATION_CAPACITY.add(buyableEffect("AC", "KILN_AUTOMATION_CAPACITY_I"))
        KILN_AUTOMATION_EFFICIENCY = KILN_AUTOMATION_EFFICIENCY.add(buyableEffect("AC", "HEAT_AUTOMATION_EFFICIENCY_I"))
        x["KILNS"]["MAX_CAPACITY"] = KILN_CAPACITY.ceil()
        x["KILNS"]["PRODUCTION"] = KILN_PRODUCTION
        x["KILNS"]["REQUIRED_RESOURCES"]["I"] = KILN_NEED_1
        x["KILNS"]["REQUIRED_RESOURCES"]["II"] = KILN_NEED_2
        x["KILNS"]["AUTOMATION_CPT"] = KILN_AUTOMATION_CAPACITY
        x["KILNS"]["AUTOMATION_EFF"] = KILN_AUTOMATION_EFFICIENCY


        let FLUID_CAPACITY = new Decimal(1000)
        let FLUID_PRODUCTION = new Decimal(1)
        let FLUID_NEED_1 = new Decimal(25000)
        let FLUID_AUTOMATION_CAPACITY = new Decimal(4)
        FLUID_CAPACITY = FLUID_CAPACITY.mul(buyableEffect("AC", "FLUID_CAPACITY_I"))
        FLUID_PRODUCTION = FLUID_PRODUCTION.mul(buyableEffect("AC", "FLUID_QUANTITY_I"))
        FLUID_NEED_1 = FLUID_NEED_1.mul(buyableEffect("AC", "FLUID_QUANTITY_I"))
        FLUID_AUTOMATION_CAPACITY = FLUID_AUTOMATION_CAPACITY.add(buyableEffect("AC", "FLUID_AUTOMATION_CAPACITY_I"))
        x["FLUID"]["MAX_CAPACITY"] = FLUID_CAPACITY.ceil()
        x["FLUID"]["PRODUCTION"] = FLUID_PRODUCTION
        x["FLUID"]["REQUIRED_RESOURCES"]["I"] = FLUID_NEED_1
        x["FLUID"]["AUTOMATION_CPT"] = FLUID_AUTOMATION_CAPACITY


        let WORKER_TIME = new Decimal(120)
        WORKER_TIME = WORKER_TIME.sub(buyableEffect("AC", "WORKER_SPEED_I"))
        player.AC.SPECIAL_RESOURCES["Workers"]["PRODUCTION_TIME"] = WORKER_TIME
    },
    PRODUCE_HEAT() {
        var x = player.AC.RESOURCES
        let AM_PER_CLICK = x["HEAT"]["PRODUCTION"]
        x["HEAT"]["AMOUNT"] = x["HEAT"]["AMOUNT"].add(AM_PER_CLICK)
        x["HEAT"]["LFTM_AMOUNT"] = x["HEAT"]["LFTM_AMOUNT"].add(AM_PER_CLICK)

        x["HEAT"]["AMOUNT"] = x["HEAT"]["AMOUNT"].clampMax(x["HEAT"]["MAX_CAPACITY"])
    },
    SET_HEAT_AUTOMATION() {
        if (player.AC.RESOURCES["HEAT"]["AUTOMATION_STATE"].equals(new Decimal(0)) && !(player.AC.RESOURCES["HEAT"]["AUTOMATION_STATE"].equals(new Decimal(1)))) {
            player.AC.RESOURCES["HEAT"]["AUTOMATION_STATE"] = new Decimal(1);
            console.log("on");
        } else {
            player.AC.RESOURCES["HEAT"]["AUTOMATION_STATE"] = new Decimal(0);
        }
    },
    SET_TANK_AUTOMATION() {
        if (player.AC.RESOURCES["TANKS"]["AUTOMATION_STATE"].equals(new Decimal(0)) && !(player.AC.RESOURCES["TANKS"]["AUTOMATION_STATE"].equals(new Decimal(1)))) {
            player.AC.RESOURCES["TANKS"]["AUTOMATION_STATE"] = new Decimal(1);
            console.log("on");
        } else {
            player.AC.RESOURCES["TANKS"]["AUTOMATION_STATE"] = new Decimal(0);
        }
    },
    SET_KILN_AUTOMATION() {
        if (player.AC.RESOURCES["KILNS"]["AUTOMATION_STATE"].equals(new Decimal(0)) && !(player.AC.RESOURCES["KILNS"]["AUTOMATION_STATE"].equals(new Decimal(1)))) {
            player.AC.RESOURCES["KILNS"]["AUTOMATION_STATE"] = new Decimal(1);
            console.log("on");
        } else {
            player.AC.RESOURCES["KILNS"]["AUTOMATION_STATE"] = new Decimal(0);
        }
    },
    PRODUCE_TANKS() {
        var x = player.AC.RESOURCES
        let AM_PER_CLICK = x["TANKS"]["PRODUCTION"]
        x["TANKS"]["AMOUNT"] = x["TANKS"]["AMOUNT"].add(AM_PER_CLICK)
        x["TANKS"]["LFTM_AMOUNT"] = x["TANKS"]["LFTM_AMOUNT"].add(AM_PER_CLICK)
        x["HEAT"]["AMOUNT"] = x["HEAT"]["AMOUNT"].sub(x["TANKS"]["REQUIRED_RESOURCES"]["I"])
        x["TANKS"]["AMOUNT"] = x["TANKS"]["AMOUNT"].clampMax(x["TANKS"]["MAX_CAPACITY"])
    },
    PRODUCE_KILNS() {
        var x = player.AC.RESOURCES
        let AM_PER_CLICK = x["KILNS"]["PRODUCTION"]
        let REQUIREMENT = player.AC.RESOURCES["KILNS"]["REQUIRED_RESOURCES"]
        x["KILNS"]["AMOUNT"] = x["KILNS"]["AMOUNT"].add(AM_PER_CLICK)
        x["KILNS"]["LFTM_AMOUNT"] = x["KILNS"]["LFTM_AMOUNT"].add(AM_PER_CLICK)

        x["HEAT"]["AMOUNT"] = x["HEAT"]["AMOUNT"].sub(REQUIREMENT["I"])
        x["TANKS"]["AMOUNT"] = x["TANKS"]["AMOUNT"].sub(REQUIREMENT["II"])

        x["KILNS"]["AMOUNT"] = x["KILNS"]["AMOUNT"].clampMax(x["KILNS"]["MAX_CAPACITY"])
    },
    PRODUCE_FLUID() {
        var x = player.AC.RESOURCES
        let AM_PER_CLICK = x["FLUID"]["PRODUCTION"]
        let REQUIREMENT = player.AC.RESOURCES["FLUID"]["REQUIRED_RESOURCES"]
        x["FLUID"]["AMOUNT"] = x["FLUID"]["AMOUNT"].add(AM_PER_CLICK)
        x["FLUID"]["LFTM_AMOUNT"] = x["FLUID"]["LFTM_AMOUNT"].add(AM_PER_CLICK)

        x["HEAT"]["AMOUNT"] = x["HEAT"]["AMOUNT"].sub(REQUIREMENT["I"])

        x["FLUID"]["AMOUNT"] = x["FLUID"]["AMOUNT"].clampMax(x["FLUID"]["MAX_CAPACITY"])
    },

    PRODUCE_WORKERS_1() {
        var x = player.AC
        let AM_PER_CLICK = new Decimal(1)
        let REQUIREMENT = x.SPECIAL_RESOURCES["Workers"]["REQUIRED_RESOURCES"]

        x.RESOURCES["HEAT"]["AMOUNT"] = x.RESOURCES["HEAT"]["AMOUNT"].sub(REQUIREMENT[1])

        x.SPECIAL_RESOURCES["Workers"]["AMOUNT"] = x.SPECIAL_RESOURCES["Workers"]["AMOUNT"].clampMax(x.SPECIAL_RESOURCES["Workers"]["MAX_CAPACITY"])
    },
    PRODUCE_WORKERS_2() {
        var x = player.AC
        x.SPECIAL_RESOURCES["Workers"]["TIME_ELAPSED"] = new Decimal(0)
        let AM_PER_CLICK = new Decimal(1)
        x.SPECIAL_RESOURCES["Workers"]["AMOUNT"] = x.SPECIAL_RESOURCES["Workers"]["AMOUNT"].add(AM_PER_CLICK)
    },
    bars: {
        HEAT_BAR: {
            fillStyle: {'background': "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(142,142,142,1) 49.9999%, rgba(213,213,213,1) 50%, rgba(143,143,143,1) 100%)"},
            baseStyle: {'background': "linear-gradient(0deg, rgba(127, 127, 127, 1) 0%, rgba(71, 71, 71, 1) 49.9999%, rgba(106, 106, 106, 1) 50%, rgba(71, 71, 71, 1) 100%)"},
            borderStyle() {
                return {'border-radius': '0px', 'border': '0px'}
            },
            direction: RIGHT,
            width: 500,
            height: 50,
            progress() {
                return (player.AC.RESOURCES["HEAT"]["AMOUNT"].div(player.AC.RESOURCES["HEAT"]["MAX_CAPACITY"]))
            },
            display() {
                return `<div style="color: #000000"><span class="BarInfoLF" style="line-height:15px; font-family: CRDIReg">Heat<br><span style="font-size: 10px">+${format(player.AC.RESOURCES["HEAT"]["PRODUCTION"])} HEAT / PRODUCTION</span></span><span class="BarInfoRG" style="font-family:CRDIMed"> ${formatNoDecimals(player.AC.RESOURCES["HEAT"]["AMOUNT"])} / ${formatNoDecimals(player.AC.RESOURCES["HEAT"]["MAX_CAPACITY"])}</span></div>`
            },
            unlocked: true,
        },
        TANK_BAR: {
            fillStyle: {'background': "linear-gradient(0deg, rgba(230,163,132,1) 0%, rgba(131,77,62,1) 49.9999%, rgba(196,138,95,1) 50%, rgba(128,77,61,1) 100%)"},
            baseStyle: {'background': "linear-gradient(0deg, rgba(115, 81, 66, 1) 0%, rgba(65, 38, 31, 1) 49.9999%, rgba(98, 69, 47, 1) 50%, rgba(64, 38, 30, 1) 100%)"},
            borderStyle() {
                return {'border-radius': '0px', 'border': '0px'}
            },
            direction: RIGHT,
            width: 500,
            height: 50,
            progress() {
                return (player.AC.RESOURCES["TANKS"]["AMOUNT"].div(player.AC.RESOURCES["TANKS"]["MAX_CAPACITY"]))
            },
            display() {
                return `<div style="color: #000000"><span class="BarInfoLF" style="line-height:15px; font-family: CRDIReg">${player.AC.RESOURCES["TANKS"]["DISPLAY"]}<br><span style="font-size: 10px">+${format(player.AC.RESOURCES["TANKS"]["PRODUCTION"])} TANKS / PRODUCTION</span></span><span class="BarInfoRG" style="font-family:CRDIMed"> ${formatNoDecimals(player.AC.RESOURCES["TANKS"]["AMOUNT"])} / ${formatNoDecimals(player.AC.RESOURCES["TANKS"]["MAX_CAPACITY"])}</span></div>`
            },
            unlocked() {
                return player.AC.RESOURCES["HEAT"]["LFTM_AMOUNT"].gte(10)
            }
        },
        KILN_BAR: {
            fillStyle: {'background': "linear-gradient(0deg, rgba(99,99,99,1) 0%, rgba(51,51,51,1) 49.9999%, rgba(76,76,76,1) 50%, rgba(46,46,46,1) 100%)"},
            baseStyle: {'background': "linear-gradient(0deg, rgba(49, 49, 49, 1) 0%, rgba(26, 26, 26, 1) 49.9999%, rgba(38, 38, 38, 1) 50%, rgba(23, 23, 23, 1) 100%)"},
            borderStyle() {
                return {'border-radius': '0px', 'border': '0px'}
            },
            direction: RIGHT,
            width: 500,
            height: 50,
            progress() {
                return (player.AC.RESOURCES["KILNS"]["AMOUNT"].div(player.AC.RESOURCES["KILNS"]["MAX_CAPACITY"]))
            },
            display() {
                return `<div style="color: #FFFFFF"><span class="BarInfoLF" style="line-height:15px; font-family: CRDIReg">${player.AC.RESOURCES["KILNS"]["DISPLAY"]}<br><span style="font-size: 10px">+${format(player.AC.RESOURCES["KILNS"]["PRODUCTION"])} KILNS / PRODUCTION</span></span><span class="BarInfoRG" style="font-family:CRDIMed"> ${formatNoDecimals(player.AC.RESOURCES["KILNS"]["AMOUNT"])} / ${formatNoDecimals(player.AC.RESOURCES["KILNS"]["MAX_CAPACITY"])}</span></div>`
            },
            unlocked() {
                return player.AC.RESOURCES["TANKS"]["LFTM_AMOUNT"].gte(50)
            }
        },
        FLUID_BAR: {
            fillStyle: {'background': "linear-gradient(0deg, rgba(130,130,79,1) 0%, rgba(135,135,81,1) 49.9999%, rgba(170,170,103,1) 50%, rgba(148,148,88,1) 100%)"},
            baseStyle: {'background': "linear-gradient(0deg, rgba(65, 65, 40, 1) 0%, rgba(68, 68, 40, 1) 49.9999%, rgba(85, 85, 51, 1) 50%, rgba(74, 74, 44, 1) 100%)"},
            borderStyle() {
                return {'border-radius': '0px', 'border': '0px'}
            },
            direction: RIGHT,
            width: 500,
            height: 50,
            progress() {
                return (player.AC.RESOURCES["FLUID"]["AMOUNT"].div(player.AC.RESOURCES["FLUID"]["MAX_CAPACITY"]))
            },
            display() {
                return `<div style="color: #FFFFFF"><span class="BarInfoLF" style="line-height:15px; font-family: CRDIReg">${player.AC.RESOURCES["FLUID"]["DISPLAY"]}<br><span style="font-size: 10px">+${format(player.AC.RESOURCES["FLUID"]["PRODUCTION"])} FLUID / PRODUCTION</span></span><span class="BarInfoRG" style="font-family:CRDIMed"> ${formatNoDecimals(player.AC.RESOURCES["FLUID"]["AMOUNT"])} / ${formatNoDecimals(player.AC.RESOURCES["FLUID"]["MAX_CAPACITY"])}</span></div>`
            },
            unlocked() {
                return player.AC.RESOURCES["FLUID"]["UNLOCKED"].eq(1)
            }
        },


        WORKER_BAR: {
            fillStyle: {'background': "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(142,142,142,1) 49.9999%, rgba(213,213,213,1) 50%, rgba(143,143,143,1) 100%)"},
            baseStyle: {'background': "linear-gradient(0deg, rgba(127, 127, 127, 1) 0%, rgba(71, 71, 71, 1) 49.9999%, rgba(106, 106, 106, 1) 50%, rgba(71, 71, 71, 1) 100%)"},
            borderStyle() {
                return {'border-radius': '0px', 'border': '0px'}
            },
            direction: RIGHT,
            width: 500,
            height: 50,
            progress() {
                return (player.AC.SPECIAL_RESOURCES["Workers"]["AMOUNT"].div(player.AC.SPECIAL_RESOURCES["Workers"]["MAX_CAPACITY"]))
            },
            display() {
                return `<div style="color: #000000"><span class="BarInfoLF" style="line-height:15px; font-family: CRDIReg">Workers</span></span><span class="BarInfoRG" style="font-family:CRDIMed"> ${formatNoDecimals(player.AC.SPECIAL_RESOURCES["Workers"]["AMOUNT"])} / ${formatNoDecimals(player.AC.SPECIAL_RESOURCES["Workers"]["MAX_CAPACITY"])}</span></div>`
            },
            unlocked: true,
        },
        WORKER_PRODUCTION_BAR: {
            fillStyle: {'background': "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(142,142,142,1) 49.9999%, rgba(213,213,213,1) 50%, rgba(143,143,143,1) 100%)"},
            baseStyle: {'background': "linear-gradient(0deg, rgba(127, 127, 127, 1) 0%, rgba(71, 71, 71, 1) 49.9999%, rgba(106, 106, 106, 1) 50%, rgba(71, 71, 71, 1) 100%)"},
            borderStyle() {
                return {'border-radius': '0px', 'border': '0px'}
            },
            direction: RIGHT,
            width: 500,
            height: 10,
            progress() {
                return (player.AC.SPECIAL_RESOURCES["Workers"]["TIME_ELAPSED"].div(player.AC.SPECIAL_RESOURCES["Workers"]["PRODUCTION_TIME"]))
            },
            unlocked: true,
        },
    },
    clickables: {
        "PRODUCE_HEAT": {
            title() {
                return `<b style="font-size:12px">Produce Heat</b>`
            },
            canClick() {
                return player.AC.RESOURCES["HEAT"]["AMOUNT"].lt(player.AC.RESOURCES["HEAT"]["MAX_CAPACITY"])
            },
            onClick() {
                tmp.AC.PRODUCE_HEAT();
            },
            style() {
                if (tmp[this.layer].clickables[this.id].canClick) return {
                    "background": "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(142,142,142,1) 49.9999%, rgba(213,213,213,1) 50%, rgba(143,143,143,1) 100%)",
                    "width": "120px",
                    "height": "50px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "5px",
                    "color": "#000000"
                }
                return {
                    "background": "linear-gradient(0deg, rgba(127, 127, 127, 1) 0%, rgba(71, 71, 71, 1) 49.9999%, rgba(106, 106, 106, 1) 50%, rgba(71, 71, 71, 1) 100%)",
                    "width": "120px",
                    "height": "50px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "5px",
                    "color": "#ffffff"
                }
            },
            unlocked() {
                return true && player.AC.RESOURCES["HEAT"]["AUTOMATION_STATE"].eq(0)
            }
        },
        "HEAT_AUTOMATION": {
            title() {
                if (player.AC.RESOURCES["HEAT"]["AUTOMATION_STATE"].eq(0)) {
                    return `<b style="font-size:12px">ENABLE AUTOMATION</b>`
                }

                if (player.AC.RESOURCES["HEAT"]["AUTOMATION_STATE"].eq(1)) {
                    return `<b style="font-size:12px">DISABLE AUTOMATION</b>`
                }
            },
            canClick() {
                return true
            },
            onClick() {
                tmp.AC.SET_HEAT_AUTOMATION();
            },
            style() {
                if (tmp[this.layer].clickables[this.id].canClick) return {
                    "background": "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(142,142,142,1) 49.9999%, rgba(213,213,213,1) 50%, rgba(143,143,143,1) 100%)",
                    "width": "120px",
                    "height": "50px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "5px",
                    "color": "#000000"
                }
                return {
                    "background": "linear-gradient(0deg, rgba(127, 127, 127, 1) 0%, rgba(71, 71, 71, 1) 49.9999%, rgba(106, 106, 106, 1) 50%, rgba(71, 71, 71, 1) 100%)",
                    "width": "120px",
                    "height": "50px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "5px",
                    "color": "#ffffff"
                }
            },
            unlocked() {
                return player.AC.SPECIAL_RESOURCES["Workers"]["AMOUNT"].gt(0)
            }
        },
        "HEAT_AUTOMATION_+": {
            title() {
                return `+<br>
         <span style='font-size: 12px'>MAX ${formatNoDecimals(player.AC.RESOURCES["HEAT"]["AUTOMATION_CPT"])}</span>`
            },
            canClick() {
                return player.AC.SPECIAL_RESOURCES["Workers"]["USED_AM"].lt(player.AC.SPECIAL_RESOURCES["Workers"]["AMOUNT"]) && player.AC.RESOURCES["HEAT"]["AUTOMATORS_ASG"].lt(player.AC.RESOURCES["HEAT"]["AUTOMATION_CPT"])
            },
            onClick() {
                player.AC.SPECIAL_RESOURCES["Workers"]["USED_AM"] = player.AC.SPECIAL_RESOURCES["Workers"]["USED_AM"].add(1)

                player.AC.RESOURCES["HEAT"]["AUTOMATORS_ASG"] = player.AC.RESOURCES["HEAT"]["AUTOMATORS_ASG"].add(1)
            },
            style() {
                if (tmp[this.layer].clickables[this.id].canClick) return {
                    "background": "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(142,142,142,1) 49.9999%, rgba(213,213,213,1) 50%, rgba(143,143,143,1) 100%)",
                    "width": "60px",
                    "height": "50px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "0px",
                    "color": "#000000"
                }
                return {
                    "background": "linear-gradient(0deg, rgba(127, 127, 127, 1) 0%, rgba(71, 71, 71, 1) 49.9999%, rgba(106, 106, 106, 1) 50%, rgba(71, 71, 71, 1) 100%)",
                    "width": "60px",
                    "height": "50px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "0px",
                    "color": "#ffffff"
                }
            },
            unlocked() {
                return player.AC.RESOURCES["HEAT"]["AUTOMATION_STATE"].eq(1)
            }
        },
        "HEAT_AUTOMATION_-": {
            title() {
                return `-<br>
         <span style='font-size: 12px'>ASG ${formatNoDecimals(player.AC.RESOURCES["HEAT"]["AUTOMATORS_ASG"])}</span>`
            },
            canClick() {
                return player.AC.SPECIAL_RESOURCES["Workers"]["USED_AM"].gt(0) && player.AC.RESOURCES["HEAT"]["AUTOMATORS_ASG"].gt(0)
            },
            onClick() {
                player.AC.SPECIAL_RESOURCES["Workers"]["USED_AM"] = player.AC.SPECIAL_RESOURCES["Workers"]["USED_AM"].sub(1)

                player.AC.RESOURCES["HEAT"]["AUTOMATORS_ASG"] = player.AC.RESOURCES["HEAT"]["AUTOMATORS_ASG"].sub(1)
            },
            style() {
                if (tmp[this.layer].clickables[this.id].canClick) return {
                    "background": "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(142,142,142,1) 49.9999%, rgba(213,213,213,1) 50%, rgba(143,143,143,1) 100%)",
                    "width": "60px",
                    "height": "50px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "5px",
                    "color": "#000000"
                }
                return {
                    "background": "linear-gradient(0deg, rgba(127, 127, 127, 1) 0%, rgba(71, 71, 71, 1) 49.9999%, rgba(106, 106, 106, 1) 50%, rgba(71, 71, 71, 1) 100%)",
                    "width": "60px",
                    "height": "50px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "5px",
                    "color": "#ffffff"
                }
            },
            unlocked() {
                return player.AC.RESOURCES["HEAT"]["AUTOMATION_STATE"].eq(1)
            }
        },

        "PRODUCE_TANKS": {
            title() {
                return `<b style="font-size:12px">Produce Tanks</b>`
            },
            canClick() {
                return player.AC.RESOURCES["TANKS"]["AMOUNT"].lt(player.AC.RESOURCES["TANKS"]["MAX_CAPACITY"]) && player.AC.RESOURCES["HEAT"]["AMOUNT"].gte(player.AC.RESOURCES["TANKS"]["REQUIRED_RESOURCES"]["I"])
            },
            onClick() {
                tmp.AC.PRODUCE_TANKS();
            },
            style() {
                if (tmp[this.layer].clickables[this.id].canClick) return {
                    "background": "linear-gradient(0deg, rgba(230,163,132,1) 0%, rgba(131,77,62,1) 49.9999%, rgba(196,138,95,1) 50%, rgba(128,77,61,1) 100%)",
                    "width": "120px",
                    "height": "50px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "5px",
                    "color": "#ffffff"
                }
                return {
                    "background": "linear-gradient(0deg, rgba(115, 81, 66, 1) 0%, rgba(65, 38, 31, 1) 49.9999%, rgba(98, 69, 47, 1) 50%, rgba(64, 38, 30, 1) 100%)",
                    "width": "120px",
                    "height": "50px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "5px",
                    "color": "#000000"
                }
            },
            unlocked() {
                return player.AC.RESOURCES["HEAT"]["LFTM_AMOUNT"].gte(player.AC.RESOURCES["TANKS"]["UNLOCKED_AT"][1]) && player.AC.RESOURCES["TANKS"]["AUTOMATION_STATE"].eq(0)
            }
        },
        "TANKS_AUTOMATION": {
            title() {
                if (player.AC.RESOURCES["TANKS"]["AUTOMATION_STATE"].eq(0)) {
                    return `<b style="font-size:12px">ENABLE AUTOMATION</b>`
                }

                if (player.AC.RESOURCES["TANKS"]["AUTOMATION_STATE"].eq(1)) {
                    return `<b style="font-size:12px">DISABLE AUTOMATION</b>`
                }
            },
            canClick() {
                return true
            },
            onClick() {
                tmp.AC.SET_TANK_AUTOMATION();
            },
            style() {
                if (tmp[this.layer].clickables[this.id].canClick) return {
                    "background": "linear-gradient(0deg, rgba(230,163,132,1) 0%, rgba(131,77,62,1) 49.9999%, rgba(196,138,95,1) 50%, rgba(128,77,61,1) 100%)",
                    "width": "120px",
                    "height": "50px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "5px",
                    "color": "#ffffff"
                }
                return {
                    "background": "linear-gradient(0deg, rgba(115, 81, 66, 1) 0%, rgba(65, 38, 31, 1) 49.9999%, rgba(98, 69, 47, 1) 50%, rgba(64, 38, 30, 1) 100%)",
                    "width": "120px",
                    "height": "50px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "5px",
                    "color": "#000000"
                }
            },
            unlocked() {
                return player.AC.SPECIAL_RESOURCES["Workers"]["AMOUNT"].gt(0)
            }
        },
        "TANKS_AUTOMATION_+": {
            title() {
                return `+<br>
         <span style='font-size: 12px'>MAX ${formatNoDecimals(player.AC.RESOURCES["TANKS"]["AUTOMATION_CPT"])}</span>`
            },
            canClick() {
                return player.AC.SPECIAL_RESOURCES["Workers"]["USED_AM"].lt(player.AC.SPECIAL_RESOURCES["Workers"]["AMOUNT"]) && player.AC.RESOURCES["TANKS"]["AUTOMATORS_ASG"].lt(player.AC.RESOURCES["TANKS"]["AUTOMATION_CPT"])
            },
            onClick() {
                player.AC.SPECIAL_RESOURCES["Workers"]["USED_AM"] = player.AC.SPECIAL_RESOURCES["Workers"]["USED_AM"].add(1)

                player.AC.RESOURCES["TANKS"]["AUTOMATORS_ASG"] = player.AC.RESOURCES["TANKS"]["AUTOMATORS_ASG"].add(1)
            },
            style() {
                if (tmp[this.layer].clickables[this.id].canClick) return {
                    "background": "linear-gradient(0deg, rgba(230,163,132,1) 0%, rgba(131,77,62,1) 49.9999%, rgba(196,138,95,1) 50%, rgba(128,77,61,1) 100%)",
                    "width": "60px",
                    "height": "50px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "0px",
                    "color": "#ffffff"
                }
                return {
                    "background": "linear-gradient(0deg, rgba(115, 81, 66, 1) 0%, rgba(65, 38, 31, 1) 49.9999%, rgba(98, 69, 47, 1) 50%, rgba(64, 38, 30, 1) 100%)",
                    "width": "60px",
                    "height": "50px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "0px",
                    "color": "#000000"
                }
            },
            unlocked() {
                return player.AC.RESOURCES["TANKS"]["AUTOMATION_STATE"].eq(1)
            }
        },
        "TANKS_AUTOMATION_-": {
            title() {
                return `-<br>
         <span style='font-size: 12px'>ASG ${formatNoDecimals(player.AC.RESOURCES["TANKS"]["AUTOMATORS_ASG"])}</span>`
            },
            canClick() {
                return player.AC.SPECIAL_RESOURCES["Workers"]["USED_AM"].gt(0) && player.AC.RESOURCES["TANKS"]["AUTOMATORS_ASG"].gt(0)
            },
            onClick() {
                player.AC.SPECIAL_RESOURCES["Workers"]["USED_AM"] = player.AC.SPECIAL_RESOURCES["Workers"]["USED_AM"].sub(1)

                player.AC.RESOURCES["TANKS"]["AUTOMATORS_ASG"] = player.AC.RESOURCES["TANKS"]["AUTOMATORS_ASG"].sub(1)
            },
            style() {
                if (tmp[this.layer].clickables[this.id].canClick) return {
                    "background": "linear-gradient(0deg, rgba(230,163,132,1) 0%, rgba(131,77,62,1) 49.9999%, rgba(196,138,95,1) 50%, rgba(128,77,61,1) 100%)",
                    "width": "60px",
                    "height": "50px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "5px",
                    "color": "#ffffff"
                }
                return {
                    "background": "linear-gradient(0deg, rgba(115, 81, 66, 1) 0%, rgba(65, 38, 31, 1) 49.9999%, rgba(98, 69, 47, 1) 50%, rgba(64, 38, 30, 1) 100%)",
                    "width": "60px",
                    "height": "50px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "5px",
                    "color": "#000000"
                }
            },
            unlocked() {
                return player.AC.RESOURCES["TANKS"]["AUTOMATION_STATE"].eq(1)
            }
        },

        "PRODUCE_KILNS": {
            title() {
                return `<b style="font-size:12px">Produce Kilns</b>`
            },
            canClick() {
                return player.AC.RESOURCES["KILNS"]["AMOUNT"].lt(player.AC.RESOURCES["KILNS"]["MAX_CAPACITY"]) && player.AC.RESOURCES["HEAT"]["AMOUNT"].gte(player.AC.RESOURCES["KILNS"]["REQUIRED_RESOURCES"]["I"]) && player.AC.RESOURCES["TANKS"]["AMOUNT"].gte(player.AC.RESOURCES["KILNS"]["REQUIRED_RESOURCES"]["II"])
            },
            onClick() {
                tmp.AC.PRODUCE_KILNS();
            },
            style() {
                if (tmp[this.layer].clickables[this.id].canClick) return {
                    "background": "linear-gradient(0deg, rgba(99,99,99,1) 0%, rgba(51,51,51,1) 49.9999%, rgba(76,76,76,1) 50%, rgba(46,46,46,1) 100%)",
                    "width": "120px",
                    "height": "50px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "5px",
                    "color": "#ffffff"
                }
                return {
                    "background": "linear-gradient(0deg, rgba(49, 49, 49, 1) 0%, rgba(26, 26, 26, 1) 49.9999%, rgba(38, 38, 38, 1) 50%, rgba(23, 23, 23, 1) 100%)",
                    "width": "120px",
                    "height": "50px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "5px",
                    "color": "#000000"
                }
            },
            unlocked() {
                return player.AC.RESOURCES["TANKS"]["LFTM_AMOUNT"].gte(player.AC.RESOURCES["KILNS"]["UNLOCKED_AT"][2]) && player.AC.RESOURCES["KILNS"]["AUTOMATION_STATE"].eq(0)
            }
        },
        "KILNS_AUTOMATION": {
            title() {
                if (player.AC.RESOURCES["KILNS"]["AUTOMATION_STATE"].eq(0)) {
                    return `<b style="font-size:12px">ENABLE AUTOMATION</b>`
                }

                if (player.AC.RESOURCES["KILNS"]["AUTOMATION_STATE"].eq(1)) {
                    return `<b style="font-size:12px">DISABLE AUTOMATION</b>`
                }
            },
            canClick() {
                return true
            },
            onClick() {
                tmp.AC.SET_KILN_AUTOMATION();
            },
            style() {
                if (tmp[this.layer].clickables[this.id].canClick) return {
                    "background": "linear-gradient(0deg, rgba(99,99,99,1) 0%, rgba(51,51,51,1) 49.9999%, rgba(76,76,76,1) 50%, rgba(46,46,46,1) 100%)",
                    "width": "120px",
                    "height": "50px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "5px",
                    "color": "#ffffff"
                }
                return {
                    "background": "linear-gradient(0deg, rgba(49, 49, 49, 1) 0%, rgba(26, 26, 26, 1) 49.9999%, rgba(38, 38, 38, 1) 50%, rgba(23, 23, 23, 1) 100%)",
                    "width": "120px",
                    "height": "50px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "5px",
                    "color": "#000000"
                }
            },
            unlocked() {
                return player.AC.SPECIAL_RESOURCES["Workers"]["AMOUNT"].gt(0)
            }
        },
        "KILNS_AUTOMATION_+": {
            title() {
                return `+<br>
         <span style='font-size: 12px'>MAX ${formatNoDecimals(player.AC.RESOURCES["KILNS"]["AUTOMATION_CPT"])}</span>`
            },
            canClick() {
                return player.AC.SPECIAL_RESOURCES["Workers"]["USED_AM"].lt(player.AC.SPECIAL_RESOURCES["Workers"]["AMOUNT"]) && player.AC.RESOURCES["KILNS"]["AUTOMATORS_ASG"].lt(player.AC.RESOURCES["KILNS"]["AUTOMATION_CPT"])
            },
            onClick() {
                player.AC.SPECIAL_RESOURCES["Workers"]["USED_AM"] = player.AC.SPECIAL_RESOURCES["Workers"]["USED_AM"].add(1)

                player.AC.RESOURCES["KILNS"]["AUTOMATORS_ASG"] = player.AC.RESOURCES["KILNS"]["AUTOMATORS_ASG"].add(1)
            },
            style() {
                if (tmp[this.layer].clickables[this.id].canClick) return {
                    "background": "linear-gradient(0deg, rgba(99,99,99,1) 0%, rgba(51,51,51,1) 49.9999%, rgba(76,76,76,1) 50%, rgba(46,46,46,1) 100%)",
                    "width": "60px",
                    "height": "50px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "0px",
                    "color": "#ffffff"
                }
                return {
                    "background": "linear-gradient(0deg, rgba(49, 49, 49, 1) 0%, rgba(26, 26, 26, 1) 49.9999%, rgba(38, 38, 38, 1) 50%, rgba(23, 23, 23, 1) 100%)",
                    "width": "60px",
                    "height": "50px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "0px",
                    "color": "#000000"
                }
            },
            unlocked() {
                return player.AC.RESOURCES["KILNS"]["AUTOMATION_STATE"].eq(1)
            }
        },
        "KILNS_AUTOMATION_-": {
            title() {
                return `-<br>
         <span style='font-size: 12px'>ASG ${formatNoDecimals(player.AC.RESOURCES["KILNS"]["AUTOMATORS_ASG"])}</span>`
            },
            canClick() {
                return player.AC.SPECIAL_RESOURCES["Workers"]["USED_AM"].gt(0) && player.AC.RESOURCES["KILNS"]["AUTOMATORS_ASG"].gt(0)
            },
            onClick() {
                player.AC.SPECIAL_RESOURCES["Workers"]["USED_AM"] = player.AC.SPECIAL_RESOURCES["Workers"]["USED_AM"].sub(1)

                player.AC.RESOURCES["KILNS"]["AUTOMATORS_ASG"] = player.AC.RESOURCES["KILNS"]["AUTOMATORS_ASG"].sub(1)
            },
            style() {
                if (tmp[this.layer].clickables[this.id].canClick) return {
                    "background": "linear-gradient(0deg, rgba(99,99,99,1) 0%, rgba(51,51,51,1) 49.9999%, rgba(76,76,76,1) 50%, rgba(46,46,46,1) 100%)",
                    "width": "60px",
                    "height": "50px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "5px",
                    "color": "#ffffff"
                }
                return {
                    "background": "linear-gradient(0deg, rgba(49, 49, 49, 1) 0%, rgba(26, 26, 26, 1) 49.9999%, rgba(38, 38, 38, 1) 50%, rgba(23, 23, 23, 1) 100%)",
                    "width": "60px",
                    "height": "50px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "5px",
                    "color": "#000000"
                }
            },
            unlocked() {
                return player.AC.RESOURCES["KILNS"]["AUTOMATION_STATE"].eq(1)
            }
        },

        "PRODUCE_FLUID": {
            title() {
                return `<b style="font-size:12px">Produce Fluid</b>`
            },
            canClick() {
                return player.AC.RESOURCES["FLUID"]["AMOUNT"].lt(player.AC.RESOURCES["FLUID"]["MAX_CAPACITY"]) && player.AC.RESOURCES["HEAT"]["AMOUNT"].gte(player.AC.RESOURCES["FLUID"]["REQUIRED_RESOURCES"]["I"])
            },
            onClick() {
                tmp.AC.PRODUCE_FLUID();
            },
            style() {
                if (tmp[this.layer].clickables[this.id].canClick) return {
                    "background": "linear-gradient(0deg, rgba(130,130,79,1) 0%, rgba(135,135,81,1) 49.9999%, rgba(170,170,103,1) 50%, rgba(148,148,88,1) 100%)",
                    "width": "120px",
                    "height": "50px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "5px",
                    "color": "#FFFFFF"
                }
                return {
                    "background": "linear-gradient(0deg, rgba(65, 65, 40, 1) 0%, rgba(68, 68, 40, 1) 49.9999%, rgba(85, 85, 51, 1) 50%, rgba(74, 74, 44, 1) 100%)",
                    "width": "120px",
                    "height": "50px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "5px",
                    "color": "#000000"
                }
            },
            unlocked() {
                return player.AC.RESOURCES["FLUID"]["UNLOCKED"].eq(1) && player.AC.RESOURCES["FLUID"]["AUTOMATION_STATE"].eq(0)
            }
        },

        "PRODUCE_WORKERS": {
            title() {
                return `<b style="font-size:12px">Produce Workers</b>`
            },
            canClick() {
                return player.AC.SPECIAL_RESOURCES["Workers"]["AMOUNT"].lt(player.AC.SPECIAL_RESOURCES["Workers"]["MAX_CAPACITY"]) && player.AC.RESOURCES["HEAT"]["AMOUNT"].gte(player.AC.SPECIAL_RESOURCES["Workers"]["REQUIRED_RESOURCES"][1]) && player.AC.SPECIAL_RESOURCES["Workers"]["IS_PRODUCING"] === false
            },
            onClick() {
                player.AC.SPECIAL_RESOURCES["Workers"]["IS_PRODUCING"] = true;
                tmp.AC.PRODUCE_WORKERS_1()
            },
            style() {
                if (tmp[this.layer].clickables[this.id].canClick) return {
                    "background": "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(142,142,142,1) 49.9999%, rgba(213,213,213,1) 50%, rgba(143,143,143,1) 100%)",
                    "width": "120px",
                    "height": "50px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "5px",
                    "color": "#ffffff"
                }
                return {
                    "background": "linear-gradient(0deg, rgba(127, 127, 127, 1) 0%, rgba(71, 71, 71, 1) 49.9999%, rgba(106, 106, 106, 1) 50%, rgba(71, 71, 71, 1) 100%)",
                    "width": "120px",
                    "height": "50px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "5px",
                    "color": "#000000"
                }
            },
            unlocked() {
                return true
            }
        },

        "FORCE_RESET_WORKERS": {
            title() {
                return `<b style="font-size:12px">FORCE RESET ASSIGNED WORKERS</b>`
            },
            canClick() {
                return true
            },
            onClick() {
                player.AC.SPECIAL_RESOURCES["Workers"]["USED_AM"] = new Decimal(0);
                player.AC.RESOURCES["HEAT"]["AUTOMATORS_ASG"] = new Decimal(0);
                player.AC.RESOURCES["TANKS"]["AUTOMATORS_ASG"] = new Decimal(0);
                player.AC.RESOURCES["KILNS"]["AUTOMATORS_ASG"] = new Decimal(0);
                player.AC.RESOURCES["FLUID"]["AUTOMATORS_ASG"] = new Decimal(0);
            },
            style() {
                if (tmp[this.layer].clickables[this.id].canClick) return {
                    "background": "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(142,142,142,1) 49.9999%, rgba(213,213,213,1) 50%, rgba(143,143,143,1) 100%)",
                    "width": "360px",
                    "height": "50px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "5px",
                    "color": "#000000"
                }
                return {
                    "background": "linear-gradient(0deg, rgba(127, 127, 127, 1) 0%, rgba(71, 71, 71, 1) 49.9999%, rgba(106, 106, 106, 1) 50%, rgba(71, 71, 71, 1) 100%)",
                    "width": "360px",
                    "height": "50px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "5px",
                    "color": "#ffffff"
                }
            },
            unlocked() {
                return true
            }
        },
        "FORCE_RESET_RESOURCES": {
            title() {
                return `<b style="font-size:12px">FORCE RESET RESOURCES TO 0</b>`
            },
            canClick() {
                return true
            },
            onClick() {
                player.AC.RESOURCES["HEAT"]["AMOUNT"] = new Decimal(0);
                player.AC.RESOURCES["TANKS"]["AMOUNT"] = new Decimal(0);
                player.AC.RESOURCES["KILNS"]["AMOUNT"] = new Decimal(0);
                player.AC.RESOURCES["FLUID"]["AMOUNT"] = new Decimal(0);
            },
            style() {
                if (tmp[this.layer].clickables[this.id].canClick) return {
                    "background": "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(142,142,142,1) 49.9999%, rgba(213,213,213,1) 50%, rgba(143,143,143,1) 100%)",
                    "width": "360px",
                    "height": "50px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "5px",
                    "color": "#000000"
                }
                return {
                    "background": "linear-gradient(0deg, rgba(127, 127, 127, 1) 0%, rgba(71, 71, 71, 1) 49.9999%, rgba(106, 106, 106, 1) 50%, rgba(71, 71, 71, 1) 100%)",
                    "width": "360px",
                    "height": "50px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "5px",
                    "color": "#ffffff"
                }
            },
            unlocked() {
                return true
            }
        },
    },
    buyables: {
        "HEAT_QUANTITY_I": {
            cost(x) {
                let PowerI = new Decimal(1.5)
                let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1))).ceil()
                return Calculation;
            },
            buy() {
                player[this.layer].RESOURCES["HEAT"]["AMOUNT"] = player[this.layer].RESOURCES["HEAT"]["AMOUNT"].sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() {
                var S = tmp[this.layer].buyables[this.id]
                var SV = player[this.layer].buyables[this.id]
                return `<div style="line-height: 8px">
          <span style="font-size:12px; font-family:CRDIMed">Job Quantity</span>
          <span style="font-size:5px; font-family:CRDIReg">Level ${format(SV, 0)}</span><br>
          <span style="font-size:9px; font-family:CRDIReg">${format(S.effect)}x Heat Production</span>
          <span style="font-size:9px; font-family:CRDILight">Cost: ${formatNoDecimals(S.cost)} Heat</span></div>`
            },
            canAfford() {
                return player[this.layer].RESOURCES["HEAT"]["AMOUNT"].gte(this.cost())
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford)
                    return {
                        "background": "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(142,142,142,1) 49.9999%, rgba(213,213,213,1) 50%, rgba(143,143,143,1) 100%)",
                        "width": "200px",
                        "height": "auto",
                        "border-radius": "0px",
                        "border": "0px",
                        "margin": "2.5px",
                        "color": "#000000"
                    }
                return {
                    "background": "linear-gradient(0deg, rgba(127, 127, 127, 1) 0%, rgba(71, 71, 71, 1) 49.9999%, rgba(106, 106, 106, 1) 50%, rgba(71, 71, 71, 1) 100%)",
                    "width": "200px",
                    "height": "auto",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "2.5px",
                    "color": "#ffffff"
                }
            },
            effect(x) {
                let PowerI = new Decimal(1.25)

                let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
                return Effect;
            },
            unlocked() {
                return true
            }
        },
        "HEAT_CAPACITY_I": {
            cost(x) {
                let PowerI = new Decimal(1.5)
                let Calculation = new Decimal(5).mul(Decimal.pow(PowerI, x.pow(1))).ceil()
                return Calculation;
            },
            buy() {
                player[this.layer].RESOURCES["TANKS"]["AMOUNT"] = player[this.layer].RESOURCES["TANKS"]["AMOUNT"].sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() {
                var S = tmp[this.layer].buyables[this.id]
                var SV = player[this.layer].buyables[this.id]
                return `<div style="line-height: 8px">
          <span style="font-size:12px; font-family:CRDIMed">Resource Capacity</span>
          <span style="font-size:5px; font-family:CRDIReg">Level ${format(SV, 0)}</span><br>
          <span style="font-size:9px; font-family:CRDIReg">${format(S.effect)}x Heat Capacity</span>
          <span style="font-size:9px; font-family:CRDILight">Cost: ${formatNoDecimals(S.cost)} Tanks</span></div>`
            },
            canAfford() {
                return player[this.layer].RESOURCES["TANKS"]["AMOUNT"].gte(this.cost())
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford)
                    return {
                        "background": "linear-gradient(0deg, rgba(230,163,132,1) 0%, rgba(131,77,62,1) 49.9999%, rgba(196,138,95,1) 50%, rgba(128,77,61,1) 100%)",
                        "width": "200px",
                        "height": "auto",
                        "border-radius": "0px",
                        "border": "0px",
                        "margin": "2.5px",
                        "color": "#000000"
                    }
                return {
                    "background": "linear-gradient(0deg, rgba(115, 81, 66, 1) 0%, rgba(65, 38, 31, 1) 49.9999%, rgba(98, 69, 47, 1) 50%, rgba(64, 38, 30, 1) 100%)",
                    "width": "200px",
                    "height": "auto",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "2.5px",
                    "color": "#ffffff"
                }
            },
            effect(x) {
                let PowerI = new Decimal(1.5)

                let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
                return Effect;
            },
            unlocked() {
                return player.AC.RESOURCES["TANKS"]["UNLOCKED"].gte(1)
            }
        },
        "HEAT_AUTOMATION_CAPACITY_I": {
            cost(x) {
                let PowerI = new Decimal(2)
                let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1))).ceil()
                return Calculation;
            },
            buy() {
                player[this.layer].RESOURCES["KILNS"]["AMOUNT"] = player[this.layer].RESOURCES["KILNS"]["AMOUNT"].sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() {
                var S = tmp[this.layer].buyables[this.id]
                var SV = player[this.layer].buyables[this.id]
                return `<div style="line-height: 8px">
          <span style="font-size:12px; font-family:CRDIMed">AT Capacity</span>
          <span style="font-size:5px; font-family:CRDIReg">Level ${format(SV, 0)}</span><br>
          <span style="font-size:9px; font-family:CRDIReg">${formatNoDecimals((S.effect).add(4))} Heat AT CPT</span>
          <span style="font-size:9px; font-family:CRDILight">Cost: ${formatNoDecimals(S.cost)} Kilns</span></div>`
            },
            canAfford() {
                return player[this.layer].RESOURCES["KILNS"]["AMOUNT"].gte(this.cost())
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford)
                    return {
                        "background": "linear-gradient(0deg, rgba(99,99,99,1) 0%, rgba(51,51,51,1) 49.9999%, rgba(76,76,76,1) 50%, rgba(46,46,46,1) 100%)",
                        "width": "200px",
                        "height": "auto",
                        "border-radius": "0px",
                        "border": "0px",
                        "margin": "2.5px",
                        "color": "#FFFFFF"
                    }
                return {
                    "background": "linear-gradient(0deg, rgba(49, 49, 49, 1) 0%, rgba(26, 26, 26, 1) 49.9999%, rgba(38, 38, 38, 1) 50%, rgba(23, 23, 23, 1) 100%)",
                    "width": "200px",
                    "height": "auto",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "2.5px",
                    "color": "#000000"
                }
            },
            effect(x) {
                let PowerI = new Decimal(1)

                let Effect = new Decimal(0).add(Decimal.mul(PowerI, x.pow(1)))
                return Effect;
            },
            unlocked() {
                return player.AC.RESOURCES["KILNS"]["UNLOCKED"].gte(1)
            }
        },
        "HEAT_AUTOMATION_EFFICIENCY_I": {
            cost(x) {
                let PowerI = new Decimal(1.5)
                let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1))).ceil()
                return Calculation;
            },
            buy() {
                player[this.layer].RESOURCES["FLUID"]["AMOUNT"] = player[this.layer].RESOURCES["FLUID"]["AMOUNT"].sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() {
                var S = tmp[this.layer].buyables[this.id]
                var SV = player[this.layer].buyables[this.id]
                return `<div style="line-height: 8px">
          <span style="font-size:12px; font-family:CRDIMed">AT Efficiency</span>
          <span style="font-size:5px; font-family:CRDIReg">Level ${format(SV, 0)}</span><br>
          <span style="font-size:9px; font-family:CRDIReg">${format(((S.effect).mul(100).add(20)), 2)}% Heat AT EFF</span>
          <span style="font-size:9px; font-family:CRDILight">Cost: ${formatNoDecimals(S.cost)} Fluid</span></div>`
            },
            canAfford() {
                return player[this.layer].RESOURCES["FLUID"]["AMOUNT"].gte(this.cost())
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford)
                    return {
                        "background": "linear-gradient(0deg, rgba(130,130,79,1) 0%, rgba(135,135,81,1) 49.9999%, rgba(170,170,103,1) 50%, rgba(148,148,88,1) 100%)",
                        "width": "200px",
                        "height": "auto",
                        "border-radius": "0px",
                        "border": "0px",
                        "margin": "2.5px",
                        "color": "#FFFFFF"
                    }
                return {
                    "background": "linear-gradient(0deg, rgba(65, 65, 40, 1) 0%, rgba(68, 68, 40, 1) 49.9999%, rgba(85, 85, 51, 1) 50%, rgba(74, 74, 44, 1) 100%)",
                    "width": "200px",
                    "height": "auto",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "2.5px",
                    "color": "#000000"
                }
            },
            effect(x) {
                let PowerI = new Decimal(0.01)
                PowerI = PowerI.mul(Decimal.div(getBuyableAmount(this.layer, this.id), 2.5).clampMin(0).pow(2))
                let Effect = new Decimal(0).add(Decimal.mul(PowerI, x.pow(1)))
                return Effect;
            },
            unlocked() {
                return player.AC.RESOURCES["FLUID"]["UNLOCKED"].gte(1)
            }
        },

        "TANK_QUANTITY_I": {
            cost(x) {
                let PowerI = new Decimal(1.5)
                let Calculation = new Decimal(30).mul(Decimal.pow(PowerI, x.pow(1))).ceil()
                return Calculation;
            },
            buy() {
                player[this.layer].RESOURCES["HEAT"]["AMOUNT"] = player[this.layer].RESOURCES["HEAT"]["AMOUNT"].sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() {
                var S = tmp[this.layer].buyables[this.id]
                var SV = player[this.layer].buyables[this.id]
                return `<div style="line-height: 8px">
          <span style="font-size:12px; font-family:CRDIMed">Job Quantity</span>
          <span style="font-size:5px; font-family:CRDIReg">Level ${format(SV, 0)}</span><br>
          <span style="font-size:9px; font-family:CRDIReg">${format(S.effect)}x Tank Production</span>
          <span style="font-size:9px; font-family:CRDILight">Cost: ${formatNoDecimals(S.cost)} Heat</span></div>`
            },
            canAfford() {
                return player[this.layer].RESOURCES["HEAT"]["AMOUNT"].gte(this.cost())
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford)
                    return {
                        "background": "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(142,142,142,1) 49.9999%, rgba(213,213,213,1) 50%, rgba(143,143,143,1) 100%)",
                        "width": "200px",
                        "height": "auto",
                        "border-radius": "0px",
                        "border": "0px",
                        "margin": "2.5px",
                        "color": "#000000"
                    }
                return {
                    "background": "linear-gradient(0deg, rgba(127, 127, 127, 1) 0%, rgba(71, 71, 71, 1) 49.9999%, rgba(106, 106, 106, 1) 50%, rgba(71, 71, 71, 1) 100%)",
                    "width": "200px",
                    "height": "auto",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "2.5px",
                    "color": "#ffffff"
                }
            },
            effect(x) {
                let PowerI = new Decimal(1.25)

                let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
                return Effect;
            },
            unlocked() {
                return player.AC.RESOURCES["TANKS"]["UNLOCKED"].gte(1)
            }
        },
        "TANK_CAPACITY_I": {
            cost(x) {
                let PowerI = new Decimal(1.5)
                let Calculation = new Decimal(15).mul(Decimal.pow(PowerI, x.pow(1))).ceil()
                return Calculation;
            },
            buy() {
                player[this.layer].RESOURCES["TANKS"]["AMOUNT"] = player[this.layer].RESOURCES["TANKS"]["AMOUNT"].sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() {
                var S = tmp[this.layer].buyables[this.id]
                var SV = player[this.layer].buyables[this.id]
                return `<div style="line-height: 8px">
          <span style="font-size:12px; font-family:CRDIMed">Resource Capacity</span>
          <span style="font-size:5px; font-family:CRDIReg">Level ${format(SV, 0)}</span><br>
          <span style="font-size:9px; font-family:CRDIReg">${format(S.effect)}x Tank Capacity</span>
          <span style="font-size:9px; font-family:CRDILight">Cost: ${formatNoDecimals(S.cost)} Tanks</span></div>`
            },
            canAfford() {
                return player[this.layer].RESOURCES["TANKS"]["AMOUNT"].gte(this.cost())
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford)
                    return {
                        "background": "linear-gradient(0deg, rgba(230,163,132,1) 0%, rgba(131,77,62,1) 49.9999%, rgba(196,138,95,1) 50%, rgba(128,77,61,1) 100%)",
                        "width": "200px",
                        "height": "auto",
                        "border-radius": "0px",
                        "border": "0px",
                        "margin": "2.5px",
                        "color": "#000000"
                    }
                return {
                    "background": "linear-gradient(0deg, rgba(115, 81, 66, 1) 0%, rgba(65, 38, 31, 1) 49.9999%, rgba(98, 69, 47, 1) 50%, rgba(64, 38, 30, 1) 100%)",
                    "width": "200px",
                    "height": "auto",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "2.5px",
                    "color": "#ffffff"
                }
            },
            effect(x) {
                let PowerI = new Decimal(1.5)

                let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
                return Effect;
            },
            unlocked() {
                return player.AC.RESOURCES["TANKS"]["UNLOCKED"].gte(1)
            }
        },
        "TANK_AUTOMATION_CAPACITY_I": {
            cost(x) {
                let PowerI = new Decimal(2)
                let Calculation = new Decimal(10).mul(Decimal.pow(PowerI, x.pow(1))).ceil()
                return Calculation;
            },
            buy() {
                player[this.layer].RESOURCES["KILNS"]["AMOUNT"] = player[this.layer].RESOURCES["KILNS"]["AMOUNT"].sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() {
                var S = tmp[this.layer].buyables[this.id]
                var SV = player[this.layer].buyables[this.id]
                return `<div style="line-height: 8px">
          <span style="font-size:12px; font-family:CRDIMed">AT Capacity</span>
          <span style="font-size:5px; font-family:CRDIReg">Level ${format(SV, 0)}</span><br>
          <span style="font-size:9px; font-family:CRDIReg">${formatNoDecimals((S.effect).add(4))} Tank AT CPT</span>
          <span style="font-size:9px; font-family:CRDILight">Cost: ${formatNoDecimals(S.cost)} Kilns</span></div>`
            },
            canAfford() {
                return player[this.layer].RESOURCES["KILNS"]["AMOUNT"].gte(this.cost())
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford)
                    return {
                        "background": "linear-gradient(0deg, rgba(99,99,99,1) 0%, rgba(51,51,51,1) 49.9999%, rgba(76,76,76,1) 50%, rgba(46,46,46,1) 100%)",
                        "width": "200px",
                        "height": "auto",
                        "border-radius": "0px",
                        "border": "0px",
                        "margin": "2.5px",
                        "color": "#FFFFFF"
                    }
                return {
                    "background": "linear-gradient(0deg, rgba(49, 49, 49, 1) 0%, rgba(26, 26, 26, 1) 49.9999%, rgba(38, 38, 38, 1) 50%, rgba(23, 23, 23, 1) 100%)",
                    "width": "200px",
                    "height": "auto",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "2.5px",
                    "color": "#000000"
                }
            },
            effect(x) {
                let PowerI = new Decimal(1)

                let Effect = new Decimal(0).add(Decimal.mul(PowerI, x.pow(1)))
                return Effect;
            },
            unlocked() {
                return player.AC.RESOURCES["KILNS"]["UNLOCKED"].gte(1)
            }
        },
        "TANK_AUTOMATION_EFFICIENCY_I": {
            cost(x) {
                let PowerI = new Decimal(1.5)
                let Calculation = new Decimal(5).mul(Decimal.pow(PowerI, x.pow(1))).ceil()
                return Calculation;
            },
            buy() {
                player[this.layer].RESOURCES["FLUID"]["AMOUNT"] = player[this.layer].RESOURCES["FLUID"]["AMOUNT"].sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() {
                var S = tmp[this.layer].buyables[this.id]
                var SV = player[this.layer].buyables[this.id]
                return `<div style="line-height: 8px">
          <span style="font-size:12px; font-family:CRDIMed">AT Efficiency</span>
          <span style="font-size:5px; font-family:CRDIReg">Level ${format(SV, 0)}</span><br>
          <span style="font-size:9px; font-family:CRDIReg">${format(((S.effect).mul(100).add(20)), 2)}% Tank AT EFF</span>
          <span style="font-size:9px; font-family:CRDILight">Cost: ${formatNoDecimals(S.cost)} Fluid</span></div>`
            },
            canAfford() {
                return player[this.layer].RESOURCES["FLUID"]["AMOUNT"].gte(this.cost())
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford)
                    return {
                        "background": "linear-gradient(0deg, rgba(130,130,79,1) 0%, rgba(135,135,81,1) 49.9999%, rgba(170,170,103,1) 50%, rgba(148,148,88,1) 100%)",
                        "width": "200px",
                        "height": "auto",
                        "border-radius": "0px",
                        "border": "0px",
                        "margin": "2.5px",
                        "color": "#FFFFFF"
                    }
                return {
                    "background": "linear-gradient(0deg, rgba(65, 65, 40, 1) 0%, rgba(68, 68, 40, 1) 49.9999%, rgba(85, 85, 51, 1) 50%, rgba(74, 74, 44, 1) 100%)",
                    "width": "200px",
                    "height": "auto",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "2.5px",
                    "color": "#000000"
                }
            },
            effect(x) {
                let PowerI = new Decimal(0.01)
                PowerI = PowerI.mul(Decimal.div(getBuyableAmount(this.layer, this.id), 2.5).clampMin(0).pow(2))
                let Effect = new Decimal(0).add(Decimal.mul(PowerI, x.pow(1)))
                return Effect;
            },
            unlocked() {
                return player.AC.RESOURCES["FLUID"]["UNLOCKED"].gte(1)
            }
        },


        "KILN_QUANTITY_I": {
            cost(x) {
                let PowerI = new Decimal(1.5)
                let Calculation = new Decimal(1000).mul(Decimal.pow(PowerI, x.pow(1))).ceil()
                return Calculation;
            },
            buy() {
                player[this.layer].RESOURCES["HEAT"]["AMOUNT"] = player[this.layer].RESOURCES["HEAT"]["AMOUNT"].sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() {
                var S = tmp[this.layer].buyables[this.id]
                var SV = player[this.layer].buyables[this.id]
                return `<div style="line-height: 8px">
          <span style="font-size:12px; font-family:CRDIMed">Job Quantity</span>
          <span style="font-size:5px; font-family:CRDIReg">Level ${format(SV, 0)}</span><br>
          <span style="font-size:9px; font-family:CRDIReg">${format(S.effect)}x Kiln Production</span>
          <span style="font-size:9px; font-family:CRDILight">Cost: ${formatNoDecimals(S.cost)} Heat</span></div>`
            },
            canAfford() {
                return player[this.layer].RESOURCES["HEAT"]["AMOUNT"].gte(this.cost())
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford)
                    return {
                        "background": "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(142,142,142,1) 49.9999%, rgba(213,213,213,1) 50%, rgba(143,143,143,1) 100%)",
                        "width": "200px",
                        "height": "auto",
                        "border-radius": "0px",
                        "border": "0px",
                        "margin": "2.5px",
                        "color": "#000000"
                    }
                return {
                    "background": "linear-gradient(0deg, rgba(127, 127, 127, 1) 0%, rgba(71, 71, 71, 1) 49.9999%, rgba(106, 106, 106, 1) 50%, rgba(71, 71, 71, 1) 100%)",
                    "width": "200px",
                    "height": "auto",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "2.5px",
                    "color": "#ffffff"
                }
            },
            effect(x) {
                let PowerI = new Decimal(1.25)

                let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
                return Effect;
            },
            unlocked() {
                return player.AC.RESOURCES["KILNS"]["UNLOCKED"].gte(1)
            }
        },
        "KILN_CAPACITY_I": {
            cost(x) {
                let PowerI = new Decimal(1.5)
                let Calculation = new Decimal(500).mul(Decimal.pow(PowerI, x.pow(1))).ceil()
                return Calculation;
            },
            buy() {
                player[this.layer].RESOURCES["TANKS"]["AMOUNT"] = player[this.layer].RESOURCES["TANKS"]["AMOUNT"].sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() {
                var S = tmp[this.layer].buyables[this.id]
                var SV = player[this.layer].buyables[this.id]
                return `<div style="line-height: 8px">
          <span style="font-size:12px; font-family:CRDIMed">Resource Capacity</span>
          <span style="font-size:5px; font-family:CRDIReg">Level ${format(SV, 0)}</span><br>
          <span style="font-size:9px; font-family:CRDIReg">${format(S.effect)}x Kiln Capacity</span>
          <span style="font-size:9px; font-family:CRDILight">Cost: ${formatNoDecimals(S.cost)} Tanks</span></div>`
            },
            canAfford() {
                return player[this.layer].RESOURCES["TANKS"]["AMOUNT"].gte(this.cost())
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford)
                    return {
                        "background": "linear-gradient(0deg, rgba(230,163,132,1) 0%, rgba(131,77,62,1) 49.9999%, rgba(196,138,95,1) 50%, rgba(128,77,61,1) 100%)",
                        "width": "200px",
                        "height": "auto",
                        "border-radius": "0px",
                        "border": "0px",
                        "margin": "2.5px",
                        "color": "#000000"
                    }
                return {
                    "background": "linear-gradient(0deg, rgba(115, 81, 66, 1) 0%, rgba(65, 38, 31, 1) 49.9999%, rgba(98, 69, 47, 1) 50%, rgba(64, 38, 30, 1) 100%)",
                    "width": "200px",
                    "height": "auto",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "2.5px",
                    "color": "#ffffff"
                }
            },
            effect(x) {
                let PowerI = new Decimal(1.5)

                let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
                return Effect;
            },
            unlocked() {
                return player.AC.RESOURCES["KILNS"]["UNLOCKED"].gte(1)
            }
        },
        "KILN_AUTOMATION_CAPACITY_I": {
            cost(x) {
                let PowerI = new Decimal(2)
                let Calculation = new Decimal(50).mul(Decimal.pow(PowerI, x.pow(1))).ceil()
                return Calculation;
            },
            buy() {
                player[this.layer].RESOURCES["KILNS"]["AMOUNT"] = player[this.layer].RESOURCES["KILNS"]["AMOUNT"].sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() {
                var S = tmp[this.layer].buyables[this.id]
                var SV = player[this.layer].buyables[this.id]
                return `<div style="line-height: 8px">
          <span style="font-size:12px; font-family:CRDIMed">AT Capacity</span>
          <span style="font-size:5px; font-family:CRDIReg">Level ${format(SV, 0)}</span><br>
          <span style="font-size:9px; font-family:CRDIReg">${formatNoDecimals((S.effect).add(4))} Kiln AT CPT</span>
          <span style="font-size:9px; font-family:CRDILight">Cost: ${formatNoDecimals(S.cost)} Kilns</span></div>`
            },
            canAfford() {
                return player[this.layer].RESOURCES["KILNS"]["AMOUNT"].gte(this.cost())
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford)
                    return {
                        "background": "linear-gradient(0deg, rgba(99,99,99,1) 0%, rgba(51,51,51,1) 49.9999%, rgba(76,76,76,1) 50%, rgba(46,46,46,1) 100%)",
                        "width": "200px",
                        "height": "auto",
                        "border-radius": "0px",
                        "border": "0px",
                        "margin": "2.5px",
                        "color": "#FFFFFF"
                    }
                return {
                    "background": "linear-gradient(0deg, rgba(49, 49, 49, 1) 0%, rgba(26, 26, 26, 1) 49.9999%, rgba(38, 38, 38, 1) 50%, rgba(23, 23, 23, 1) 100%)",
                    "width": "200px",
                    "height": "auto",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "2.5px",
                    "color": "#000000"
                }
            },
            effect(x) {
                let PowerI = new Decimal(1)

                let Effect = new Decimal(0).add(Decimal.mul(PowerI, x.pow(1)))
                return Effect;
            },
            unlocked() {
                return player.AC.RESOURCES["KILNS"]["UNLOCKED"].gte(1)
            }
        },
        "KILN_AUTOMATION_EFFICIENCY_I": {
            cost(x) {
                let PowerI = new Decimal(1.5)
                let Calculation = new Decimal(25).mul(Decimal.pow(PowerI, x.pow(1))).ceil()
                return Calculation;
            },
            buy() {
                player[this.layer].RESOURCES["FLUID"]["AMOUNT"] = player[this.layer].RESOURCES["FLUID"]["AMOUNT"].sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() {
                var S = tmp[this.layer].buyables[this.id]
                var SV = player[this.layer].buyables[this.id]
                return `<div style="line-height: 8px">
          <span style="font-size:12px; font-family:CRDIMed">AT Efficiency</span>
          <span style="font-size:5px; font-family:CRDIReg">Level ${format(SV, 0)}</span><br>
          <span style="font-size:9px; font-family:CRDIReg">${format(((S.effect).mul(100).add(20)), 2)}% Kiln AT EFF</span>
          <span style="font-size:9px; font-family:CRDILight">Cost: ${formatNoDecimals(S.cost)} Fluid</span></div>`
            },
            canAfford() {
                return player[this.layer].RESOURCES["FLUID"]["AMOUNT"].gte(this.cost())
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford)
                    return {
                        "background": "linear-gradient(0deg, rgba(130,130,79,1) 0%, rgba(135,135,81,1) 49.9999%, rgba(170,170,103,1) 50%, rgba(148,148,88,1) 100%)",
                        "width": "200px",
                        "height": "auto",
                        "border-radius": "0px",
                        "border": "0px",
                        "margin": "2.5px",
                        "color": "#FFFFFF"
                    }
                return {
                    "background": "linear-gradient(0deg, rgba(65, 65, 40, 1) 0%, rgba(68, 68, 40, 1) 49.9999%, rgba(85, 85, 51, 1) 50%, rgba(74, 74, 44, 1) 100%)",
                    "width": "200px",
                    "height": "auto",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "2.5px",
                    "color": "#000000"
                }
            },
            effect(x) {
                let PowerI = new Decimal(0.01)
                PowerI = PowerI.mul(Decimal.div(getBuyableAmount(this.layer, this.id), 2.5).clampMin(0).pow(2))
                let Effect = new Decimal(0).add(Decimal.mul(PowerI, x.pow(1)))
                return Effect;
            },
            unlocked() {
                return player.AC.RESOURCES["FLUID"]["UNLOCKED"].gte(1)
            }
        },


        "FLUID_QUANTITY_I": {
            cost(x) {
                let PowerI = new Decimal(1.5)
                let Calculation = new Decimal(37500).mul(Decimal.pow(PowerI, x.pow(1))).ceil()
                return Calculation;
            },
            buy() {
                player[this.layer].RESOURCES["HEAT"]["AMOUNT"] = player[this.layer].RESOURCES["HEAT"]["AMOUNT"].sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() {
                var S = tmp[this.layer].buyables[this.id]
                var SV = player[this.layer].buyables[this.id]
                return `<div style="line-height: 8px">
          <span style="font-size:12px; font-family:CRDIMed">Job Quantity</span>
          <span style="font-size:5px; font-family:CRDIReg">Level ${format(SV, 0)}</span><br>
          <span style="font-size:9px; font-family:CRDIReg">${format(S.effect)}x Fluid Production</span>
          <span style="font-size:9px; font-family:CRDILight">Cost: ${formatNoDecimals(S.cost)} Heat</span></div>`
            },
            canAfford() {
                return player[this.layer].RESOURCES["HEAT"]["AMOUNT"].gte(this.cost())
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford)
                    return {
                        "background": "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(142,142,142,1) 49.9999%, rgba(213,213,213,1) 50%, rgba(143,143,143,1) 100%)",
                        "width": "200px",
                        "height": "auto",
                        "border-radius": "0px",
                        "border": "0px",
                        "margin": "2.5px",
                        "color": "#000000"
                    }
                return {
                    "background": "linear-gradient(0deg, rgba(127, 127, 127, 1) 0%, rgba(71, 71, 71, 1) 49.9999%, rgba(106, 106, 106, 1) 50%, rgba(71, 71, 71, 1) 100%)",
                    "width": "200px",
                    "height": "auto",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "2.5px",
                    "color": "#ffffff"
                }
            },
            effect(x) {
                let PowerI = new Decimal(1.25)

                let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
                return Effect;
            },
            unlocked() {
                return player.AC.RESOURCES["FLUID"]["UNLOCKED"].gte(1)
            }
        },
        "FLUID_CAPACITY_I": {
            cost(x) {
                let PowerI = new Decimal(1.5)
                let Calculation = new Decimal(7500).mul(Decimal.pow(PowerI, x.pow(1))).ceil()
                return Calculation;
            },
            buy() {
                player[this.layer].RESOURCES["TANKS"]["AMOUNT"] = player[this.layer].RESOURCES["TANKS"]["AMOUNT"].sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() {
                var S = tmp[this.layer].buyables[this.id]
                var SV = player[this.layer].buyables[this.id]
                return `<div style="line-height: 8px">
          <span style="font-size:12px; font-family:CRDIMed">Resource Capacity</span>
          <span style="font-size:5px; font-family:CRDIReg">Level ${format(SV, 0)}</span><br>
          <span style="font-size:9px; font-family:CRDIReg">${format(S.effect)}x Fluid Capacity</span>
          <span style="font-size:9px; font-family:CRDILight">Cost: ${formatNoDecimals(S.cost)} Tanks</span></div>`
            },
            canAfford() {
                return player[this.layer].RESOURCES["TANKS"]["AMOUNT"].gte(this.cost())
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford)
                    return {
                        "background": "linear-gradient(0deg, rgba(230,163,132,1) 0%, rgba(131,77,62,1) 49.9999%, rgba(196,138,95,1) 50%, rgba(128,77,61,1) 100%)",
                        "width": "200px",
                        "height": "auto",
                        "border-radius": "0px",
                        "border": "0px",
                        "margin": "2.5px",
                        "color": "#000000"
                    }
                return {
                    "background": "linear-gradient(0deg, rgba(115, 81, 66, 1) 0%, rgba(65, 38, 31, 1) 49.9999%, rgba(98, 69, 47, 1) 50%, rgba(64, 38, 30, 1) 100%)",
                    "width": "200px",
                    "height": "auto",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "2.5px",
                    "color": "#ffffff"
                }
            },
            effect(x) {
                let PowerI = new Decimal(1.5)

                let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
                return Effect;
            },
            unlocked() {
                return player.AC.RESOURCES["FLUID"]["UNLOCKED"].gte(1)
            }
        },
        "FLUID_AUTOMATION_CAPACITY_I": {
            cost(x) {
                let PowerI = new Decimal(2)
                let Calculation = new Decimal(250).mul(Decimal.pow(PowerI, x.pow(1))).ceil()
                return Calculation;
            },
            buy() {
                player[this.layer].RESOURCES["KILNS"]["AMOUNT"] = player[this.layer].RESOURCES["KILNS"]["AMOUNT"].sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() {
                var S = tmp[this.layer].buyables[this.id]
                var SV = player[this.layer].buyables[this.id]
                return `<div style="line-height: 8px">
          <span style="font-size:12px; font-family:CRDIMed">AT Capacity</span>
          <span style="font-size:5px; font-family:CRDIReg">Level ${format(SV, 0)}</span><br>
          <span style="font-size:9px; font-family:CRDIReg">${formatNoDecimals((S.effect).add(4))} Fluid AT CPT</span>
          <span style="font-size:9px; font-family:CRDILight">Cost: ${formatNoDecimals(S.cost)} Kilns</span></div>`
            },
            canAfford() {
                return player[this.layer].RESOURCES["KILNS"]["AMOUNT"].gte(this.cost())
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford)
                    return {
                        "background": "linear-gradient(0deg, rgba(99,99,99,1) 0%, rgba(51,51,51,1) 49.9999%, rgba(76,76,76,1) 50%, rgba(46,46,46,1) 100%)",
                        "width": "200px",
                        "height": "auto",
                        "border-radius": "0px",
                        "border": "0px",
                        "margin": "2.5px",
                        "color": "#FFFFFF"
                    }
                return {
                    "background": "linear-gradient(0deg, rgba(49, 49, 49, 1) 0%, rgba(26, 26, 26, 1) 49.9999%, rgba(38, 38, 38, 1) 50%, rgba(23, 23, 23, 1) 100%)",
                    "width": "200px",
                    "height": "auto",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "2.5px",
                    "color": "#000000"
                }
            },
            effect(x) {
                let PowerI = new Decimal(1)

                let Effect = new Decimal(0).add(Decimal.mul(PowerI, x.pow(1)))
                return Effect;
            },
            unlocked() {
                return player.AC.RESOURCES["FLUID"]["UNLOCKED"].gte(1)
            }
        },

        "WORKER_SPEED_I": {
            cost(x) {
                let PowerI = new Decimal(1.1)
                let Calculation = new Decimal(1000).mul(Decimal.pow(PowerI, x.pow(1))).ceil()
                return Calculation;
            },
            buy() {
                player[this.layer].RESOURCES["HEAT"]["AMOUNT"] = player[this.layer].RESOURCES["HEAT"]["AMOUNT"].sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                return new Decimal(100)
            },
            display() {
                var S = tmp[this.layer].buyables[this.id]
                var SV = player[this.layer].buyables[this.id]
                return `<div style="line-height: 8px">
          <span style="font-size:12px; font-family:CRDIMed">Job Speed</span>
          <span style="font-size:5px; font-family:CRDIReg">Level ${format(SV, 0)} / ${format(S.purchaseLimit, 0)} </span><br>
          <span style="font-size:9px; font-family:CRDIReg">-${formatNoDecimals(S.effect)}s Worker Production Time</span>
          <span style="font-size:9px; font-family:CRDILight">Cost: ${formatNoDecimals(S.cost)} Heat</span></div>`
            },
            canAfford() {
                return player[this.layer].RESOURCES["HEAT"]["AMOUNT"].gte(this.cost())
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford)
                    return {
                        "background": "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(142,142,142,1) 49.9999%, rgba(213,213,213,1) 50%, rgba(143,143,143,1) 100%)",
                        "width": "200px",
                        "height": "auto",
                        "border-radius": "0px",
                        "border": "0px",
                        "margin": "2.5px",
                        "color": "#000000"
                    }
                return {
                    "background": "linear-gradient(0deg, rgba(127, 127, 127, 1) 0%, rgba(71, 71, 71, 1) 49.9999%, rgba(106, 106, 106, 1) 50%, rgba(71, 71, 71, 1) 100%)",
                    "width": "200px",
                    "height": "auto",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "2.5px",
                    "color": "#ffffff"
                }
            },
            effect(x) {
                let PowerI = new Decimal(1)

                let Effect = new Decimal(0).add(Decimal.mul(PowerI, x.pow(1)))
                return Effect;
            },
            unlocked() {
                return true
            }
        },

        "POINT_BUYABLE_I": {
            cost(x) {
                let PowerI = new Decimal(1.25)
                let Calculation = new Decimal(500).mul(Decimal.pow(PowerI, x.pow(1))).ceil()
                return Calculation;
            },
            buy() {
                player[this.layer].RESOURCES["HEAT"]["AMOUNT"] = player[this.layer].RESOURCES["HEAT"]["AMOUNT"].sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() {
                var S = tmp[this.layer].buyables[this.id]
                var SV = player[this.layer].buyables[this.id]
                return `<div style="line-height: 8px">
          <span style="font-size:12px; font-family:CRDIMed">Point Buyable+</span>
          <span style="font-size:5px; font-family:CRDIReg">Level ${format(SV, 0)}</span><br>
          <span style="font-size:9px; font-family:CRDIReg">${format(S.effect)}x Points</span>
          <span style="font-size:9px; font-family:CRDILight">Cost: ${formatNoDecimals(S.cost)} Heat</span></div>`
            },
            canAfford() {
                return player[this.layer].RESOURCES["HEAT"]["AMOUNT"].gte(this.cost())
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford)
                    return {
                        "background": "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(142,142,142,1) 49.9999%, rgba(213,213,213,1) 50%, rgba(143,143,143,1) 100%)",
                        "width": "200px",
                        "height": "auto",
                        "border-radius": "0px",
                        "border": "0px",
                        "margin": "2.5px",
                        "color": "#000000"
                    }
                return {
                    "background": "linear-gradient(0deg, rgba(127, 127, 127, 1) 0%, rgba(71, 71, 71, 1) 49.9999%, rgba(106, 106, 106, 1) 50%, rgba(71, 71, 71, 1) 100%)",
                    "width": "200px",
                    "height": "auto",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "2.5px",
                    "color": "#ffffff"
                }
            },
            effect(x) {
                let PowerI = new Decimal(3)

                let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
                return Effect;
            },
            unlocked() {
                return true
            }
        },
        "POINT_BUYABLE_II": {
            cost(x) {
                let PowerI = new Decimal(1.5)
                let Calculation = new Decimal(100).mul(Decimal.pow(PowerI, x.pow(1))).ceil()
                return Calculation;
            },
            buy() {
                player[this.layer].RESOURCES["TANKS"]["AMOUNT"] = player[this.layer].RESOURCES["TANKS"]["AMOUNT"].sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() {
                var S = tmp[this.layer].buyables[this.id]
                var SV = player[this.layer].buyables[this.id]
                return `<div style="line-height: 8px">
          <span style="font-size:12px; font-family:CRDIMed">Point Buyable++</span>
          <span style="font-size:5px; font-family:CRDIReg">Level ${format(SV, 0)}</span><br>
          <span style="font-size:9px; font-family:CRDIReg">${format(S.effect)}x Points</span>
          <span style="font-size:9px; font-family:CRDILight">Cost: ${formatNoDecimals(S.cost)} Tanks</span></div>`
            },
            canAfford() {
                return player[this.layer].RESOURCES["TANKS"]["AMOUNT"].gte(this.cost())
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford)
                    return {
                        "background": "linear-gradient(0deg, rgba(230,163,132,1) 0%, rgba(131,77,62,1) 49.9999%, rgba(196,138,95,1) 50%, rgba(128,77,61,1) 100%)",
                        "width": "200px",
                        "height": "auto",
                        "border-radius": "0px",
                        "border": "0px",
                        "margin": "2.5px",
                        "color": "#000000"
                    }
                return {
                    "background": "linear-gradient(0deg, rgba(115, 81, 66, 1) 0%, rgba(65, 38, 31, 1) 49.9999%, rgba(98, 69, 47, 1) 50%, rgba(64, 38, 30, 1) 100%)",
                    "width": "200px",
                    "height": "auto",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "2.5px",
                    "color": "#ffffff"
                }
            },
            effect(x) {
                let PowerI = new Decimal(9)

                let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
                return Effect;
            },
            unlocked() {
                return true
            }
        },
        "POINT_BUYABLE_III": {
            cost(x) {
                let PowerI = new Decimal(1.5)
                let Calculation = new Decimal(20).mul(Decimal.pow(PowerI, x.pow(1))).ceil()
                return Calculation;
            },
            buy() {
                player[this.layer].RESOURCES["KILNS"]["AMOUNT"] = player[this.layer].RESOURCES["KILNS"]["AMOUNT"].sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() {
                var S = tmp[this.layer].buyables[this.id]
                var SV = player[this.layer].buyables[this.id]
                return `<div style="line-height: 8px">
          <span style="font-size:12px; font-family:CRDIMed">Point Buyable+++</span>
          <span style="font-size:5px; font-family:CRDIReg">Level ${format(SV, 0)}</span><br>
          <span style="font-size:9px; font-family:CRDIReg">${format(S.effect)}x Points</span>
          <span style="font-size:9px; font-family:CRDILight">Cost: ${formatNoDecimals(S.cost)} Kilns</span></div>`
            },
            canAfford() {
                return player[this.layer].RESOURCES["KILNS"]["AMOUNT"].gte(this.cost())
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford)
                    return {
                        "background": "linear-gradient(0deg, rgba(99,99,99,1) 0%, rgba(51,51,51,1) 49.9999%, rgba(76,76,76,1) 50%, rgba(46,46,46,1) 100%)",
                        "width": "200px",
                        "height": "auto",
                        "border-radius": "0px",
                        "border": "0px",
                        "margin": "2.5px",
                        "color": "#FFFFFF"
                    }
                return {
                    "background": "linear-gradient(0deg, rgba(49, 49, 49, 1) 0%, rgba(26, 26, 26, 1) 49.9999%, rgba(38, 38, 38, 1) 50%, rgba(23, 23, 23, 1) 100%)",
                    "width": "200px",
                    "height": "auto",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "2.5px",
                    "color": "#000000"
                }
            },
            effect(x) {
                let PowerI = new Decimal(27)

                let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
                return Effect;
            },
            unlocked() {
                return true
            }
        },
        "POINT_BUYABLE_IV": {
            cost(x) {
                let PowerI = new Decimal(1.5)
                let Calculation = new Decimal(5).mul(Decimal.pow(PowerI, x.pow(1))).ceil()
                return Calculation;
            },
            buy() {
                player[this.layer].RESOURCES["FLUID"]["AMOUNT"] = player[this.layer].RESOURCES["FLUID"]["AMOUNT"].sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            display() {
                var S = tmp[this.layer].buyables[this.id]
                var SV = player[this.layer].buyables[this.id]
                return `<div style="line-height: 8px">
          <span style="font-size:12px; font-family:CRDIMed">Point Buyable+4</span>
          <span style="font-size:5px; font-family:CRDIReg">Level ${format(SV, 0)}</span><br>
          <span style="font-size:9px; font-family:CRDIReg">${format(S.effect)}x Points</span>
          <span style="font-size:9px; font-family:CRDILight">Cost: ${formatNoDecimals(S.cost)} Fluid</span></div>`
            },
            canAfford() {
                return player[this.layer].RESOURCES["FLUID"]["AMOUNT"].gte(this.cost())
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford)
                    return {
                        "background": "linear-gradient(0deg, rgba(130,130,79,1) 0%, rgba(135,135,81,1) 49.9999%, rgba(170,170,103,1) 50%, rgba(148,148,88,1) 100%)",
                        "width": "200px",
                        "height": "auto",
                        "border-radius": "0px",
                        "border": "0px",
                        "margin": "2.5px",
                        "color": "#FFFFFF"
                    }
                return {
                    "background": "linear-gradient(0deg, rgba(65, 65, 40, 1) 0%, rgba(68, 68, 40, 1) 49.9999%, rgba(85, 85, 51, 1) 50%, rgba(74, 74, 44, 1) 100%)",
                    "width": "200px",
                    "height": "auto",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "2.5px",
                    "color": "#000000"
                }
            },
            effect(x) {
                let PowerI = new Decimal(81)

                let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
                return Effect;
            },
            unlocked() {
                return player.AC.RESOURCES["FLUID"]["UNLOCKED"].eq(1)
            }
        },
    },
    // linear-gradient(180deg, rgba(221,219,219,1) 0%, rgba(130,130,130,1) 100%)
    /* bars: {
     heatCapacity: {
     fillStyle: { 'background': "linear-gradient(180deg, rgba(221,219,219,1) 0%, rgba(130,130,130,1) 100%)" },
     baseStyle: { 'background': "linear-gradient(180deg, rgba(125,125,125,1) 0%, rgba(58,57,57,1) 100%)" },
     borderStyle() { return { 'border-radius': '0px', 'border': '0px' } },
     direction: RIGHT,
     width: 300,
     height: 30,
     progress() {
     return (player.AC.heat.div(tmp.AC.heatCapacity))
     },
     display() {
     return `<b class="InfoBox"> Heat ${format(player.AC.heat)} / ${format(tmp.AC.heatCapacity)}<b>`
     },
     unlocked: true,
     },
     tankCapacity: {
     fillStyle: { 'background': "linear-gradient(180deg, rgba(205,80,66,1) 0%, rgba(122,56,21,1) 100%)" },
     baseStyle: { 'background': "linear-gradient(180deg, rgba(104,42,35,1) 0%, rgba(35,16,6,1) 100%)" },
     textStyle: { 'text-shadow': '0px 0px 0.75px #000000' },

     borderStyle() { return { 'border-radius': '0px', 'border': '0px' } },
     direction: RIGHT,
     width: 300,
     height: 30,
     progress() {
     return (player.AC.tanks.div(tmp.AC.tankCapacity))
     },
     display() {
     return `Tanks ${format(player.AC.tanks)} / ${format(tmp.AC.tankCapacity)}`
     },
     unlocked: true,
     },
     kilnCapacity: {
     fillStyle: { 'background': "linear-gradient(180deg, rgba(121,143,148,1) 0%, rgba(96,110,109,1) 100%)" },
     baseStyle: { 'background': "linear-gradient(180deg, rgba(46,55,57,1) 0%, rgba(34,39,39,1) 100%)" },
     textStyle: { 'text-shadow': '0px 0px 0.75px #000000' },

     borderStyle() { return { 'border-radius': '0px', 'border': '0px' } },
     direction: RIGHT,
     width: 300,
     height: 30,
     progress() {
     return (player.AC.kilns.div(tmp.AC.kilnCapacity))
     },
     display() {
     return `Kilns ${format(player.AC.kilns)} / ${format(tmp.AC.kilnCapacity)}`
     },
     unlocked() {
     return player.NG.points.gte(9)
     }
     },
     waterCapacity: {
     fillStyle: { 'background': "linear-gradient(180deg, rgba(45,49,109,1) 0%, rgba(91,199,199,1) 100%)" },
     baseStyle: { 'background': "linear-gradient(180deg, rgba(27,30,67,1) 0%, rgba(50,106,106,1) 100%)" },
     textStyle: { 'text-shadow': '0px 0px 0.75px #000000' },

     borderStyle() { return { 'border-radius': '0px', 'border': '0px' } },
     direction: RIGHT,
     width: 300,
     height: 30,
     progress() {
     return (player.AC.water.div(tmp.AC.waterCapacity))
     },
     display() {
     return `${format(player.AC.water)} / ${format(tmp.AC.waterCapacity)} L Water`
     },
     unlocked() {
     return player.NG.points.gte(9)
     }
     },

     },
     procHeat() {
     let amount = new Decimal(1)
     amount = amount.mul(buyableEffect("AC", "HeatGainI"))
     player.AC.heat = player.AC.heat.add(amount)
     },
     heatFixate() {
     if (player.AC.heat.gt(tmp.AC.heatCapacity)) {
     player.AC.heat = tmp.AC.heatCapacity
     }
     },
     heatCapacity() {
     let BaseC = new Decimal(10)

     BaseC = BaseC.mul(buyableEffect("AC", "HeatCapacityI"))
     return BaseC
     },
     procTanks() {
     let amount = new Decimal(1)
     amount = amount.mul(buyableEffect("AC", "TankGainI"))
     let cost = new Decimal(10)
     cost = cost.mul(buyableEffect("AC", "TankGainI"))
     player.AC.heat = player.AC.heat.sub(cost)
     player.AC.tanks = player.AC.tanks.add(amount)
     },
     tankCapacity() {
     let BaseC = new Decimal(50)

     BaseC = BaseC.mul(buyableEffect("AC", "TankCapacityI"))
     return BaseC
     },
     tankFixate() {
     if (player.AC.tanks.gt(tmp.AC.tankCapacity)) {
     player.AC.tanks = tmp.AC.tankCapacity
     }
     },
     tankNeed() {
     let cost = new Decimal(10)
     cost = cost.mul(buyableEffect("AC", "TankGainI"))
     return cost
     },

     procKilns() {
     let amount = new Decimal(1)
     amount = amount.mul(buyableEffect("AC", "KilnGainI"))
     let cost1 = new Decimal(30)
     let cost2 = new Decimal(5)
     cost1 = cost1.mul(buyableEffect("AC", "KilnGainI"))
     cost2 = cost2.mul(buyableEffect("AC", "KilnGainI"))
     player.AC.heat = player.AC.heat.sub(cost1)
     player.AC.tanks = player.AC.tanks.sub(cost2)
     player.AC.kilns = player.AC.kilns.add(amount)
     },
     kilnCapacity() {
     let BaseC = new Decimal(5)

     BaseC = BaseC.mul(buyableEffect("AC", "KilnCapacityI"))
     return BaseC
     },
     kilnFixate() {
     if (player.AC.kilns.gt(tmp.AC.kilnCapacity)) {
     player.AC.kilns = tmp.AC.kilnCapacity
     }
     },
     kilnNeed() {
     let cost1 = new Decimal(30)
     let cost2 = new Decimal(5)
     cost1 = cost1.mul(buyableEffect("AC", "KilnGainI"))
     cost2 = cost2.mul(buyableEffect("AC", "KilnGainI"))
     return [cost1, cost2]
     },

     procWater() {
     let amount = new Decimal(1)
     amount = amount.mul(buyableEffect("AC", "WaterGainI"))
     let cost1 = new Decimal(100)
     let cost2 = new Decimal(100)
     cost1 = cost1.mul(buyableEffect("AC", "WaterGainI"))
     cost2 = cost2.mul(buyableEffect("AC", "WaterGainI"))
     player.AC.heat = player.AC.heat.sub(cost1)
     player.AC.tanks = player.AC.tanks.sub(cost2)
     player.AC.water = player.AC.water.add(amount)
     },
     waterCapacity() {
     let BaseC = new Decimal(1000)

     BaseC = BaseC.mul(buyableEffect("AC", "WaterCapacityI"))
     return BaseC
     },
     waterFixate() {
     if (player.AC.water.gt(tmp.AC.waterCapacity)) {
     player.AC.water = tmp.AC.waterCapacity
     }
     },
     waterNeed() {
     let heatC = new Decimal(100)
     let tankC = new Decimal(10)
     heatC = heatC.mul(buyableEffect("AC", "WaterGainI"))
     tankC = tankC.mul(buyableEffect("AC", "WaterGainI"))
     return [heatC, tankC]
     },
     clickables: {
     "ProcHeat": {
     title() {
     let state = []
     if (player.AC.heat.gte(tmp.AC.heatCapacity)) {
     state = "MAX"
     }
     return `<b style="font-size:12px">Produce Heat</b><br>
     <b style="font-size:8px">${state}</b>`
     },
     canClick() {
     return player.AC.heat.lt(tmp.AC.heatCapacity)
     },
     onClick() {
     tmp.AC.procHeat();
     },
     style() {
     if (tmp[this.layer].clickables[this.id].canClick) return {
     "background": "linear-gradient(180deg, rgba(255,36,8,1) 0%, rgba(255,158,1,1) 100%)",
     "width": "120px",
     "height": "60px",
     "border-radius": "0px",
     "border": "0px",
     "margin": "5px",
     "color": "#ffffff"
     }
     return {
     "width": "120px",
     "height": "60px",
     "border-radius": "0px",
     "border": "0px",
     "margin": "5px",
     "color": "#000000"
     }
     },
     unlocked() {
     return true
     }
     },
     "ProcTanks": {
     title() {
     let state = []
     if (player.AC.tanks.gte(tmp.AC.tankCapacity)) {
     state = "MAX"
     }
     return `<b style="font-size:12px">Produce Tanks</b><br>
     <b style="font-size:8px">${state}</b>`
     },
     canClick() {
     return player.AC.tanks.lt(tmp.AC.tankCapacity) && player.AC.heat.gte(tmp.AC.tankNeed)
     },
     onClick() {
     tmp.AC.procTanks();
     },
     style() {
     if (tmp[this.layer].clickables[this.id].canClick) return {
     "background": "linear-gradient(180deg, rgba(205,80,66,1) 0%, rgba(122,56,21,1) 100%)",
     "width": "120px",
     "height": "60px",
     "border-radius": "0px",
     "border": "0px",
     "margin": "5px",
     "color": "#ffffff"
     }
     return {
     "width": "120px",
     "height": "60px",
     "border-radius": "0px",
     "border": "0px",
     "margin": "5px",
     "color": "#000000"
     }
     },
     unlocked() {
     return true
     }
     },
     "ProcKilns": {
     title() {
     let state = []
     if (player.AC.kilns.eq(player.AC.kilnCapacity)) {
     state = "MAX"
     }
     return `<b style="font-size:12px">Produce Kilns</b><br>
     <b style="font-size:8px">${state}</b>`
     },
     canClick() {
     return player.AC.kilns.lt(player.AC.kilnCapacity) && player.AC.tanks.gte(5) && player.AC.heat.gte(30)
     },
     onClick() {
     tmp.AC.procKilns();
     },
     style() {
     if (tmp[this.layer].clickables[this.id].canClick) return {
     "background": "linear-gradient(180deg, rgba(121,143,148,1) 0%, rgba(96,110,109,1) 100%)",
     "width": "120px",
     "height": "60px",
     "border-radius": "0px",
     "border": "0px",
     "margin": "5px",
     "color": "#ffffff"
     }
     return {
     "width": "120px",
     "height": "60px",
     "border-radius": "0px",
     "border": "0px",
     "margin": "5px",
     "color": "#000000"
     }
     },
     unlocked() {
     return player.NG.points.gte(9)
     }
     },
     "ProcWater": {
     title() {
     let state = []
     if (player.AC.water.eq(tmp.AC.waterCapacity)) {
     state = "MAX"
     }
     return `<b style="font-size:12px">Produce Water</b><br>
     <b style="font-size:8px">${state}</b>`
     },
     canClick() {
     const [heat, tanks] = tmp.AC.waterNeed

     return player.AC.water.lt(tmp.AC.waterCapacity) &&
     player.AC.heat.gte(tmp.AC.waterNeed.heat) &&
     player.AC.tanks.gte(tmp.AC.waterNeed.tanks)

     },
     onClick() {
     const [tanks, heat] = tmp.AC.waterNeed
     tmp.AC.procWater();

     console.log(typeof heat, typeof tanks)
     },
     style() {
     if (tmp[this.layer].clickables[this.id].canClick) return {
     "background": "linear-gradient(180deg, rgba(45,49,109,1) 0%, rgba(91,199,199,1) 100%)",
     "width": "120px",
     "height": "60px",
     "border-radius": "0px",
     "border": "0px",
     "margin": "5px",
     "color": "#ffffff"
     }
     return {
     "width": "120px",
     "height": "60px",
     "border-radius": "0px",
     "border": "0px",
     "margin": "5px",
     "color": "#000000"
     }
     },
     unlocked() {
     return player.NG.points.gte(9)
     }
     },

     },
     buyables: {
     "HeatGainI": {
     cost(x) {
     let PowerI = new Decimal(1.3)
     let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
     return Calculation;
     },
     buy() {
     let Base = new Decimal(1)
     let Growth = new Decimal(1.3)
     let Currency = player.AC.heat
     let Max = Decimal.affordGeometricSeries(Currency, Base, Growth, getBuyableAmount(this.layer, this.id))
     let Cost = Decimal.sumGeometricSeries(Max, Base, Growth, getBuyableAmount(this.layer, this.id))
     player.AC.heat = player.AC.heat.sub(Cost)
     setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(Max))
     },
     display() {
     var S = tmp[this.layer].buyables[this.id]
     var SV = player[this.layer].buyables[this.id]
     return `<b style="font-size:12px">Job Quantity</b>
     <b style="font-size:10px">Times Bought: ${format(SV, 0)}</b>
     <b style="font-size:10px">${format(S.effect)}x Heat Production</b><br>
     Cost: ${format(S.cost)} Heat`
     },
     canAfford() {
     return player[this.layer].heat.gte(this.cost())
     },
     style() {
     if (tmp[this.layer].buyables[this.id].canAfford)
     return {
     "background": "linear-gradient(180deg, rgba(14,83,167,1) 0%, rgba(1,117,189,1) 100%)",
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#ffffff"
     }
     return {
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#000000"
     }
     },
     effect(x) {
     let PowerI = new Decimal(1.15)

     let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
     return Effect;
     },
     unlocked() {
     return player.NG.points.gte(6)
     }
     },
     "HeatCapacityI": {
     cost(x) {
     let PowerI = new Decimal(1.1)
     let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
     return Calculation;
     },
     buy() {
     let Base = new Decimal(1)
     let Growth = new Decimal(1.1)
     let Currency = player.AC.tanks
     let Max = Decimal.affordGeometricSeries(Currency, Base, Growth, getBuyableAmount(this.layer, this.id))
     let Cost = Decimal.sumGeometricSeries(Max, Base, Growth, getBuyableAmount(this.layer, this.id))
     player.AC.tanks = player.AC.tanks.sub(Cost)
     setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(Max))
     },
     display() {
     var S = tmp[this.layer].buyables[this.id]
     var SV = player[this.layer].buyables[this.id]
     return `<b style="font-size:12px">Capacity</b>
     <b style="font-size:10px">Times Bought: ${format(SV, 0)}</b>
     <b style="font-size:10px">${format(S.effect)}x Heat Capacity</b><br>
     Cost: ${format(S.cost)} Tanks`
     },
     canAfford() {
     return player[this.layer].tanks.gte(this.cost())
     },
     style() {
     if (tmp[this.layer].buyables[this.id].canAfford)
     return {
     "background": "linear-gradient(180deg, rgba(14,83,167,1) 0%, rgba(1,117,189,1) 100%)",
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#ffffff"
     }
     return {
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#000000"
     }
     },
     effect(x) {
     let PowerI = new Decimal(1.15)

     let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
     return Effect;
     },
     unlocked() {
     return player.NG.points.gte(6)
     }
     },
     "HeatEffiencyI": {
     cost(x) {
     let PowerI = new Decimal(1.1)
     let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
     return Calculation;
     },
     buy() {
     let Base = new Decimal(1)
     let Growth = new Decimal(1.1)
     let Currency = player.AC.kilns
     let Max = Decimal.affordGeometricSeries(Currency, Base, Growth, getBuyableAmount(this.layer, this.id))
     let Cost = Decimal.sumGeometricSeries(Max, Base, Growth, getBuyableAmount(this.layer, this.id))
     setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(Max))
     },
     display() {
     var S = tmp[this.layer].buyables[this.id]
     var SV = player[this.layer].buyables[this.id]
     if (player.N.points.gte(9)) {
     return `<b style="font-size:12px">Automation</b>
     <b style="font-size:10px">Times Bought: ${format(SV, 0)}</b>
     <b style="font-size:10px">${format(S.effect)}x Heat Auto Efficiency</b><br>
     Cost: ${format(S.cost)} Kilns`
     }
     return ``
     },
     canAfford() {
     if (player.NG.points.gte(9)) {
     return player[this.layer].kilns.gte(this.cost())
     }
     },
     style() {
     if (player.NG.points.lt(8.9))
     return {
     "background": "url('images/static.gif')",
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#ffffff"
     }
     if (tmp[this.layer].buyables[this.id].canAfford)
     return {
     "background": "linear-gradient(180deg, rgba(14,83,167,1) 0%, rgba(1,117,189,1) 100%)",
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#ffffff"
     }
     if (player.N.points.gt(8)) {
     return {
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#000000"
     }
     }
     },
     effect(x) {
     let PowerI = new Decimal(1.15)

     let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
     return Effect;
     },
     unlocked() {
     return true
     }
     },
     "HeatBoostI": {
     cost(x) {
     let PowerI = new Decimal(2)
     let Calculation = new Decimal(100).mul(Decimal.pow(PowerI, x.pow(1)))
     return Calculation;
     },
     buy() {
     let Base = new Decimal(100)
     let Growth = new Decimal(2)
     let Currency = player.AC.heat
     let Max = Decimal.affordGeometricSeries(Currency, Base, Growth, getBuyableAmount(this.layer, this.id))
     let Cost = Decimal.sumGeometricSeries(Max, Base, Growth, getBuyableAmount(this.layer, this.id))
     player.AC.heat = player.AC.heat.sub(Cost)
     setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(Max))
     },
     display() {
     var S = tmp[this.layer].buyables[this.id]
     var SV = player[this.layer].buyables[this.id]
     return `<b style="font-size:12px">Point Generator Energy</b>
     <b style="font-size:10px">Times Bought: ${format(SV, 0)}</b>
     <b style="font-size:10px">${format(S.effect)}x Points</b><br>
     Cost: ${format(S.cost)} Heat`
     },
     canAfford() {
     return player[this.layer].heat.gte(this.cost())
     },
     style() {
     if (tmp[this.layer].buyables[this.id].canAfford)
     return {
     "background": "linear-gradient(180deg, rgba(14,83,167,1) 0%, rgba(1,117,189,1) 100%)",
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#ffffff"
     }
     return {
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#000000"
     }
     },
     effect(x) {
     let PowerI = new Decimal(2)

     let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
     return Effect;
     },
     unlocked() {
     return player.NG.points.gte(6)
     }
     },

     "TankGainI": {
     cost(x) {
     let PowerI = new Decimal(1.3)
     let Calculation = new Decimal(50).mul(Decimal.pow(PowerI, x.pow(1)))
     return Calculation;
     },
     buy() {
     let Base = new Decimal(50)
     let Growth = new Decimal(1.3)
     let Currency = player.AC.heat
     let Max = Decimal.affordGeometricSeries(Currency, Base, Growth, getBuyableAmount(this.layer, this.id))
     let Cost = Decimal.sumGeometricSeries(Max, Base, Growth, getBuyableAmount(this.layer, this.id))
     player.AC.heat = player.AC.heat.sub(Cost)
     setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(Max))
     },
     display() {
     var S = tmp[this.layer].buyables[this.id]
     var SV = player[this.layer].buyables[this.id]
     return `<b style="font-size:12px">Job Quantity</b>
     <b style="font-size:10px">Times Bought: ${format(SV, 0)}</b>
     <b style="font-size:10px">${format(S.effect)}x Tank Production</b><br>
     Cost: ${format(S.cost)} Heat`
     },
     canAfford() {
     return player[this.layer].heat.gte(this.cost())
     },
     style() {
     if (tmp[this.layer].buyables[this.id].canAfford)
     return {
     "background": "linear-gradient(180deg, rgba(14,83,167,1) 0%, rgba(1,117,189,1) 100%)",
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#ffffff"
     }
     return {
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#000000"
     }
     },
     effect(x) {
     let PowerI = new Decimal(1.15)

     let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
     return Effect;
     },
     unlocked() {
     return player.NG.points.gte(6)
     }
     },
     "TankCapacityI": {
     cost(x) {
     let PowerI = new Decimal(1.1)
     let Calculation = new Decimal(30).mul(Decimal.pow(PowerI, x.pow(1)))
     return Calculation;
     },
     buy() {
     let Base = new Decimal(30)
     let Growth = new Decimal(1.1)
     let Currency = player.AC.tanks
     let Max = Decimal.affordGeometricSeries(Currency, Base, Growth, getBuyableAmount(this.layer, this.id))
     let Cost = Decimal.sumGeometricSeries(Max, Base, Growth, getBuyableAmount(this.layer, this.id))
     player.AC.tanks = player.AC.tanks.sub(Cost)
     setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(Max))
     },
     display() {
     var S = tmp[this.layer].buyables[this.id]
     var SV = player[this.layer].buyables[this.id]
     return `<b style="font-size:12px">Capacity</b>
     <b style="font-size:10px">Times Bought: ${format(SV, 0)}</b>
     <b style="font-size:10px">${format(S.effect)}x Tank Capacity</b><br>
     Cost: ${format(S.cost)} Tanks`
     },
     canAfford() {
     return player[this.layer].tanks.gte(this.cost())
     },
     style() {
     if (tmp[this.layer].buyables[this.id].canAfford)
     return {
     "background": "linear-gradient(180deg, rgba(14,83,167,1) 0%, rgba(1,117,189,1) 100%)",
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#ffffff"
     }
     return {
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#000000"
     }
     },
     effect(x) {
     let PowerI = new Decimal(1.15)

     let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
     return Effect;
     },
     unlocked() {
     return player.NG.points.gte(6)
     }
     },
     "TankEffiencyI": {
     cost(x) {
     let PowerI = new Decimal(1.1)
     let Calculation = new Decimal(10).mul(Decimal.pow(PowerI, x.pow(1)))
     return Calculation;
     },
     buy() {
     let Base = new Decimal(10)
     let Growth = new Decimal(1.1)
     let Currency = player.AC.kilns
     let Max = Decimal.affordGeometricSeries(Currency, Base, Growth, getBuyableAmount(this.layer, this.id))
     let Cost = Decimal.sumGeometricSeries(Max, Base, Growth, getBuyableAmount(this.layer, this.id))
     setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(Max))
     },
     display() {
     var S = tmp[this.layer].buyables[this.id]
     var SV = player[this.layer].buyables[this.id]
     if (player.N.points.gte(9)) {
     return `<b style="font-size:12px">Automation</b>
     <b style="font-size:10px">Times Bought: ${format(SV, 0)}</b>
     <b style="font-size:10px">${format(S.effect)}x Tank Auto Efficiency</b><br>
     Cost: ${format(S.cost)} Kilns`
     }
     return ``
     },
     canAfford() {
     if (player.NG.points.gte(9)) {
     return player[this.layer].kilns.gte(this.cost())
     }
     },
     style() {
     if (player.NG.points.lt(8.9))
     return {
     "background": "url('images/static.gif')",
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#ffffff"
     }
     if (tmp[this.layer].buyables[this.id].canAfford)
     return {
     "background": "linear-gradient(180deg, rgba(14,83,167,1) 0%, rgba(1,117,189,1) 100%)",
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#ffffff"
     }
     if (player.NG.points.gt(8)) {
     return {
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#000000"
     }
     }
     },
     effect(x) {
     let PowerI = new Decimal(1.15)

     let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
     return Effect;
     },
     unlocked() {
     return true
     }
     },

     "KilnGainI": {
     cost(x) {
     let PowerI = new Decimal(1.3)
     let Calculation = new Decimal(500).mul(Decimal.pow(PowerI, x.pow(1)))
     return Calculation;
     },
     buy() {
     let Base = new Decimal(500)
     let Growth = new Decimal(1.3)
     let Currency = player.AC.heat
     let Max = Decimal.affordGeometricSeries(Currency, Base, Growth, getBuyableAmount(this.layer, this.id))
     let Cost = Decimal.sumGeometricSeries(Max, Base, Growth, getBuyableAmount(this.layer, this.id))
     player.AC.heat = player.AC.heat.sub(Cost)
     setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(Max))
     },
     display() {
     var S = tmp[this.layer].buyables[this.id]
     var SV = player[this.layer].buyables[this.id]
     return `<b style="font-size:12px">Job Quantity</b>
     <b style="font-size:10px">Times Bought: ${format(SV, 0)}</b>
     <b style="font-size:10px">${format(S.effect)}x Kiln Production</b><br>
     Cost: ${format(S.cost)} Heat`
     },
     canAfford() {
     return player[this.layer].heat.gte(this.cost())
     },
     style() {
     if (tmp[this.layer].buyables[this.id].canAfford)
     return {
     "background": "linear-gradient(180deg, rgba(14,83,167,1) 0%, rgba(1,117,189,1) 100%)",
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#ffffff"
     }
     return {
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#000000"
     }
     },
     effect(x) {
     let PowerI = new Decimal(1.15)

     let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
     return Effect;
     },
     unlocked() {
     return player.NG.points.gte(6)
     }
     },
     "KilnCapacityI": {
     cost(x) {
     let PowerI = new Decimal(1.1)
     let Calculation = new Decimal(300).mul(Decimal.pow(PowerI, x.pow(1)))
     return Calculation;
     },
     buy() {
     let Base = new Decimal(300)
     let Growth = new Decimal(1.1)
     let Currency = player.AC.tanks
     let Max = Decimal.affordGeometricSeries(Currency, Base, Growth, getBuyableAmount(this.layer, this.id))
     let Cost = Decimal.sumGeometricSeries(Max, Base, Growth, getBuyableAmount(this.layer, this.id))
     player.AC.tanks = player.AC.tanks.sub(Cost)
     setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(Max))
     },
     display() {
     var S = tmp[this.layer].buyables[this.id]
     var SV = player[this.layer].buyables[this.id]
     return `<b style="font-size:12px">Capacity</b>
     <b style="font-size:10px">Times Bought: ${format(SV, 0)}</b>
     <b style="font-size:10px">${format(S.effect)}x Kiln Capacity</b><br>
     Cost: ${format(S.cost)} Tanks`
     },
     canAfford() {
     return player[this.layer].tanks.gte(this.cost())
     },
     style() {
     if (tmp[this.layer].buyables[this.id].canAfford)
     return {
     "background": "linear-gradient(180deg, rgba(14,83,167,1) 0%, rgba(1,117,189,1) 100%)",
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#ffffff"
     }
     return {
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#000000"
     }
     },
     effect(x) {
     let PowerI = new Decimal(1.15)

     let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
     return Effect;
     },
     unlocked() {
     return player.NG.points.gte(6)
     }
     },
     "KilnEffiencyI": {
     cost(x) {
     let PowerI = new Decimal(1.1)
     let Calculation = new Decimal(100).mul(Decimal.pow(PowerI, x.pow(1)))
     return Calculation;
     },
     buy() {
     let Base = new Decimal(100)
     let Growth = new Decimal(1.1)
     let Currency = player.AC.kilns
     let Max = Decimal.affordGeometricSeries(Currency, Base, Growth, getBuyableAmount(this.layer, this.id))
     let Cost = Decimal.sumGeometricSeries(Max, Base, Growth, getBuyableAmount(this.layer, this.id))
     setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(Max))
     },
     display() {
     var S = tmp[this.layer].buyables[this.id]
     var SV = player[this.layer].buyables[this.id]
     if (player.N.points.gte(9)) {
     return `<b style="font-size:12px">Automation</b>
     <b style="font-size:10px">Times Bought: ${format(SV, 0)}</b>
     <b style="font-size:10px">${format(S.effect)}x Tank Auto Efficiency</b><br>
     Cost: ${format(S.cost)} Kilns`
     }
     return ``
     },
     canAfford() {
     if (player.NG.points.gte(9)) {
     return player[this.layer].kilns.gte(this.cost())
     }
     },
     style() {
     if (player.NG.points.lt(8.9))
     return {
     "background": "url('images/static.gif')",
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#ffffff"
     }
     if (tmp[this.layer].buyables[this.id].canAfford)
     return {
     "background": "linear-gradient(180deg, rgba(14,83,167,1) 0%, rgba(1,117,189,1) 100%)",
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#ffffff"
     }
     if (player.NG.points.gt(8)) {
     return {
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#000000"
     }
     }
     },
     effect(x) {
     let PowerI = new Decimal(1.15)

     let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
     return Effect;
     },
     unlocked() {
     return true
     }
     },

     "WaterGainI": {
     cost(x) {
     let PowerI = new Decimal(1.3)
     let Calculation = new Decimal(5000).mul(Decimal.pow(PowerI, x.pow(1)))
     return Calculation;
     },
     buy() {
     let Base = new Decimal(5000)
     let Growth = new Decimal(1.3)
     let Currency = player.AC.heat
     let Max = Decimal.affordGeometricSeries(Currency, Base, Growth, getBuyableAmount(this.layer, this.id))
     let Cost = Decimal.sumGeometricSeries(Max, Base, Growth, getBuyableAmount(this.layer, this.id))
     player.AC.heat = player.AC.heat.sub(Cost)
     setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(Max))
     },
     display() {
     var S = tmp[this.layer].buyables[this.id]
     var SV = player[this.layer].buyables[this.id]
     return `<b style="font-size:12px">Job Quantity</b>
     <b style="font-size:10px">Times Bought: ${format(SV, 0)}</b>
     <b style="font-size:10px">${format(S.effect)}x Water Production</b><br>
     Cost: ${format(S.cost)} Heat`
     },
     canAfford() {
     return player[this.layer].heat.gte(this.cost())
     },
     style() {
     if (tmp[this.layer].buyables[this.id].canAfford)
     return {
     "background": "linear-gradient(180deg, rgba(14,83,167,1) 0%, rgba(1,117,189,1) 100%)",
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#ffffff"
     }
     return {
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#000000"
     }
     },
     effect(x) {
     let PowerI = new Decimal(1.15)

     let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
     return Effect;
     },
     unlocked() {
     return player.NG.points.gte(6)
     }
     },
     "WaterCapacityI": {
     cost(x) {
     let PowerI = new Decimal(1.1)
     let Calculation = new Decimal(3000).mul(Decimal.pow(PowerI, x.pow(1)))
     return Calculation;
     },
     buy() {
     let Base = new Decimal(3000)
     let Growth = new Decimal(1.1)
     let Currency = player.AC.tanks
     let Max = Decimal.affordGeometricSeries(Currency, Base, Growth, getBuyableAmount(this.layer, this.id))
     let Cost = Decimal.sumGeometricSeries(Max, Base, Growth, getBuyableAmount(this.layer, this.id))
     player.AC.tanks = player.AC.tanks.sub(Cost)
     setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(Max))
     },
     display() {
     var S = tmp[this.layer].buyables[this.id]
     var SV = player[this.layer].buyables[this.id]
     return `<b style="font-size:12px">Capacity</b>
     <b style="font-size:10px">Times Bought: ${format(SV, 0)}</b>
     <b style="font-size:10px">${format(S.effect)}x Water Capacity</b><br>
     Cost: ${format(S.cost)} Tanks`
     },
     canAfford() {
     return player[this.layer].tanks.gte(this.cost())
     },
     style() {
     if (tmp[this.layer].buyables[this.id].canAfford)
     return {
     "background": "linear-gradient(180deg, rgba(14,83,167,1) 0%, rgba(1,117,189,1) 100%)",
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#ffffff"
     }
     return {
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#000000"
     }
     },
     effect(x) {
     let PowerI = new Decimal(1.15)

     let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
     return Effect;
     },
     unlocked() {
     return player.NG.points.gte(6)
     }
     },
     "WaterEffiencyI": {
     cost(x) {
     let PowerI = new Decimal(1.1)
     let Calculation = new Decimal(1000).mul(Decimal.pow(PowerI, x.pow(1)))
     return Calculation;
     },
     buy() {
     let Base = new Decimal(1000)
     let Growth = new Decimal(1.1)
     let Currency = player.AC.kilns
     let Max = Decimal.affordGeometricSeries(Currency, Base, Growth, getBuyableAmount(this.layer, this.id))
     let Cost = Decimal.sumGeometricSeries(Max, Base, Growth, getBuyableAmount(this.layer, this.id))
     setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(Max))
     },
     display() {
     var S = tmp[this.layer].buyables[this.id]
     var SV = player[this.layer].buyables[this.id]
     if (player.NG.points.gte(9)) {
     return `<b style="font-size:12px">Automation</b>
     <b style="font-size:10px">Times Bought: ${format(SV, 0)}</b>
     <b style="font-size:10px">${format(S.effect)}x Water Auto Efficiency</b><br>
     Cost: ${format(S.cost)} Kilns`
     }
     return ``
     },
     canAfford() {
     if (player.NG.points.gte(9)) {
     return player[this.layer].kilns.gte(this.cost())
     }
     },
     style() {
     if (player.NG.points.lt(8.9))
     return {
     "background": "url('images/static.gif')",
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#ffffff"
     }
     if (tmp[this.layer].buyables[this.id].canAfford)
     return {
     "background": "linear-gradient(180deg, rgba(14,83,167,1) 0%, rgba(1,117,189,1) 100%)",
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#ffffff"
     }
     if (player.NG.points.gt(8)) {
     return {
     "width": "120px",
     "height": "120px",
     "border-radius": "5px",
     "border": "0px",
     "margin": "5px",
     "color": "#000000"
     }
     }
     },
     effect(x) {
     let PowerI = new Decimal(1.15)

     let Effect = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1)))
     return Effect;
     },
     unlocked() {
     return true
     }
     },
     },
     tabFormat: {
     "Produce Stuff": {
     content: [
     ["row", [["column", [["bar", "heatCapacity"]]], ["clickable", "ProcHeat"]]],
     ["row", [["column", [["bar", "tankCapacity"], ['raw-html', () => { return `<div class="InfoBox"><img src='images/Heat.png' class='cen' width='14' height='14'> ${format(tmp.AC.tankNeed)} Heat</div>` }]]], ["clickable", "ProcTanks"]]],
     ["row", [["column", [["bar", "kilnCapacity"], ['raw-html', () => {
     const [heat, tanks] = tmp.AC.kilnNeed
     if (player.NG.points.gte(9)) { return `<div class="InfoBox"><img src='images/Tanks.png' class='cen' width='14' height='14'> ${format(tanks)} Tanks <img src='images/Heat.png' class='cen' width='14' height='14'> ${format(heat)} Heat</div>` }
     }]]], ["clickable", "ProcKilns"]]],
     ["row", [["column", [["bar", "waterCapacity"], ['raw-html', () => {
     const [heat, tanks] = tmp.AC.waterNeed
     if (player.NG.points.gte(9)) { return `<div class="InfoBox"><img src='images/Tanks.png' class='cen' width='14' height='14'> ${format(tanks)} Tanks <img src='images/Heat.png' class='cen' width='14' height='14'> ${format(heat)} Heat</b></div>` }
     }]]], ["clickable", "ProcWater"]]]
     ]
     },

     "Upgrades": {
     content: [
     ["row", [["buyable", "HeatGainI"], ["buyable", "HeatCapacityI"], ["buyable", "HeatEffiencyI"], ["buyable", "HeatBoostI"]]],
     ["row", [["buyable", "TankGainI"], ["buyable", "TankCapacityI"], ["buyable", "TankEffiencyI"]]],
     ["row", [["buyable", "KilnGainI"], ["buyable", "KilnCapacityI"], ["buyable", "KilnEffiencyI"]]]
     ]
     }
     },*/
    tabFormat: {
        "Produce Stuff": {
            content: [
                ['raw-html', () => {
                    if (player.AC.SPECIAL_RESOURCES["Workers"]["AMOUNT"].gt(0)) {
                        return `<div style='position: absolute; top: 2.5%; right: 2.5%; font-size: 22px; font-family: CRDIMed;'>${formatNoDecimals(player.AC.SPECIAL_RESOURCES["Workers"]["USED_AM"])} / ${formatNoDecimals(player.AC.SPECIAL_RESOURCES["Workers"]["AMOUNT"])}<img src='images/Worker Icon.png' height=44 width=44 class='cen'></div>`
                    }
                    return ``
                }],
                ["row", [["column", [["bar", "HEAT_BAR"]]], ["clickable", "PRODUCE_HEAT"], ["clickable", "HEAT_AUTOMATION_-"], ["clickable", "HEAT_AUTOMATION_+"], ["clickable", "HEAT_AUTOMATION"]]],
                ["blank", "1px"],
                ["row", [["buyable", "HEAT_QUANTITY_I"], ["buyable", "HEAT_CAPACITY_I"], ["buyable", "HEAT_AUTOMATION_CAPACITY_I"], ["buyable", "HEAT_AUTOMATION_EFFICIENCY_I"],]],
                ["blank", "40px"],
                ["row", [["column", [["bar", "TANK_BAR"]]], ["clickable", "PRODUCE_TANKS"], ["clickable", "TANKS_AUTOMATION_-"], ["clickable", "TANKS_AUTOMATION_+"], ["clickable", "TANKS_AUTOMATION"]]],
                ["row", [["buyable", "TANK_QUANTITY_I"], ["buyable", "TANK_CAPACITY_I"], ["buyable", "TANK_AUTOMATION_CAPACITY_I"], ["buyable", "TANK_AUTOMATION_EFFICIENCY_I"]]],
                ['raw-html', () => {
                    if (player.AC.RESOURCES["TANKS"]["UNLOCKED"].gte(1)) {
                        return `
         <br><div class="InfoBox" style="line-height: 12px">
         <span style="font-size: 20px; font-family: CRDIReg">REQUIRED RESOURCES</span><br>
         <img src='images/Heat.png' class='cen' width='20' height='20'> -${format(player.AC.RESOURCES["TANKS"]["REQUIRED_RESOURCES"]["I"])} ${player.AC.RESOURCES["HEAT"]["DISPLAY"]} </div>`
                    }
                    return ``
                }],
                ["blank", "40px"],
                ["row", [["column", [["bar", "KILN_BAR"]]], ["clickable", "PRODUCE_KILNS"], ["clickable", "KILNS_AUTOMATION_-"], ["clickable", "KILNS_AUTOMATION_+"], ["clickable", "KILNS_AUTOMATION"]]],
                ["row", [["buyable", "KILN_QUANTITY_I"], ["buyable", "KILN_CAPACITY_I"], ["buyable", "KILN_AUTOMATION_CAPACITY_I"], ["buyable", "KILN_AUTOMATION_EFFICIENCY_I"]]],
                ['raw-html', () => {
                    if (player.AC.RESOURCES["KILNS"]["UNLOCKED"].gte(1)) {
                        return `
         <br><div class="InfoBox" style="line-height: 12px">
         <span style="font-size: 20px; font-family: CRDIReg">REQUIRED RESOURCES</span><br>
         <img src='images/Heat.png' class='cen' width='20' height='20'> -${format(player.AC.RESOURCES["KILNS"]["REQUIRED_RESOURCES"]["I"])} ${player.AC.RESOURCES["HEAT"]["DISPLAY"]}<br>
         <img src='images/Tanks.png' class='cen' width='20' height='20'>         -${format(player.AC.RESOURCES["KILNS"]["REQUIRED_RESOURCES"]["II"])} ${player.AC.RESOURCES["TANKS"]["DISPLAY"]}</div>`
                    }
                    return ``
                }],
                ["blank", "40px"],
                ["row", [["column", [["bar", "FLUID_BAR"]]], ["clickable", "PRODUCE_FLUID"]]],
                ["row", [["buyable", "FLUID_QUANTITY_I"], ["buyable", "FLUID_CAPACITY_I"]]],
                ['raw-html', () => {
                    if (player.AC.RESOURCES["FLUID"]["UNLOCKED"].gte(1)) {
                        return `
         <br><div class="InfoBox" style="line-height: 12px">
         <span style="font-size: 20px; font-family: CRDIReg">REQUIRED RESOURCES</span><br>
         <img src='images/Heat.png' class='cen' width='20' height='20'> -${format(player.AC.RESOURCES["FLUID"]["REQUIRED_RESOURCES"]["I"])} ${player.AC.RESOURCES["HEAT"]["DISPLAY"]}</div>`
                    }
                    return ``
                }],
            ]
        },
        "Special Stuff": {
            unlocked() {
                return player.AC.RESOURCES["KILNS"]["UNLOCKED"].gte(1)
            },
            content: [
                ["row", [["column", [["bar", "WORKER_BAR"], ["bar", "WORKER_PRODUCTION_BAR"]]], ["clickable", "PRODUCE_WORKERS"]]],
                ["row", [["buyable", "WORKER_SPEED_I"]]],
                ['raw-html', () => {
                    if (player.AC.RESOURCES["KILNS"]["UNLOCKED"].gte(1)) {
                        return `
         <br><div class="InfoBox" style="line-height: 12px">
         <span style="font-size: 20px; font-family: CRDIReg">REQUIRED RESOURCES</span><br>
         <img src='images/Heat.png' class='cen' width='20' height='20'> -${format(player.AC.SPECIAL_RESOURCES["Workers"]["REQUIRED_RESOURCES"][1])} ${player.AC.RESOURCES["HEAT"]["DISPLAY"]} </div>`
                    }
                    return ``
                }],
            ]
        },
        "Permament Upgrades": {
            unlocked() {
                return player.AC.RESOURCES["KILNS"]["UNLOCKED"].gte(1)
            },
            content: [
                ["row", [["buyable", "POINT_BUYABLE_I"], ["buyable", "POINT_BUYABLE_II"], ["buyable", "POINT_BUYABLE_III"], ["buyable", "POINT_BUYABLE_IV"]]]
            ]
        },
        "Debug Options": {
            content: [
                ["row", [["clickable", "FORCE_RESET_WORKERS"]]],
                ["row", [["clickable", "FORCE_RESET_RESOURCES"]]]
            ]
        }
    },
    row: 256,
    displayRow: 254,
    layerShown() {
        return player.NG.points.gte(9)
    }
})