addLayer("B", {
    rawText() {
      return `<div class='treeNodeTiTe'>
          <span id='treeNodeTi'>B</span><br>
          <span id='treeNodeSTi'>#2-1</span></div>`
    },
    position: 0, 
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    requires() {
      let req = new Decimal(1e5)
      req = req.div(player.NG.points.gte(6) ? 1e6 : 1)
      req = req.div(player.NG.points.gte(7) ? 1e6 : 1)
      req = req.div(player.NG.points.gte(8) ? 1e12 : 1)
      req = req.div(hasUpgrade("G", 12) ? upgradeEffect("G", 12) : 1)
      return req
    },
    resource: "Boosters", 
    baseResource: "points", 
    baseAmount() {return player.points}, 
    type: "static", 
    exponent() { 
      let x = player.B.points
      let exp = new Decimal(2)
      return exp
    }, 
    gainMult() { 
        mult = new Decimal(1)
        
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
    let exp = new Decimal(1)
    exp = exp.mul(hasUpgrade("G", 11) ? upgradeEffect("G", 11) : 1)
    return exp
    },
    canBuyMax() {
      return player.NG.points.gte(7)
    },
    resetsNothing() {
      return player.NG.points.gte(9)
    },
    autoPrestige() {
      return player.NG.points.gte(9)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "B", description: "B: Reset for Boosters", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    BoosterEffect() {
      let base = player.B.points
      if (hasUpgrade("B", 25)) base = base.add(tmp.B.bonusBoosterCalc)
      let pow = new Decimal(2)
      pow = pow.add(hasUpgrade("B", 11) ? upgradeEffect("B", 11) : 0)
      pow = pow.add(hasUpgrade("B", 12) ? upgradeEffect("B", 12) : 0)
      pow = pow.add(hasUpgrade("B", 13) ? upgradeEffect("B", 13) : 0)
      pow = pow.add(hasUpgrade("B", 14) ? upgradeEffect("B", 14) : 0)
      pow = pow.add(hasUpgrade("B", 15) ? upgradeEffect("B", 15) : 0)
      pow = pow.add(hasUpgrade("B", 16) ? upgradeEffect("B", 16) : 0)
      pow = pow.add(hasUpgrade("B", 17) ? upgradeEffect("B", 17) : 0)
      pow = pow.add(hasUpgrade("B", 18) ? upgradeEffect("B", 18) : 0)
      
      pow = pow.mul(hasUpgrade("G", 13) ? upgradeEffect("G", 13) : 1)
      pow = pow.mul(hasUpgrade("G", 15) ? upgradeEffect("G", 15) : 1)
      
      let calc = new Decimal.pow(pow, base)
      calc = calc.pow(hasUpgrade("B", 26) ? upgradeEffect("B", 26) : 1)
      return calc
    },
    bonusBoosterCalc() {
     let base = player.B.points
     let ratio = new Decimal(Infinity)
     if (hasUpgrade("B", 25)) ratio = new Decimal(3)
     let calc = new Decimal.div(base, ratio).floor()
     return calc
    },
    update(diff) {
      if (player.NG.points.gte(9)) buyUpgrade(this.layer, 11)
      if (player.NG.points.gte(9)) buyUpgrade(this.layer, 12)
      if (player.NG.points.gte(9)) buyUpgrade(this.layer, 13)
      if (player.NG.points.gte(9)) buyUpgrade(this.layer, 14)
      if (player.NG.points.gte(9)) buyUpgrade(this.layer, 15)
      if (player.NG.points.gte(9)) buyUpgrade(this.layer, 16)
      if (player.NG.points.gte(9)) buyUpgrade(this.layer, 17)
      if (player.NG.points.gte(9)) buyUpgrade(this.layer, 18)
      
      if (player.NG.points.gte(9)) buyUpgrade(this.layer, 21)
      if (player.NG.points.gte(9)) buyUpgrade(this.layer, 22)
      if (player.NG.points.gte(9)) buyUpgrade(this.layer, 23)
      if (player.NG.points.gte(9)) buyUpgrade(this.layer, 24)
      if (player.NG.points.gte(9)) buyUpgrade(this.layer, 25)
      if (player.NG.points.gte(9)) buyUpgrade(this.layer, 26)
    },
    layerShown(){return player.NG.points.gte(4)},
    upgrades: {
      11: {
        title: `<span id='bold-b'>Booster Upgrade αI</span>`,
        cost: new Decimal(1),
        description() { return `+${format(this.effect())} Booster Base<br>
        2.000x Point Generation` },
        effect() {
          let base = new Decimal(0.05)
          return base
        },
        unlocked() {
          return player.NG.points.gte(5)
        }
      },
      12: {
        title: `<span id='bold-b'>Booster Upgrade αII</span>`,
        cost: new Decimal(1),
        description() { return `+${format(this.effect())} Booster Base` },
        effect() {
          let base = new Decimal(0.1)
          return base
        },
        unlocked() {
          return player.NG.points.gte(5)
        }
      },
      13: {
        title: `<span id='bold-b'>Booster Upgrade αIII</span>`,
        cost: new Decimal(2),
        description() { return `+${format(this.effect())} Booster Base<br>
        3.000x Point Generation` },
        effect() {
          let base = new Decimal(0.15)
          return base
        },
        unlocked() {
          return player.NG.points.gte(5)
        }
      },
      14: {
        title: `<span id='bold-b'>Booster Upgrade αIV</span>`,
        cost: new Decimal(2),
        description() { return `+${format(this.effect())} Booster Base` },
        effect() {
          let base = new Decimal(0.2)
          return base
        },
        unlocked() {
          return player.NG.points.gte(5)
        }
      },
      15: {
        title: `<span id='bold-b'>Booster Upgrade αV</span>`,
        cost: new Decimal(4),
        description() { return `+${format(this.effect())} Booster Base<br>
        4.000x Point Generation` },
        effect() {
          let base = new Decimal(0.25)
          return base
        },
        unlocked() {
          return player.NG.points.gte(6)
        }
      },
      16: {
        title: `<span id='bold-b'>Booster Upgrade αVI</span>`,
        cost: new Decimal(4),
        description() { return `+${format(this.effect())} Booster Base` },
        effect() {
          let base = new Decimal(0.3)
          return base
        },
        unlocked() {
          return player.NG.points.gte(6)
        }
      },
      17: {
        title: `<span id='bold-b'>Booster Upgrade αVII</span>`,
        cost: new Decimal(8),
        description() { return `+${format(this.effect())} Booster Base<br>
        5.000x Point Generation` },
        effect() {
          let base = new Decimal(0.35)
          return base
        },
        unlocked() {
          return player.NG.points.gte(6)
        }
      },
      18: {
        title: `<span id='bold-b'>Booster Upgrade αVIII</span>`,
        cost: new Decimal(8),
        description() { return `+${format(this.effect())} Booster Base` },
        effect() {
          let base = new Decimal(0.4)
          return base
        },
        unlocked() {
          return player.NG.points.gte(6)
        }
      },
      21: {
        title: `<span id='bold-b'>Generator Synergism</span>`,
        cost: new Decimal(16),
        description() { return `Make Generators 5x cheaper per Booster, /${format(this.effect())} cost` },
        effect() {
          let base = player.B.points
          let pow = new Decimal(5)
          let calc = new Decimal.pow(pow, base)
          return calc 
        },
        unlocked() {
          return player.NG.points.gte(7)
        }
      },
      22: {
        title: `<span id='bold-b'>Generator Multiplication I</span>`,
        cost: new Decimal(16),
        description() { return `2x Generator gain` },
        effect() {
          let pow = new Decimal(2)
          return pow
        },
        unlocked() {
          return player.NG.points.gte(7)
        }
      },
      23: {
        title: `<span id='bold-b'>Generator Powering</span>`,
        cost: new Decimal(16),
        description() { return `${format(this.effect())}x Generator base related to PWR I` },
        effect() {
          let pow = new Decimal(1.21)
          return pow
        },
        unlocked() {
          return player.NG.points.gte(7)
        }
      },
      24: {
        title: `<span id='bold-b'>Generator Multiplication II</span>`,
        cost: new Decimal(16),
        description() { return `2x Generator gain` },
        effect() {
          let pow = new Decimal(2)
          return pow
        },
        unlocked() {
          return player.NG.points.gte(7)
        }
      },
      25: {
        title: `<span id='bold-b'>Booster Duplication I</span>`,
        cost: new Decimal(24),
        description() { return `Gain 1 bonus Booster every 3rd Booster you own` },
        effect() {
          let pow = new Decimal(2)
          return pow
        },
        unlocked() {
          return player.NG.points.gte(8)
        }
      },
      26: {
        title: `<span id='bold-b'>3D Boosters</span>`,
        cost: new Decimal(28),
        description() { return `Raise Booster effect to the power of ^1.01 which gets multiplied by Booster upgrades bought, ^${format(this.effect())} Booster effect` },
        effect() {
          let base = player.B.upgrades.length
          let pow = new Decimal(1.01)
          let calc = new Decimal.pow(pow, base)
          return calc
        },
        unlocked() {
          return player.NG.points.gte(8)
        }
      },
    },
    tabFormat: {
      "Main": {
        content: [
              ['raw-html', () => { 
                let bonus1 = ``
                if (hasUpgrade("B", 25)) bonus1 = `+ ${format(tmp.B.bonusBoosterCalc)}`
                return `You have <span id='gradB'>${format(player.B.points)} ${bonus1}</span> Boosters` }],
              "prestige-button",
              ['raw-html', () => { return `<span style='color: rgba(255,255,255,0.5)'>You have ${format(player.points)} Points</span>` }],
              ['raw-html', () => { return `<span style='color: rgba(255,255,255,0.5)'>Your Boosters give  ${format(tmp.B.BoosterEffect)}x boost to lower layers</span>` }],
              "upgrades"
              ]
      }
    }
})
