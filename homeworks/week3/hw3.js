function isPrime(lines) {
  const n = lines[0]
  for (let j = 1; j <= n; j++) {
    let a = lines[j]
    if (Number(a) === 1) {
      console.log('Composite')
    } else {
      for (let i = 2; i < a; i++) {
        if (a % i === 0) {
          a = 0
          console.log('Composite')
          break
        }
      }
      if (a !== 0) {
        console.log('Prime')
      }
    }
  }
}

module.exports = isPrime
