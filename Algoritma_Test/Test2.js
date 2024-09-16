var Test2 = function(s) {

    const splited = s.split(" ")
    var result = ""

    for (i = 0 ; i <=splited.length-1 ; i++){
        if(splited[i].length >= result.length){
            result = splited[i]
        }
    }
    return `${result}: ${result.length} Character`
};

console.log(Test2("Saya sangat senang mengerjakan soal algoritma"))