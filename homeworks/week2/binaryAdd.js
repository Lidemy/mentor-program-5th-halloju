function add(a,b) {
   var c = (a & b)<<1
   var ans = (a ^ b)
   while ((ans&c)!=0){
        ans1 = (ans ^ c)
        c1 = (ans & c)<<1
        ans = ans1
        c = c1
   }
   ans = (ans ^ c) ^ ((ans & c)<<1)
   return ans
}

console.log(add(6,10))