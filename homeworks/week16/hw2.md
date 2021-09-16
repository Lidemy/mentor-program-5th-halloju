// 初始化
globalEC: {
  VO:{
    i: undefined
  }
}

// 執行
1. 
globalEC: {
  VO:{
    i: 0
  }
}

call stack: [main(), console.log('i: ' + i)] // i: 0 
---
2. 
globalEC: {
  VO:{
    i: 0
  }
}

call stack: [main(), setTimeout cb]
(event loop: task queue is empty) 
task queue: []
---
3. 
globalEC: {
  VO:{
    i: 0
  }
}

call stack: [main()]
webapi: [setTimeout cb]
(event loop: task queue is empty) 
task queue: []
---
1. 
globalEC: {
  VO:{
    i: 1
  }
}

call stack: [main(), console.log('i: ' + i)] // i: 1
webapi: [setTimeout cb]
(event loop: task queue is empty) 
task queue: []
---
2. 
globalEC: {
  VO:{
    i: 1
  }
}

call stack: [main(), setTimeout cb]
webapi: [setTimeout cb]
(event loop: task queue is empty) 
task queue: []
---
3. 
globalEC: {
  VO:{
    i: 1
  }
}

call stack: [main()]
webapi: [setTimeout cb, setTimeout cb]
(event loop: task queue is empty) 
task queue: []
---

依此類推 i = 2, 3, 4
---
1. 
globalEC: {
  VO:{
    i: 5
  }
}

call stack: []
webapi: [setTimeout cb, setTimeout cb, setTimeout cb, setTimeout cb]
(event loop: call stack is empty) 
task queue: [cb]
---
2. 
globalEC: {
  VO:{
    i: 5
  }
}

call stack: [cb console.log(i)] // 5
webapi: [setTimeout cb, setTimeout cb, setTimeout cb, setTimeout cb]
(event loop: task queue is empty) 
task queue: []
---
(wait a second)
1. 
globalEC: {
  VO:{
    i: 5
  }
}

call stack: []
webapi: [setTimeout cb, setTimeout cb, setTimeout cb]
(event loop: call stack is empty) 
task queue: [cb]
---
2. 
globalEC: {
  VO:{
    i: 5
  }
}

call stack: [cb console.log(i)] // 5
webapi: [setTimeout cb, setTimeout cb, setTimeout cb]
(event loop: task queue is empty) 
task queue: []
---
依此類推 剩下三個 setTimeout cb