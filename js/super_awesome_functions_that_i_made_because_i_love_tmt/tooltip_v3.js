const TooltipV3 = {
    ACTIVE: false,

    UPDATE_FN: null,
    LAST_UPDATE: 0,
    REDRAW_RATE: 30,

    KEEP_OPEN: false,
    KEEP_OPEN_KEY: "i",


    OPEN(RAW_HTML, REDRAW) {
        if (REDRAW === undefined) this.UPDATE_FN = () => {}

        const CTX = document.getElementById('tooltip-v3')
        CTX.innerHTML = RAW_HTML

        this.UPDATE_FN = REDRAW
        this.ACTIVE = true

        CTX.style.visibility = 'visible'
        CTX.style.opacity = 1
    },


    CLOSE() {
        if (this.KEEP_OPEN) return
        else {
            const CTX = document.getElementById('tooltip-v3')


            this.UPDATE_FN = null
            this.ACTIVE = false
            CTX.style.opacity = 0
        }
    },


    RUN() {
        if (!this.ACTIVE) return

        let NOW = Date.now()
        if (NOW - this.LAST_UPDATE > this.REDRAW_RATE) {
            this.LAST_UPDATE = NOW
            this.UPDATE_FN()
        }
    }
}

document.addEventListener('keydown', (KEY) => {
    if (KEY.key === TooltipV3.KEEP_OPEN_KEY) TooltipV3.KEEP_OPEN = true; KEY.preventDefault?.();
})

document.addEventListener('keyup', (KEY) => {
    if (KEY.key === TooltipV3.KEEP_OPEN_KEY) {
        TooltipV3.KEEP_OPEN = false

        const CTX = document.getElementById('tooltip-v3')
        if (!CTX) return

        const RECT = CTX.getBoundingClientRect()
        const MS_X = KEY.clientX || 0
        const MS_Y = KEY.clientY || 0

        if (RECT.left > MS_X || RECT.right < MS_X || RECT.top > MS_Y || RECT.bottom < MS_Y) {
            TooltipV3.CLOSE()
        }
    }
})

document.addEventListener('mousemove', (e) => {
    const tt = document.getElementById('tooltip-v3');
    if (tt && TooltipV3.ACTIVE && !TooltipV3.KEEP_OPEN) {
        let x = e.clientX + 20
        let y = e.clientY + 20


        const padding = 20
        if (x + tt.offsetWidth > window.innerWidth) {
            x = e.clientX - tt.offsetWidth - padding
        }
        if (y + tt.offsetHeight > window.innerHeight) {
            y = e.clientY - tt.offsetHeight - padding
        }

        tt.style.transform = `translate(${x}px, ${y}px)`
    }
});