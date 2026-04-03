function SyncUIHover(Element, Content, STATE_KEY) {
    if (!Element) return


    const PREVIOUS_STATE = Element.getAttribute("IX-CHG-INP")
    const ANIMATION_TRANSITION = Element.getAttribute("TRANSITION") === "true"


    if (PREVIOUS_STATE !== STATE_KEY) {
        Scrambler(Element, Content, 250)
        Element.setAttribute("IX-CHG-INP", STATE_KEY)
        Element.setAttribute("TRANSITION", "true")
        setTimeout(() => {
            Element.setAttribute("TRANSITION", "false")
        }, 255)
    } else if (!ANIMATION_TRANSITION && Element.innerHTML !== Content) {
        Element.innerHTML = Content
    }
}