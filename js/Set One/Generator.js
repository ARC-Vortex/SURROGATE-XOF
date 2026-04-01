addLayer("G", {
    rawText() {
      return `<div class='treeNodeTiTe'>
          <span id='treeNodeTi'>G</span><br>
          <span id='treeNodeSTi'>#2-2</span></div>`
    },
    position: 1, 
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		gen_PWR_I: new Decimal(0),
    }},
    requires() {
      let base = new Decimal(1e6)
      base = base.div(player.NG.points.gte(8) ? 1e6 : 1)
      base = base.div(hasUpgrade("B", 21) ? upgradeEffect("B", 21) : 1)
      return base
    }, 
    resource: "Generators", 
    baseResource: "points", 
    baseAmount() {return player.points}, 
    type: "static", 
    exponent() { 
      let x = player.G.points
      let exp = new Decimal(2.5)
      return exp
    }, 
    gainMult() { 
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
      let exp = new Decimal(1)
      exp = exp.mul(hasUpgrade("B", 22) ? upgradeEffect("B", 22) : 1)
      exp = exp.mul(hasUpgrade("B", 24) ? upgradeEffect("B", 24) : 1)
      return exp
    },
    canBuyMax() {
      return player.NG.points.gte(8)
    },
    resetsNothing() {
      return player.NG.points.gte(9)
    },
    autoPrestige() {
      return player.NG.points.gte(9)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "G", description: "G: Reset for Boosters", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.NG.points.gte(7)},
    gainPWRI() {
      let base = new Decimal(0)
      dbpow = new Decimal(0.5)
      basepow = new Decimal(3)
      basepow = basepow.mul(hasUpgrade("B", 23) ? upgradeEffect("B", 23) : 1)
      let calc1 = new Decimal.pow(basepow, player.G.points).pow(dbpow)
      base = base.add(calc1.sub(1))
      return base
    },
    calcPWRIBoost() {
      let base = player.G.gen_PWR_I
      let boost = new Decimal(1.25)
      boost = boost.mul(hasUpgrade("B", 23) ? upgradeEffect("B", 23) : 1)
      let dw1 = new Decimal(0.5)
      let calc = new Decimal.mul(base, 0.25).pow(boost).pow(dw1).add(1)
      return calc
    },
    update(diff) {
      player.G.gen_PWR_I = player.G.gen_PWR_I.add((tmp.G.gainPWRI).mul(diff))
        if (player.NG.points.gte(9)) buyUpgrade(this.layer, 11)
        if (player.NG.points.gte(9)) buyUpgrade(this.layer, 12)
        if (player.NG.points.gte(9)) buyUpgrade(this.layer, 13)
        if (player.NG.points.gte(9)) buyUpgrade(this.layer, 14)
        if (player.NG.points.gte(9)) buyUpgrade(this.layer, 15)
        if (player.NG.points.gte(9)) buyUpgrade(this.layer, 16)
    },
    upgrades: {
        11: {
          title: `<span id='bold-b'>Booster Multiplication</span>`,
          cost: new Decimal(2),
          description() { return `2x Booster Gain` },
          effect() {
            let base = new Decimal(2)
            return base
          },
          unlocked() {
            return player.NG.points.gte(7)
          }
        },
        12: {
          title: `<span id='bold-b'>Booster Synergism</span>`,
          cost: new Decimal(4),
          description() { return `Make Boosters 12x cheaper per Generator, /${format(this.effect())} cost` },
            effect() {
              let base = player.G.points
              let pow = new Decimal(12)
              let calc = new Decimal.pow(pow, base)
              return calc
            },
          unlocked() {
            return player.NG.points.gte(7)
          }
        },
        13: {
          title: `<span id='bold-b'>Booster Powering</span>`,
          cost: new Decimal(9),
          description() { return `${format(this.effect())}x Booster Base` },
          effect() {
            let base = player.G.points
            let pow = new Decimal(1.21)
            return pow
          },
          unlocked() {
            return player.NG.points.gte(7)
          }
        },
        14: {
          title: `<span id='bold-b'>Super Synergism</span>`,
          cost: new Decimal(12),
          description() { 
            return `Gain ${format(this.effect1())}x more Points per Generator and ${format(this.effect2())}x per Booster` },
          effect1() {
            let base1 = player.G.points
            let pow1 = new Decimal(2.5)
            let calc1 = new Decimal.pow(pow1, base1)
          return calc1
          },
          effect2() {
            let base2 = player.B.points
            let pow2 = new Decimal(2)
            let calc2 = new Decimal.pow(pow2, base2)
            return calc2
          },
          unlocked() {
            return player.NG.points.gte(7)
          }
        },
        15: {
          title: `<span id='bold-b'>Accelerated Boosting</span>`,
          cost: new Decimal(16),
          description() { return `${format(this.effect())}x to Booster base, 1.077x per Generator` },
          effect() {
            let base = player.G.points
            let pow = new Decimal(1.077)
            let calc = new Decimal.pow(pow, base)
            return calc
          },
          unlocked() {
            return player.NG.points.gte(8)
          }
        },
        16: {
          title: `<span id='bold-b'>Little Request</span>`,
          cost: new Decimal(1),
          description() { return `Please give me a tiny Point boost ` },
          effect() {
            let calc = new Decimal(100)
            return calc
          },
          unlocked() {
            return player.NG.points.gte(8) && hasUpgrade("G", 15)
          }
        },
    },
    tabFormat: {
      "Main": {
        content: [
              ['raw-html', () => { 
                let scale = ``
                if (player.G.points.gte(100)) scale = `Super-Scaled` 
                if (player.G.points.gte(500)) scale = `Hyper-Scaled` 
                return `You have <span id='gradG'>${format(player.G.points)}</span> ${scale} Generators` }],
              "prestige-button",
              ['raw-html', () => { return `<span style='color: rgba(255,255,255,0.5)'>You have ${format(player.points)} Points</span>` }],
              ['raw-html', () => { return `<span style='color: rgba(255,255,255,0.5)'>You have ${format(player.G.gen_PWR_I)} Power I ( +${format(tmp.G.gainPWRI)}/s )</span>` }],
              ['raw-html', () => { return `<span style='color: rgba(255,255,255,0.5)'>Which gives ${format(tmp.G.calcPWRIBoost)}x boost to Points</span>` }],
              "blank",
              "upgrades"
              ]
      }
    }
})
