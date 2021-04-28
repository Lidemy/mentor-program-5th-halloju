// var readline = require('readline');
// var rl = readline.createInterface({
//   input: process.stdin
// });

// var lines = []

// // 讀取到一行，先把這一行加進去 lines 陣列，最後再一起處理
// rl.on('line', function (line) {
//   lines.push(line)
// });

// // 輸入結束，開始針對 lines 做處理
// rl.on('close', function() {
//   compareNumber(lines)
// })

function compareNumber(lines) {
  const n = lines[0]
  for (let i = 1; i <= n; i++) {
    let order = 0
    const tmp = lines[i].split(' ')
    const a = String(tmp[0]).split('')
    const b = String(tmp[1]).split('')
    if (a.length < b.length) {
      order = ['A', 'B']
    } else if (a.length > b.length) {
      order = ['B', 'A']
    } else {
      for (let j = 0; j < a.length; j++) {
        if (Number(a[j]) < Number(b[j])) {
          order = ['A', 'B']
          break
        } else if (Number(a[j]) > Number(b[j])) {
          order = ['B', 'A']
          break
        }
      }
    }
    if (order === 0) {
      console.log('DRAW')
    } else if (Number(tmp[2]) === 1) {
      console.log(order[1])
    } else {
      console.log(order[0])
    }
  }
}

module.exports = compareNumber
