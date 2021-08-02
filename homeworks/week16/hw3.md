// 初始
globalEC: {
  VO: {
    a: undefined
    fn: function
  }
  scopeChain: [globalEC.VO]
}
fn.[[Scope]] = [globalEC.VO]

// 執行
fnEC: {
  AO: {
    a: undefine
    fn2: function
  }
  scopeChain: [fnEC.AO, globalEC.VO]
}

fn2.[[Scope]] = [fnEC.AO, globalEC.VO]

globalEC: {
  VO: {
    a: 1
    fn: function
  }
  scopeChain: [globalEC.VO]
}

// 執行 fn()
console.log(a) // undefine
console.log(a) // 5

fnEC: {
  AO: {
    a: undefine -> 5 -> 6
    fn2: function
  }
  scopeChain: [fnEC.AO, globalEC.VO]
}

fn2.[[Scope]] = [fnEC.AO, globalEC.VO]

globalEC: {
  VO: {
    a: 1
    fn: function
  }
  scopeChain: [globalEC.VO]
}

// 執行 fn2()
console.log(a) // 6

fn2EC: {
  AO: {
    
  }
  scopeChain: [fn2EC.AO, fnEC.AO, globalEC.VO]
}

fnEC: {
  AO: {
    a: 6 -> 20
    fn2: function
  }
  scopeChain: [fnEC.AO, globalEC.VO]
}

globalEC: {
  VO: {
    a: 1
    fn: function
    b: undefine -> 100
  }
  scopeChain: [globalEC.VO]
}

// 執行 fn()
console.log(a) // 20

fnEC: {
  AO: {
    a: 20
    fn2: function
  }
  scopeChain: [fnEC.AO, globalEC.VO]
}

globalEC: {
  VO: {
    a: 1
    fn: function
    b: 100
  }
  scopeChain: [globalEC.VO]
}

// 執行完 fn()
console.log(a) // 1
console.log(a) // 10
console.log(b) // 100

globalEC: {
  VO: {
    a: 1 -> 10
    fn: function
    b: 100
  }
  scopeChain: [globalEC.VO]
}