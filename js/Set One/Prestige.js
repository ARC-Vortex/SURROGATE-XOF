addLayer("P", {
    rawText() {
      return `<div class='treeNodeTiTe'>
      <span id='treeNodeTi'>P</span><br>
      <span id='treeNodeSTi'>#1</span></div>`
    },
    startData() { return {
    unlocked: true,
		points: new Decimal(0),
    }},
    requires: new Decimal(10), 
    resource: "Prestige Points", 
    baseResource: "points", 
    baseAmount() {return player.points}, 
    type: "normal", 
    exponent: 0.5, 
    row: 0,
    hotkeys: [
        {key: "P", description: "P: Reset for Prestige Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    prestigeButtonText() {
      return `
      <span id='prestigeResetT1'>Prestige for</span><br><span id='prestigeResetT2'>+${format(tmp.P.resetGain)}</span><br><span id='prestigeResetT1'>Prestige Points</span><br>
      Next at ${format(tmp.P.nextAt)} Points`
    },
    layerShown(){return player.NG.points.gte(2)},
    gainMult() {
      let gain = new Decimal(1)
      return gain
    },
    passiveGeneration() {
      let gen = new Decimal(0)
      gen = gen.add(player.NG.points.gte(5) ? 0.1 : 0)
      return gen
    },
    update(delta) {
      if (player.NG.points.gte(5)) buyUpgrade(this.layer, 11)
      if (player.NG.points.gte(5)) buyUpgrade(this.layer, 12)
      if (player.NG.points.gte(5)) buyUpgrade(this.layer, 13)
      if (player.NG.points.gte(5)) buyUpgrade(this.layer, 14)
      if (player.NG.points.gte(5)) buyUpgrade(this.layer, 15)
      if (player.NG.points.gte(5)) buyUpgrade(this.layer, 16)
      if (player.NG.points.gte(5)) buyUpgrade(this.layer, 17)
      if (player.NG.points.gte(5)) buyUpgrade(this.layer, 18)
      
      if (player.NG.points.gte(5)) buyUpgrade(this.layer, 21)
      if (player.NG.points.gte(5)) buyUpgrade(this.layer, 22)
      if (player.NG.points.gte(5)) buyUpgrade(this.layer, 23)
      if (player.NG.points.gte(5)) buyUpgrade(this.layer, 24)
      if (player.NG.points.gte(5)) buyUpgrade(this.layer, 25)
      if (player.NG.points.gte(5)) buyUpgrade(this.layer, 26)
      if (player.NG.points.gte(5)) buyUpgrade(this.layer, 27)
      if (player.NG.points.gte(5)) buyUpgrade(this.layer, 28)
      
      if (player.NG.points.gte(5)) buyUpgrade(this.layer, 31)
      if (player.NG.points.gte(5)) buyUpgrade(this.layer, 32)
      if (player.NG.points.gte(5)) buyUpgrade(this.layer, 33)
      if (player.NG.points.gte(5)) buyUpgrade(this.layer, 34)
      if (player.NG.points.gte(5)) buyUpgrade(this.layer, 35)
      if (player.NG.points.gte(5)) buyUpgrade(this.layer, 36)
      if (player.NG.points.gte(5)) buyUpgrade(this.layer, 37)
      if (player.NG.points.gte(5)) buyUpgrade(this.layer, 38)
    },
    upgrades: {
     11: {
      title: `<span id='bold-b'>Prestige Upgrade αI</span>`,
        cost: new Decimal(2),
        description() { return `${format(this.effect())}x Point Generation` },
        effect() {
          let base = new Decimal(2)
          return base
        },
        unlocked() {
          return player.NG.points.gte(2)
        }
      },
      12: {
        title: `<span id='bold-b'>Prestige Upgrade αII</span>`,
        cost: new Decimal(2),
        description() { return `${format(this.effect())}x Point Generation` },
        effect() {
          let base = new Decimal(2)
          return base
        },
        unlocked() {
          return player.NG.points.gte(2)
        }
      },
      13: {
        title: `<span id='bold-b'>Prestige Upgrade αIII</span>`,
        cost: new Decimal(2),
        description() { return `${format(this.effect())}x Point Generation` },
        effect() {
          let base = new Decimal(2)
          return base
        },
        unlocked() {
          return player.NG.points.gte(2)
        }
      },
      14: {
        title: `<span id='bold-b'>Prestige Upgrade αIV</span>`,
        cost: new Decimal(2),
        description() { return `${format(this.effect())}x Point Generation` },
        effect() {
          let base = new Decimal(2)
          return base
        },
        unlocked() {
          return player.NG.points.gte(2)
        }
      },
      15: {
        title: `<span id='bold-b'>Prestige Upgrade αV</span>`,
        cost: new Decimal(8),
        description() { return `${format(this.effect())}x Point Generation` },
        effect() {
          let base = new Decimal(2)
          return base
        },
        unlocked() {
          return player.NG.points.gte(3)
        }
      },
      16: {
        title: `<span id='bold-b'>Prestige Upgrade αVI</span>`,
        cost: new Decimal(8),
        description() { return `${format(this.effect())}x Point Generation` },
        effect() {
          let base = new Decimal(2)
          return base
        },
        unlocked() {
          return player.NG.points.gte(3)
        }
      },
      17: {
        title: `<span id='bold-b'>Prestige Upgrade αVII</span>`,
        cost: new Decimal(8),
        description() { return `${format(this.effect())}x Point Generation` },
        effect() {
          let base = new Decimal(2)
          return base
        },
        unlocked() {
          return player.NG.points.gte(3)
        }
      },
      18: {
        title: `<span id='bold-b'>Prestige Upgrade αVIII</span>`,
        cost: new Decimal(8),
        description() { return `${format(this.effect())}x Point Generation` },
        effect() {
          let base = new Decimal(2)
          return base
        },
        unlocked() {
          return player.NG.points.gte(3)
        }
      },
      21: {
        title: `<span id='bold-b'>Prestige Upgrade βI</span>`,
        cost: new Decimal(32),
        description() { return `${format(this.effect())}x Point Generation` },
        effect() {
          let base = new Decimal(3)
          return base
        },
        unlocked() {
          return player.NG.points.gte(4)
        }
      },
      22: {
        title: `<span id='bold-b'>Prestige Upgrade βII</span>`,
        cost: new Decimal(32),
        description() { return `${format(this.effect())}x Point Generation` },
        effect() {
          let base = new Decimal(3)
          return base
        },
        unlocked() {
          return player.NG.points.gte(4)
        }
      },
      23: {
        title: `<span id='bold-b'>Prestige Upgrade βIII</span>`,
        cost: new Decimal(32),
        description() { return `${format(this.effect())}x Point Generation` },
        effect() {
          let base = new Decimal(3)
          return base
        },
        unlocked() {
          return player.NG.points.gte(4)
        }
      },
      24: {
        title: `<span id='bold-b'>Prestige Upgrade βIV</span>`,
        cost: new Decimal(32),
        description() { return `${format(this.effect())}x Point Generation` },
        effect() {
          let base = new Decimal(3)
          return base
        },
        unlocked() {
          return player.NG.points.gte(4)
        }
      },
      25: {
        title: `<span id='bold-b'>Prestige Upgrade βV</span>`,
        cost: new Decimal(128),
        description() { return `${format(this.effect())}x Point Generation` },
        effect() {
          let base = new Decimal(3)
          return base
        },
        unlocked() {
          return player.NG.points.gte(5)
        }
      },
      26: {
        title: `<span id='bold-b'>Prestige Upgrade βVI</span>`,
        cost: new Decimal(128),
        description() { return `${format(this.effect())}x Point Generation` },
        effect() {
          let base = new Decimal(3)
          return base
        },
        unlocked() {
          return player.NG.points.gte(5)
        }
      },
      27: {
        title: `<span id='bold-b'>Prestige Upgrade βVII</span>`,
        cost: new Decimal(128),
        description() { return `${format(this.effect())}x Point Generation` },
        effect() {
          let base = new Decimal(3)
          return base
        },
        unlocked() {
          return player.NG.points.gte(5)
        }
      },
      28: {
        title: `<span id='bold-b'>Prestige Upgrade βVIII</span>`,
        cost: new Decimal(128),
        description() { return `${format(this.effect())}x Point Generation` },
        effect() {
          let base = new Decimal(3)
          return base
        },
        unlocked() {
          return player.NG.points.gte(5)
        }
      },
      31: {
        title: `<span id='bold-b'>Prestige Upgrade γI</span>`,
        cost: new Decimal(512),
        description() { return `${format(this.effect())}x Point Generation` },
        effect() {
          let base = new Decimal(5)
          return base
        },
        unlocked() {
          return player.NG.points.gte(6)
        }
      },
      32: {
        title: `<span id='bold-b'>Prestige Upgrade γII</span>`,
        cost: new Decimal(512),
        description() { return `${format(this.effect())}x Point Generation` },
        effect() {
          let base = new Decimal(5)
          return base
        },
        unlocked() {
          return player.NG.points.gte(6)
        }
      },
      33: {
        title: `<span id='bold-b'>Prestige Upgrade γIII</span>`,
        cost: new Decimal(2048),
        description() { return `${format(this.effect())}x Point Generation` },
        effect() {
          let base = new Decimal(5)
          return base
        },
        unlocked() {
          return player.NG.points.gte(6)
        }
      },
      34: {
        title: `<span id='bold-b'>Prestige Upgrade γIV</span>`,
        cost: new Decimal(2048),
        description() { return `${format(this.effect())}x Point Generation` },
        effect() {
          let base = new Decimal(5)
          return base
        },
        unlocked() {
          return player.NG.points.gte(6)
        }
      },
      35: {
        title: `<span id='bold-b'>Prestige Upgrade γV</span>`,
        cost: new Decimal(8192),
        description() { return `${format(this.effect())}x Point Generation` },
        effect() {
          let base = new Decimal(5)
          return base
        },
        unlocked() {
          return player.NG.points.gte(7)
        }
      },
      36: {
        title: `<span id='bold-b'>Prestige Upgrade γVI</span>`,
        cost: new Decimal(8192),
        description() { return `${format(this.effect())}x Point Generation` },
        effect() {
          let base = new Decimal(5)
          return base
        },
        unlocked() {
          return player.NG.points.gte(7)
        }
      },
      37: {
        title: `<span id='bold-b'>Prestige Upgrade γVII</span>`,
        cost: new Decimal(32768),
        description() { return `${format(this.effect())}x Point Generation` },
        effect() {
          let base = new Decimal(5)
          return base
        },
        unlocked() {
          return player.NG.points.gte(7)
        }
      },
      38: {
        title: `<span id='bold-b'>Prestige Upgrade γVIII</span>`,
        cost: new Decimal(32768),
        description() { return `${format(this.effect())}x Point Generation` },
        effect() {
          let base = new Decimal(5)
          return base
        },
        unlocked() {
          return player.NG.points.gte(7)
        }
      },
      41: {
        title: `<span id='bold-b'>Prestige Upgrade δI</span>`,
        cost: new Decimal(131136),
        description() { return `${format(this.effect())}x Point Generation` },
        effect() {
          let base = new Decimal(9)
          return base
        },
        unlocked() {
          return player.NG.points.gte(8)
        }
      },
      42: {
        title: `<span id='bold-b'>Prestige Upgrade δII</span>`,
        cost: new Decimal(524544),
        description() { return `${format(this.effect())}x Point Generation` },
        effect() {
          let base = new Decimal(9)
          return base
        },
        unlocked() {
          return player.NG.points.gte(8)
        }
      },
      43: {
        title: `<span id='bold-b'>Prestige Upgrade δIII</span>`,
        cost: new Decimal(2098176),
        description() { return `${format(this.effect())}x Point Generation` },
        effect() {
          let base = new Decimal(9)
          return base
        },
        unlocked() {
          return player.NG.points.gte(8)
        }
      },
      44: {
        title: `<span id='bold-b'>Prestige Upgrade δIV</span>`,
        cost: new Decimal(8932704),
        description() { return `${format(this.effect())}x Point Generation` },
        effect() {
          let base = new Decimal(9)
          return base
        },
        unlocked() {
          return player.NG.points.gte(8)
        }
      },
      45: {
        title: `<span id='bold-b'>Prestige Upgrade δV</span>`,
        cost: new Decimal(35e6),
        description() { return `${format(this.effect())}x Point Generation` },
        effect() {
          let base = new Decimal(9)
          return base
        },
        unlocked() {
          return player.NG.points.gte(9)
        }
      },
      46: {
        title: `<span id='bold-b'>Prestige Upgrade δVI</span>`,
        cost: new Decimal(140e6),
        description() { return `${format(this.effect())}x Point Generation` },
        effect() {
          let base = new Decimal(9)
          return base
        },
        unlocked() {
          return player.NG.points.gte(9)
        }
      },
      47: {
        title: `<span id='bold-b'>Prestige Upgrade δVII</span>`,
        cost: new Decimal(560e6),
        description() { return `${format(this.effect())}x Point Generation` },
        effect() {
          let base = new Decimal(9)
          return base
        },
        unlocked() {
          return player.NG.points.gte(9)
        }
      },
      48: {
        title: `<span id='bold-b'>Prestige Upgrade δVIII</span>`,
        cost: new Decimal(2e7),
        description() { return `${format(this.effect())}x Point Generation` },
        effect() {
          let base = new Decimal(9)
          return base
        },
        unlocked() {
          return player.NG.points.gte(9)
        }
      },
    },
    
    buyables: {
      "I": {
cost(x) {
    let pow = new Decimal(1.5)
    let calc = new Decimal.pow(pow, x).mul(5)
    return calc;
  },
  effect(x) {
    let pow = new Decimal(1)
    let calc = new Decimal.mul(pow, x)
    return calc
  },
  display() {
    var S = tmp[this.layer].buyables[this.id]
    var x = player[this.layer].buyables[this.id]
    return `<span>T1 Automizator</span>
            ${format(S.effect)}% <span class='medBodyType'>PP</span> / sec
            C: ${format(S.cost)} <span class='medBodyType'>PP</span>`
  },
  buy() {
    player[this.layer].points = player[this.layer].points.sub(this.cost())
    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
  },
  canAfford() {
    return player[this.layer].points.gte(this.cost())
  },
  unlocked() {
    return true
  },
  style() {
    if (tmp[this.layer].buyables[this.id].canAfford)
      return {
        "width": "300px",
        "height": "150px",
        "border-radius": "0px",
        "border": "1px solid #323232",
        "margin": "0px",
        "color": "#323232",
        "background": "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(125,125,125,1) 49.999%, rgba(200,200,200,1) 50%, rgba(255,255,255,1) 100%)",
        "font-size": "15px",
        "box-shadow": "-2.5px 2.5px 0px #323232"
      }
    return {
      "width": "300px",
      "height": "150px",
      "border-radius": "0px",
      "border": "1px solid #FFFFFF",
      "margin": "0px",
      "color": "#FFFFFF",
      "font-size": "15px",
      "background": "linear-gradient(0deg, rgba(100,100,100,1) 0%, rgba(50,50,50,1) 49.999%, rgba(75,75,75,1) 50%, rgba(100,100,100,1) 100%)",
      "box-shadow": "-2.5px 2.5px 0px #FFFFFF"
    }
  }
      }
},    
    
    tabFormat: {
      "Main": {
        content: [
          ['raw-html', () => {return `You have <span id='gradPP'>${format(player.P.points)}</span> Prestige Points`}],
          "prestige-button",
          ['raw-html', () => {return `<span style='color: rgba(255,255,255,0.5)'>You have ${format(player.points)} Points</span>`}],
          "upgrades"
          ]
      },
    }
})
