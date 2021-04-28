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
//     isPalindrome(lines)
// })

function isPalindrome(lines) {
  let S = lines[0].split('')
  const n = S.length - 1
  for (let i = 0; i < n / 2; i++) {
    if (S[i] !== S[n - i]) {
      console.log('False')
      S = 0
      break
    }
  }
  if (S !== 0) {
    console.log('True')
  }
}

module.exports = isPalindrome
