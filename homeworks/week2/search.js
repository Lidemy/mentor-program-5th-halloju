function search(arr, n) {
    var loc = 0
    while(arr.length>1){
        if (n>arr[Math.floor(arr.length/2)]){
            loc+=Math.floor(arr.length/2)
            arr = arr.slice(Math.floor(arr.length/2))
        } else if(n<arr[Math.floor(arr.length/2)]){
            arr = arr.slice(0,Math.floor(arr.length/2))
        } else{
            return loc+Math.floor(arr.length/2)
        } 
    }
    if (n===arr[0]){
        return loc
    }else{
        return -1
    }
  }

console.log(search([1, 3, 10, 14, 39], 299))