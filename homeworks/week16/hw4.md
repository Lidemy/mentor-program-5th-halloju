1. obj.inner.hello() === obj.inner.hello.call(obj.inner)
   // console.log(obj.inner.value) = 2
2. obj2.hello() === obj2.hello.call(obj2)
   // console.log(obj2.value) = 2
3. hello() === hello.call(hello)
   // under 'use strict' 'this' is undefined, and there's no undefined.value