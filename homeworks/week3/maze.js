/* eslint quote-props: 0 */// --> OFF
/* eslint no-unmodified-loop-condition: 0 */// --> OFF
function breadthFirstSearch(inpt) {
  const temp = inpt[0].split(' ')
  const h = Number(temp[0])
  const w = Number(temp[1])
  const maze = inpt.slice(1)
  let root = {
    'dot': [[0, 0]],
    'step': [0]
  }
  const queue = {
    'dot': [[0, 0]],
    'step': [0]
  }
  let tmp = {}
  const steps = {
    'x': [1, -1, 0, 0],
    'y': [0, 0, 1, -1]
  }
  while (queue) {
    for (let j = 0; j < root.step.length; j++) {
      const ix = root.dot[j][0]
      const iy = root.dot[j][1]
      const stp = root.step[j]
      for (let i = 0; i < 4; i++) {
        const x = ix + steps.x[i]
        const y = iy + steps.y[i]
        if (x === h - 1 && y === w - 1) {
          return stp + 1
        }
        if (x < h && y < w && x >= 0 && y >= 0) {
          if (searchMatch(x, y, queue.dot) && maze[x][y] !== '#') {
            tmp.dot.push([x, y])
            tmp.step.push(stp + 1)
            queue.dot.push([x, y])
            queue.step.push(stp + 1)
          }
        }
      }
    }
    root = {
      'dot': [...tmp.dot],
      'step': [...tmp.step]
    }
    tmp = {
      'dot': [],
      'step': []
    }
  }
}

function searchMatch(x, y, queue) {
  for (let i = 0; i < queue.length; i++) {
    if (queue[i][0] === x && queue[i][1] === y) {
      return false
    }
  }
  return true
}

module.exports = breadthFirstSearch
