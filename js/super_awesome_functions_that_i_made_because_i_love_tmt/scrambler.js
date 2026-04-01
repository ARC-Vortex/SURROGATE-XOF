const SCRAMBLE_POSSIBILITIES = '001010xx00#/\@,.<>[]{}FXAA'

// SCRAMBLE ZONE
function Scrambler(INP, FNL, DUR = 250) {
    let Start = performance.now()
    let OriginalWord = INP.innerText


    function Update(NOW) {
        let Time = NOW - Start
        let Progress = Time / DUR


        if (Progress < 1) {
            let Scrambled = FNL.split('').map((CHR, I) => {
                if (Math.random() < Progress) return CHR


                return SCRAMBLE_POSSIBILITIES[Math.floor(Math.random() * SCRAMBLE_POSSIBILITIES.length)]
            }).join('')


            INP.innerText = Scrambled
            requestAnimationFrame(Update)
        } else {
            INP.innerText = FNL
        }
    }
    requestAnimationFrame(Update)
}