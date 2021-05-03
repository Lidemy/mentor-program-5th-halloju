function steal(inpt) {
  let temp = inpt[0].split(' ')
  const n = Number(temp[0])
  const w = Number(temp[1])
  temp = inpt.slice(1)
  const weight = []
  const value = []
  let dp = {}
  const tmp = {}
  for (let i = 0; i < n; i++) {
    const a = temp[i].split(' ')
    if (Number(a[0]) > w) {
      continue
    }
    weight.push(Number(a[0]))
    value.push(Number(a[1]))
  }

  for (let j = 0; j <= w; j++) {
    dp[j] = 0
    tmp[j] = 0
  }

  for (let i = 0; i < weight.length; i++) {
    for (let s = weight[i]; s <= w; s++) {
      tmp[s] = Math.max((dp[s - weight[i]] + value[i]), dp[s])
    }
    dp = { ...tmp }
  }
  return dp[w]
}

module.exports = steal
