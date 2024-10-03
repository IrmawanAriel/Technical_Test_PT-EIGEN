const test4 = (Matrix) => {

    diagonal1 = 0
    diagonal2 = 0

    for (i=0; i <= Matrix.length-1; i++){
        diagonal1 += Matrix[i][i]
        diagonal2 += Matrix[i][Matrix.length-1-i]
    }

    console.log("Diagonal pertama:", diagonal1); 
    console.log("Diagonal kedua:", diagonal2);  
    console.log("Selisih:", diagonal1-diagonal2);

}
Matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]] //two dimensional array
test4(Matrix)
