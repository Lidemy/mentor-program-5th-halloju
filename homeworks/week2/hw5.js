function join(arr, concatStr) {
  var out=""
  for (i=0;i<arr.length;i++){
      out = out+arr[i]+concatStr
  }
  return out.slice(0,-1)
}

function repeat(str, times) {
    var out=""
    for (i=1;i<=times;i++){
        out = out + str
    }
    return out
}

console.log(join(['a','b','c'], '!'));
console.log(repeat('a', 5));
