function reverse(str) {
    var rv=""
    for (i = str.length - 1; i >= 0; i--) {
        rv = rv+str[i]
    }
    console.log(rv)
}

reverse('hello');
