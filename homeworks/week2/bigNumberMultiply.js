function multiply(a, b) {
    function simpleMultiply(x,y,z){
        return Number(x)*Number(y)+z
    }
    function removeNegative(x){
        if(x[0]==="-"){
            x = x.slice(1)
        }
        return x
    }
    
    var negative =  ((a[0] === "-") ^(b[0] ==="-"))
    var carry = 0
    var tmp = []
    var ans = ""
    var out = 0
    a = removeNegative(a)
    b = removeNegative(b)

    for (j=0;j<a.length;j++){
        carry = 0
        tmp[j] = Array(b.length+a.length+2).fill(0)
        for (k=0;k<b.length;k++){
            out = simpleMultiply(a[a.length-1-j],b[b.length-1-k],carry)
            tmp[j][k+j] = out%10
            carry = Math.floor(out/10)
        }
        tmp[j][k+j] = carry%10
        tmp[j][k+j+1] = Math.floor(carry/10)
    }

    carry = 0
    for (j=0;j<b.length+a.length+2;j++){
        out = 0
        for(i=0;i<a.length;i++){
            out += tmp[i][j]
        }  
        out+=carry
        ans = String(out%10) + ans
        carry=Math.floor(out/10)
    }

    while((ans[0]==="0") && (ans.length>1)){
        ans = ans.slice(1)
    }
    if (negative){
        ans = "-" + ans
    }
    return ans
}

// console.log(multiply("15477059921234121826428557151741001505503078190287823812775974784617890980\
// 41664961276263706619800328087900049616495708101329933970937581714628336484\
// 30573931982820077357934138465500725654122355115431528560108824273624205622\
// 43845728335428665892452211230138950874256724845100897209088600677816836907\
// 8193075209592426056314957124024831139178307483030144703850736257969","15477059921234121826428557151741001505503078190287823812775974784617890980\
// 41664961276263706619800328087900049616495708101329933970937581714628336484\
// 30573931982820077357934138465500725654122355115431528560108824273624205622\
// 43845728335428665892452211230138950874256724845100897209088600677816836907\
// 8193075209592426056314957124024831139178307483030144703850736257969"))

console.log(multiply("99","99"))