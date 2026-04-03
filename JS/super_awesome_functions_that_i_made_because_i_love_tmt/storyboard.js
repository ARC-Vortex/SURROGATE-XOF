let Storyboard = document.querySelector('.storyboard')

let CRT_Text = ""
let CHR_IX = 0
let TypingInt = null
let IS_TYPING = false


function TypeNextCHR() {
    if (CHR_IX >= CRT_Text.length) return


    if (CHR_IX < CRT_Text.length) {
        Storyboard.innerHTML += CRT_Text[CHR_IX]
        CHR_IX++
    } else {
        clearInterval(TypingInt)


        IS_TYPING = false
    }
}


function StartTyping(LN) {
    Storyboard.innerHTML = ""
    CRT_Text = LN
    CHR_IX = 0
    IS_TYPING = true


    TypingInt = setInterval(TypeNextCHR, 100)
}


function SkipTyping() {
    if (IS_TYPING) {
        clearInterval(TypingInt)


        Storyboard.innerHTML = CRT_Text
        IS_TYPING = false
    } else {
        CHR_IX++


        if (CHR_IX < CRT_Text.length) {
            StartTyping()
        }
    }
}