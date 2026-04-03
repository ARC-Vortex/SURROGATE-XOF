// I have no fucking idea what those really are but they are needed to make certain notations work

function powExp(n, exp){ // dilate
	if (n.lt(10)) return n
	return Decimal.pow(10,n.log10().pow(exp))
}

function powExp2(n, exp){ // Trilate
	if (n.lt(1e10)) return n
	return Decimal.pow(10,Decimal.pow(10,n.log10().log10().pow(exp)))
}

function powExp3(n, exp){ // Tetralate
	if (n.lt(Decimal.pow(10,1e10))) return n
	return Decimal.pow(10,Decimal.pow(10,Decimal.pow(10,n.log10().log10().log10().pow(exp))))
}

function powExpN(num, n, exp){ // n-late
	num = new Decimal(num)
	exp = new Decimal(exp)
	if (num.lt(tet10(n))) return num
	return slogadd(slogadd(num,-n).pow(exp),n)
}

function mulSlog(n, mul){
	if (n.lt(10)) return n
	return tet10(slog(n).mul(mul))
}

function powSlog(n, exp){ 
	if (n.lt(10)) return n
	return tet10(slog(n).pow(exp))
}

function powSlogExp(n, exp){ 
	if (n.lt(10)) return n
	return tet10(powExp(slog(n),exp))
}

function slog(n){
	n = new Decimal(n)
	return Decimal.add(n.layer,new Decimal(n.mag).slog())
}


function slogadd(n,add){
	n = new Decimal(n)
	return Decimal.tetrate(10,slog(n).add(add))
}

function tet10(n){
	n = new Decimal(n)
	return Decimal.tetrate(10,n)
}

// ************ Big Feature related ************
function getTimesRequired(chance, r1){
	chance = new Decimal(chance)
	if (chance.gte(1)) return 1
	if (chance.lte(0)) return Infinity
	if (r1 == undefined) r1 = Math.random()
	//we want (1-chance)^n < r1
	let n
	if (chance.log10().gt(-5)){
			n = Decimal.ln(r1).div(Math.log(1-chance))
	} else {
			n = Decimal.ln(1/r1).div(chance)
	}
	//log(1-chance) of r2
	return n.floor().add(1)
}
function bulkRoll(chance,ms,r1) {
	chance = new Decimal(chance)
	if (r1 == undefined) r1 = Math.random()
	let n = 1-((1-r1)**(50/ms))
	let c = Decimal.log(n,1/Math.E).div(chance)
	return c.floor()
}
function recurse(func, startingValue, times){
	if (times <= 0) return startingValue
	return recurse(func, func(startingValue), times-1)
}

//Tree of life
function getLogisticTimeConstant(current, gain, loss){
	if (current.eq(gain.div(loss))) return Infinity
	if (current.gt(gain.div(loss))) return current.times(loss).sub(gain).ln().div(-1).div(loss)
	return current.times(loss).sub(gain).times(-1).ln().div(-1).div(loss)
}

function logisticTimeUntil(goal, current, gain, loss){
	if (current.gte(goal)) return formatTime(0)
	if (goal.gte(gain.div(loss))) return formatTime(1/0)
	// we have current < goal < gain/loss
	val1 = goal.times(loss) //Bx
	val2 = gain.sub(val1) //A-Bx
	val3 = val2.ln() //ln(A-Bx)
	val4 = val3.times(-1).div(loss) //LHS

	c = getLogisticTimeConstant(current, gain, loss)
	return formatTime(val4.sub(c))  
}

function getLogisticAmount(current, gain, loss, diff){
	if (loss.eq(0)) return current.add(gain.mul(diff))
	if (current.eq(gain.div(loss))) return current
	if (gain.gte("ee10") || loss.gte(1e308)) return gain.div(loss)
	if (current.lt(gain.div(loss))) {
			c = getLogisticTimeConstant(current, gain, loss)
			
			val1 = c.plus(diff) // t+c
			val2 = val1.times(-1).times(loss) // -B(t+c)
			val3 = Decimal.exp(val2) // this should be A-Bx
			val4 = gain.sub(val3) // should be A-(A-Bx) = Bx
			val5 = val4.div(loss) // should be x

			return val5.max(0)
	} else {
			c = getLogisticTimeConstant(current, gain, loss)
			
			val1 = c.plus(diff) // t+c
			val2 = val1.times(-1).times(loss) // -B(t+c)
			val3 = Decimal.exp(val2) // this should be Bx-A
			val4 = gain.plus(val3) // should be (Bx-A)+A
			val5 = val4.div(loss) // should be x

			return val5.max(0)
	}
}

function createToast(message, state, duration) {
  const toastContainer = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.classList.add("toast", state, "show-toast");
  const flexContainer = document.createElement("div");
  flexContainer.classList.add("flex-container");
  const textSpan = document.createElement("span");
  textSpan.textContent = message;
  textSpan.style.display = "flex";
  textSpan.style.alignItems = "center";


  flexContainer.appendChild(textSpan);
  toast.appendChild(flexContainer);
  toastContainer.appendChild(toast);
  toast.offsetWidth;


  toast.style.opacity = "1";
  setTimeout(() => {
    toast.style.opacity = "0";
  }, duration);
  toast.addEventListener("transitionend", () => {
    toast.remove();
  });
}

function SKnode({layer, currency, canAfford, unlocked, display, cost, effect, tooltip, branches, color="#ffffff", width=5}) { return {
    fullDisplay() { return display() },
    cost() { return cost() },
    canAfford() { return player[layer][currency].gte(this.cost()) },
    tooltip() { return tooltip()  },
    unlocked() { return unlocked() },
    branches: [[branches, color, width]],
    style() {
        if (hasUpgrade(this.layer, this.id))
            return {
                "width": "50px",
                "height": "50px",
                "border-radius": "0px",
                "border": "0px",
                "margin": "10px",
                "color": "#ffffff",
                "background": "linear-gradient(0deg, rgba(48,78,39,1) 0%, rgba(80,125,73,1) 35%, rgba(109,247,134,1) 100%)",
                "font-size": "15px"
            }
        else if (tmp[this.layer].upgrades[this.id].canAfford)
            return {
                "width": "50px",
                "height": "50px",
                "border-radius": "0px",
                "border": "0px",
                "margin": "10px",
                "color": "#ffffff",
                "background": "linear-gradient(0deg, rgba(39,39,39,1) 0%, rgba(120,120,129,1) 35%, rgba(221,238,242,1) 100%)",
                "font-size": "15px"
            }
        return  {
            "width": "50px",
            "height": "50px",
            "border-radius": "0px",
            "border": "0px",
            "margin": "10px",
            "color": "#000000",
            "font-size": "15px",
            "background": "linear-gradient(180deg, rgba(78,39,39,1) 0%, rgba(125,73,73,1) 35%, rgba(247,109,109,1) 100%)"
        }
    }
} }

function SKfiller({unlocked}) { return {
    cost() { return new Decimal(Infinity) },
    unlocked() { return unlocked()},
    style() {
        return {
            "width": "50px",
            "height": "50px",
            "border-radius": "0px",
            "border": "0px",
            "margin": "10px",
            "color": "rgba(0,0,0,0)",
            "font-size": "15px",
            "background": "rgba(0,0,0,0)"
        }
    }
} }