const D = (x)  => new Decimal(x)


function displayPluses(count) {
  let cnt = new Decimal(count)
  if (cnt.lte(0)) {
    return '';
  }
  if (cnt.lte(3)) {
    return '+'.repeat(cnt);
  } else {
    return '+<sup>' + cnt + '</sup>';
  }
}
