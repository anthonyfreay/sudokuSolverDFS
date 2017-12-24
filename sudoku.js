var sol = [[0, 7, 0, 2, 3, 8, 0, 0, 0],
           [0, 0, 0, 7, 4, 0, 8, 0, 9],
           [0, 6, 8, 1, 0, 9, 0, 0, 2],
           [0, 3, 5, 4, 0, 0, 0, 0, 8],
           [6, 0, 7, 8, 0, 2, 5, 0, 1],
           [8, 0, 0, 0, 0, 5, 7, 6, 0],
           [2, 0, 0, 6, 0, 3, 1, 9, 0],
           [7, 0, 9, 0, 2, 1, 0, 0, 0],
           [0, 0, 0, 9, 7, 4, 0, 8, 0]];

 var boardNums = document.getElementById("sudoku").getElementsByTagName("tr");
 
 var printBoard = function (s) {
    for (var a = 0; a<boardNums.length; a++){
        var cell = boardNums[a].getElementsByTagName("td");
        for(var b = 0; b<boardNums.length; b++){
            cell[b].innerHTML = (s[a][b]);
        }
    }
 };
 var printSolution = function (s) {
     for(var c = 0; c<9; c++){
         var cell = boardNums[c].getElementsByTagName("td");
         for(var d = 0; d<9; d++){
             if(s[c][d] == sol[c][d]){
                 cell[d].innerHTML = s[c][d];
             }
             else{
                 cell[d].innerHTML = s[c][d];
                 cell[d].style.color = ("red");
             }
         }
     }
 };
 var solve = function (s) {
 // solve the puzzle s using a recursive depth first search
     if(solved(s)){
         printSolution(s);
     }
     else{
         var emptyRow = null;
         var emptyCol = null;
         var eFound = false;
         for(var e = 0; e<9; e++){
             for(var f = 0; f<9; f++){
                 if((s[e][f]) == 0){
                     emptyRow = e;
                     emptyCol = f;
                     eFound = true;
                     break;
                 }
             }
             if(eFound)
                 break;
         }
         
         var answers = [];
         var answerIndex = 0;
         var possibleAnswer = 1;
         var answerFound = true;
         
         while(possibleAnswer <= 9){
             
             for(var g = 0; g<9; g++){
                if((s[emptyRow][g])==possibleAnswer) {
                    answerFound = false; 
                    break;
                 }                        
             }
             if(answerFound){
                 for(var h = 0; h<9; h++){
                     if(s[h][emptyCol]==possibleAnswer) {
                         answerFound = false;
                         break;
                     }
                 }
             }
             if(answerFound){
                 var square = square3x3(emptyRow, emptyCol);
                 var startRow = 0;
                 var startCol = 0;
                 
                 if(square == 1){
                     startRow = 0;
                     startCol = 0;
                 }
                 if(square == 2){
                     startRow = 0;
                     startCol = 3;
                 }
                 if(square == 3){
                     startRow = 0;
                     startCol = 6;
                 }
                 if(square == 4){
                     startRow = 3;
                     startCol = 0;
                 }
                 if(square == 5){
                     startRow = 3;
                     startCol = 3;
                 }
                 if(square == 6){
                     startRow = 3;
                     startCol = 6;
                 }
                 if(square == 7){
                     startRow = 6;
                     startCol = 0;
                 }
                 if(square == 8){
                     startRow = 6;
                     startCol = 3;
                 }
                 if(square == 9){
                     startRow = 6;
                     startCol = 6;
                 }
                 
                 for(var i = startRow; i<startRow+3; i++){
                     for(var j = startCol; j<startCol+3; j++){
                         if(s[i][j] == possibleAnswer){
                             answerFound = false;
                             break;
                         }
                     }
                 }
             }
             if(answerFound){
                 answers[answerIndex] = possibleAnswer;
                 answerIndex++;
             }
         answerFound = true;
         possibleAnswer++;
         }
         while(answerIndex>0){
             var nextS = [];
             for(var k =0; k<9; k++){
                 nextS[k] = s[k].slice();
             }
             answerIndex--;
             nextS[emptyRow][emptyCol] = answers[answerIndex];
             solve(nextS);
         }
     }
 };
 var solved = function (s) {
 // check to see if the puzzle s is solved . Return true or false .
     var total = 0;
     var trueTotal = 405;
     var trueRow = 45;
     var trueCol = 45;
     var rowTotal = 0;
     var colTotal = 0;
     
     for(var l = 0; l<boardNums.length; l++){
         rowTotal = 0;
         colTotal = 0;
         for(var m = 0; m<boardNums.length; m++){
             rowTotal += s[l][m];
             colTotal += s[l][m];
             total += s[l][m];
         }
         if(rowTotal != trueRow && colTotal != trueCol){
             return false;
         }
     }
     
     if(total != trueTotal){
         return false;
     }
     return true;
 };
var square3x3 = function(emptyRow, emptyCol){
    var thic = 3;
    var rowLoc = parseInt(emptyRow/thic, 10);
    var colLoc = parseInt(emptyCol/thic, 10);
    var answer = parseInt(((rowLoc*thic)+colLoc)+1, 10);
    
    return answer;
 };
 printBoard (sol);
 solve (sol);
 
 