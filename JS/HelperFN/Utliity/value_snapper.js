var TRANSISTION_CACHE = {}
const ALPHA_TIME = 0.24
const ZERO_SNAP_THRESHOLD = new Decimal("0.001")


function value_transition_smoothing(Proxy, Input) {
    let CRT = TRANSISTION_CACHE[Proxy]
    if (CRT === undefined) {
        TRANSISTION_CACHE[Proxy] = D(Input)
        return Input
    }


    let DIFF = new Decimal(Input).sub(CRT)
    let DELTA = CRT.add(DIFF.mul(ALPHA_TIME))
    if (new Decimal(Input).eq(0) && DELTA.abs().lt(ZERO_SNAP_THRESHOLD)) {
        DELTA = D(0)
    }


    TRANSISTION_CACHE[Proxy] = DELTA
    return DELTA
};