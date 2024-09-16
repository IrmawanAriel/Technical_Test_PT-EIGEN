var Test1 = function (s) {
    var temp = s.split("");
    var reversedArray = []
    for (i = temp.length - 1; i >= 0; i--) {
        reversedArray.push(s[i])
    }
    return reversedArray.join("")
};

console.log(Test1("NEGIE1"))