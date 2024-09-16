const Test3 = (input, query) => {

    var result = []
    var counter = 0

    for(i=0; i<=query.length-1; i++){
        counter =0
        for(j=0; j<=input.length-1; j++){
            if(query[i] === input[j]){
                counter++
            } 
        }
        result.push(counter)
    }

    return result
}
INPUT = ['xc', 'dz', 'bbb', 'dz']  
QUERY = ['bbb', 'ac', 'dz'] 

console.log(Test3(INPUT, QUERY))