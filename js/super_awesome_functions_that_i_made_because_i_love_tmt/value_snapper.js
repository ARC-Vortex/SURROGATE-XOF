var value_transitions = {}
const ALPHA = 0.24
const ZERO_SNAP_THRESHOLD = new Decimal("0.001")


window.value_transition_smoothing = function(proxy, actual) {
    let current = value_transitions[proxy]


    if (current === undefined) {
        value_transitions[proxy] = new Decimal(actual)
        return actual
    }

    let diff = new Decimal(actual).sub(current)
    let smoothed = current.add(diff.mul(ALPHA))


    if (new Decimal(actual).eq(0) && smoothed.abs().lt(ZERO_SNAP_THRESHOLD)) {
        smoothed = new Decimal(0)
    }

    value_transitions[proxy] = smoothed
    return smoothed
};