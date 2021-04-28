function narcissisticNumber(lines) {
  const tmp = lines[0].split(' ')
  for (let i = Number(tmp[0]); i <= Number(tmp[1]); i++) {
    const power = String(i).length
    const s = String(i).split('')
    let num = 0
    for (let j = 0; j < s.length; j++) {
      num += Number(s[j]) ** power
    }
    if (num === i) {
      console.log(num)
    }
  }
}

module.exports = narcissisticNumber
