var Test1 = function (s) {

    var temp = s.split("");
    var reversedArray = [];
    var numberArray = []

    for (i = temp.length - 1; i >= 0; i--) {
        if( /\d/.test(temp[i])){
            numberArray.push(temp[i])
        } else {
            reversedArray.push(s[i])
        }
    }

    reversedArray.push(numberArray.join(""))
    return reversedArray.join("")
};

console.log(Test1("NEGIE1"))