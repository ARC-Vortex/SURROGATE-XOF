addLayer("NG", {
  rawText() {
    return `<div class='treeNodeTiTe'>
      <span id='treeNodeTi'>NG${displayPluses(player.NG.points)}</span><br>
      <span id='treeNodeSTi'>#0</span></div>`
  },
  startData() {
    return {
      unlocked: true,
      points: new Decimal(0),
      endgame: new Decimal(0)
    }
  },
  requires() {
    // static for this is garbage
    let id = player.NG.points
    let table = [
      new Decimal(10), new Decimal(20), new Decimal(1e3),
      new Decimal(2e4), new Decimal(1.5e7), new Decimal(2.5e11),
      new Decimal(1e18), new Decimal(5e47), new Decimal(1e106),
      new Decimal(1e212), new Decimal("1.78e308"), new Decimal("3e450"),
      new Decimal("6e900"), new Decimal("12e2250"), new Decimal("24e6500")
      ]
    return table[id]
  },
  ETADisplayer() {
    let need = tmp.NG.requires;
    let gainR = getPointGen().clampMin(1);
    let currentR = player.points;
    let left = new Decimal(need).sub(currentR)
    if (need.gte("1.78e308")) {
      return new Decimal(1)
    }
    if (gainR.gt(0)) {
      let calc = new Decimal(left).div(gainR).clampMin(1);
      return calc;
    } else {
      return new Decimal(1);
    }
  },
  resource: "V",
  baseResource: "points",
  baseAmount() { return player.points },
  type: "normal",
  exponent: 0,
  row: 255,
  hotkeys: [
    { key: "N", description: "N: Reset for New Game", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
  prestigeButtonText() {
    return `Advance through New Game<br>
      ${format(player.points)} / ${format(tmp.NG.requires)} ${tmp.NG.baseResource} required<br>
      Approximated ETA: ${formatTime(tmp.NG.ETADisplayer)}`
  },
  StartBoostPoints() {
    let POINT_MAG = new Decimal(10)
    let PP_MAG = new Decimal(0)
    let BR_MAG = new Decimal(0)
    let GN_MAG = new Decimal(0)
    if (player.NG.points.gte(3)) POINT_MAG = POINT_MAG.mul(100)
    if (player.NG.points.gte(8)) POINT_MAG = POINT_MAG.mul(1e8)
    
    if (player.NG.points.gte(4)) PP_MAG = PP_MAG.add(16)
    if (player.NG.points.gte(8)) PP_MAG = PP_MAG.mul(1e5)
    
    if (player.NG.points.gte(6)) BR_MAG = BR_MAG.add(3)
    if (player.NG.points.gte(8)) BR_MAG = BR_MAG.mul(3)
    
    if (player.NG.points.gte(8)) GN_MAG = GN_MAG.add(3)
    
    player.G.points = player.G.points.add(GN_MAG)
    player.B.points = player.B.points.add(BR_MAG)
    player.P.points = player.P.points.add(PP_MAG)
    player.points = player.points.add(POINT_MAG)
  },
  UniversalNGReset() {
    layerDataReset("P");
    layerDataReset("B");
    layerDataReset("G");
    player.points = new Decimal(1);
    
    player.NG.points = player.NG.points.add(1);
    tmp.NG.StartBoostPoints();
  },
  StoryProgression() {
    if (player.NG.points.gte(10) && player.NG.endgame.eq(0)) {
      player.NG.endgame = new Decimal(1)
      setTimeout(function() {
        createToast("Oh?", "toast-neutral", 3000);
      }, 0);
      setTimeout(function() {
        createToast("And who are you?", "toast-neutral", 3000);
      }, 3300);
      setTimeout(function() {
        createToast("Whoever you might be, you have suprassed the wall...", "toast-neutral", 3000);
      }, 6600);
      setTimeout(function() {
        createToast("You know there was no reward for that, right?", "toast-neutral", 3000);
      }, 9900);
      setTimeout(function() {
        createToast("Let this be between us, do not tell the developer about this...", "toast-neutral", 3000);
      }, 13200);
      setTimeout(function() {
        createToast("But, NG+(9) is a bug, you should've not gotten at first place", "toast-neutral", 3000);
      }, 16500);
      setTimeout(function() {
        createToast("Think about this. Why is there Infinity and a new NG type at same spot?", "toast-neutral", 3000);
      }, 19800);
    }
  },
  clickables: {
    "doNG": {
      display() {
        return `Advance through New Game<br>
      ${format(player.points)} / ${format(tmp.NG.requires)} ${tmp.NG.baseResource} required<br>
      Approximated ETA: ${formatTime(tmp.NG.ETADisplayer)}`
      },
      canClick() {
       return player.points.gte(tmp.NG.requires) 
      },
      onClick() {
        tmp.NG.UniversalNGReset()
      },
      style() {
        if (tmp[this.layer].clickables.canClick) return {
          'background': 'linear-gradient(55deg, rgba(255, 241, 0, 0.5) 0% , rgba(0, 255, 212, 0.5) 100%)',
          'color': 'rgba(0, 0, 0, 0.75)',
          'border-radius': '0px',
          'border-width': '0px',
          'box-shadow': '0px 2px 0px rgba(0, 0, 0, 0.25)',
          'width': '450px',
          'height': '125px',
        }
        return {
          'background': 'linear-gradient(55deg, rgba(255, 241, 0, 0.5) 0% , rgba(0, 255, 212, 0.5) 100%)',
          'color': 'rgba(0, 0, 0, 0.75)',
          'border-radius': '0px',
          'border-width': '0px',
          'box-shadow': '0px 2px 0px rgba(0, 0, 0, 0.25)',
          'width': '450px',
          'height': '125px',
        }
      }
    }
  },
  tabFormat: {
    "+": {
      content: [
      "main-display",
      ["clickable", "doNG"],
      ['raw-html', () => { return `Doing NG reset will reset everything below it execept those which are specifically marked` }],
      "blank",
      "blank",
      ['raw-html', () => {
          if (player.NG.points.gte(1)) {
            return `
      <div class='prototype-cont-v1'>
      <div class='title'><span class='prototype-title' id='bold-t'>Normalized</span><span class='prototype-ordinal' id='bold-t'>#0_I</span></div>
      <br><br>
      <div class='body'>
      + Start generating 1 <span style='font-family: CRDIMed'>Point</span> per sec
      </div>
      </div>`
          }
          return ``
      }],
      "blank",
      ['raw-html', () => {
          if (player.NG.points.gte(2)) {
            return `
      <div class='prototype-cont-v1'>
      <div class='title'><span class='prototype-title' id='bold-t'>NG+</span><span class='prototype-ordinal' id='bold-t'>#0_II</span></div>
      <br><br>
      <div class='body'>
      + Unlock <span style='font-family: CRDIMed'>Prestige</span> layer<br>
      + This will also unlock 4 <span style='font-family: CRDIMed'>αPrestige</span> upgrades
      </div>
      </div>`
          }
          return ``
      }],
      "blank",
      ['raw-html', () => {
          if (player.NG.points.gte(3)) {
            return `
      <div class='prototype-cont-v1'>
      <div class='title'><span class='prototype-title' id='bold-t'>NG++</span><span class='prototype-ordinal' id='bold-t'>#0_III</span></div>
      <br><br>
      <div class='body'>
      + Start with 1,000 <span style='font-family: CRDIMed'>Points</span><br>
      + Unlock 4 new <span style='font-family: CRDIMed'>αPrestige</span> upgrades<br>
      </div>
      </div>`
          }
          return ``
      }],
      "blank",
      ['raw-html', () => {
          if (player.NG.points.gte(4)) {
            return `
      <div class='prototype-cont-v1'>
      <div class='title'><span class='prototype-title' id='bold-t'>NG+++</span><span class='prototype-ordinal' id='bold-t'>#0_IV</span></div>
      <br><br>
      <div class='body'>
      + Unlock <span style='font-family: CRDIMed'>Booster</span> layer<br>
      + Start with 16 <span style='font-family: CRDIMed'>Prestige Points</span><br>
      + Unlock 4 <span style='font-family: CRDIMed'>βPrestige</span> upgrades<br>
      </div>
      </div>`
          }
          return ``
      }],
      "blank",
      ['raw-html', () => {
        if (player.NG.points.gte(5)) {
          return `
      <div class='prototype-cont-v1'>
      <div class='title'><span class='prototype-title' id='bold-t'>NG+(4)</span><span class='prototype-ordinal' id='bold-t'>#0_V</span></div>
      <br><br>
      <div class='body'>
      + Unlock 4 <span style='font-family: CRDIMed'>αBooster</span> upgrades<br>
      + Unlock 4 <span style='font-family: CRDIMed'>βPrestige</span> upgrades<br>
      + Unlock T1 <span style='font-family: CRDIMed'>Prestige</span> automization ( currently uncustomizable )<br>
      </div>
      </div>`
        }
        return ``
      }],
      "blank",
      ['raw-html', () => {
        if (player.NG.points.gte(6)) {
          return `
      <div class='prototype-cont-v1'>
      <div class='title'><span class='prototype-title' id='bold-t'>NG+(5)</span><span class='prototype-ordinal' id='bold-t'>#0_VI</span></div>
      <br><br>
      <div class='body'>
      + <span style='font-family: CRDIMed'>Boosters</span> are 1,000,000 times cheaper<br>
      + Start with 3 <span style='font-family: CRDIMed'>Boosters</span><br>
      + Unlock 4 <span style='font-family: CRDIMed'>αBooster</span> upgrades<br>
      + Unlock 4 <span style='font-family: CRDIMed'>γPrestige</span> upgrades<br>
      </div>
      </div>`
        }
        return ``
      }],
      "blank",
      ['raw-html', () => {
        if (player.NG.points.gte(7)) {
          return `
      <div class='prototype-cont-v1'>
      <div class='title'><span class='prototype-title' id='bold-t'>NG+(6)</span><span class='prototype-ordinal' id='bold-t'>#0_VII</span></div>
      <br><br>
      <div class='body'>
      + Unlock <span style='font-family: CRDIMed'>Generator</span> layer<br>
      + This also unlocks 4 normalized <span style='font-family: CRDIMed'>Generator</span> upgrades<br>
      + Unlock ability to bulk buy <span style='font-family: CRDIMed'>Boosters</span><br>
      + <span style='font-family: CRDIMed'>Boosters</span> are 1,000,000 times cheaper<br>
      + Unlock 4 normalized <span style='font-family: CRDIMed'>Booster</span> upgrades<br>
      + Unlock 4 <span style='font-family: CRDIMed'>γPrestige</span> upgrades<br>
      </div>
      </div>`
        }
        return ``
      }],
      "blank",
      ['raw-html', () => {
        if (player.NG.points.gte(8)) {
          return `
      <div class='prototype-cont-v1'>
      <div class='title'><span class='prototype-title' id='bold-t'>NG+(7)</span><span class='prototype-ordinal' id='bold-t'>#0_VIII</span></div>
      <br><br>
      <div class='body'>
      + Start with 3 <span style='font-family: CRDIMed'>Generators</span>, 9 <span style='font-family: CRDIMed'>Boosters</span> , 3,000,000 <span style='font-family: CRDIMed'>Prestige Points</span> and 10,000,000,000 <span style='font-family: CRDIMed'>Points</span><br>
      + Unlock 2 more normalized <span style='font-family: CRDIMed'>Generator</span> upgrades<br>
      + Unlock ability to bulk buy <span style='font-family: CRDIMed'>Generators</span><br>
      + <span style='font-family: CRDIMed'>Generators</span> are 1,000,000 times cheaper<br>
      + <span style='font-family: CRDIMed'>Boosters</span> are 1,000,000,000,000 times cheaper<br>
      + Unlock 2 more normalized <span style='font-family: CRDIMed'>Booster</span> upgrades<br>
      + Unlock 4 <span style='font-family: CRDIMed'>δPrestige</span> upgrades<br>
      </div>
      </div>`
        }
        return ``
      }],
      "blank",
      ['raw-html', () => {
        if (player.NG.points.gte(9)) {
          return `
      <div class='prototype-cont-v1'>
      <div class='title'><span class='prototype-title' id='bold-t'>NG+(8)</span><span class='prototype-ordinal' id='bold-t'>#0_IX</span></div>
      <br><br>
      <div class='body'>
      + Unlock <span style='font-family: CRDIMed'>Accelerant</span><br>
      + <span style='font-family: CRDIMed'>Boosters</span> and <span style='font-family: CRDIMed'>Generators</span> don't reset anything below them<br>
      + <span style='font-family: CRDIMed'>Boosters</span> and <span style='font-family: CRDIMed'>Generators</span> are also fully automated now<br>
      + Unlock 4 <span style='font-family: CRDIMed'>δPrestige</span> upgrades
      </div>
      </div>`
        }
        return ``
      }],
      "blank",
      ['raw-html', () => {
        if (player.NG.points.gte(10)) {
          return `
      <div class='prototype-cont-v2'>
      <div class='title'><span class='prototype-title' id='bold-t'>NG+(9) [ ENDGAME ]</span><span class='prototype-ordinal' id='bold-t'>#0_X</span></div>
      <br><br>
      <div class='body'>
      + DOES NOT UNLOCK THOSE 2 BELOW<br>
      + But thanks for playing NG+(inf) V4<br><br>
      + Unlock <span style='font-family: CRDIMed'>Infinity</span><br>
      + Unlock <span style='font-family: CRDIMed'>NG×</span>
      </div>
      </div>`
        }
        return ``
      }]
      ]
    },
    "Index": {
      unlocked() { return player.NG.points.gte(1) },
      content: [
      ['raw-html', () => {
        if (player.NG.points.gte(1)) {
          return `
      <div class='prototype-cont-v9'>
      <div class='title'><span class='prototype-title' id='bold-t'>D_743 </span><span class='prototype-ordinal' id='bold-t'>New Game(s)</span></div>
      <br><br>
      <div class='body'>
      > One way to progress through this game is by resetting for New Game. It will reset anything below it, with some rare execeptions. However this will grant you new stuff to further progress in game. You will receive some strong bonuses such as new layers, upgrades, bonuses etc. You also can gain automation and persistance later in game!<br><br>
      > There isn't only + types ;)
      </div>
      </div>`
        }
        return ``
      }],
      "blank",
      ['raw-html', () => {
        if (player.NG.points.gte(6)) {
          return `
      <div class='prototype-cont-v9'>
      <div class='title'><span class='prototype-title' id='bold-t'>I_211 </span><span class='prototype-ordinal' id='bold-t'>Normalized Upgrades?</span></div>
      <br><br>
      <div class='body'>
      <span id='test'> You probably have seen that, αPrestige upgrades are similar to βPresrige upgrades etc. Or that Booster upgrades follow same pattern... Well here they are called non-normalized upgrades which are just repetive upgrades. Normalized upgrades do not follow that same pattern and are unique from eachother, at some parts. </span><br><br>
      > Only real difference to non-normalized upgrades are small boost and cost differ...
      </div>
      </div>`
        }
        return ``
      }],
      "blank",
      ['raw-html', () => {
        if (player.AC.RESOURCES["HEAT"]["LFTM_AMOUNT"].gte(10)) {
          return `
      <div class='prototype-cont-v9'>
      <div class='title'><span class='prototype-title' id='bold-t'>E_033 </span><span class='prototype-ordinal' id='bold-t'>Accelerant Stuff</span></div>
      <br><br>
      <div class='body'>
      <span id='test'>Accelerant is very grindy part of the game but also has assortments of various and helpful upgrades. This is somewhat a resource management also but its really simple to get used to it. Some parts will require some heavy clicking but there are also various automators that should help you progress much faster!</span><br><br>
      > Accelerant is based off Armory & Machine, which frankly is more simpler version of it. Almost like its NG+ of it...
      </div>
      </div>`
        }
        return ``
      }],
        ]
    }
  },
  layerShown() { return true }
})