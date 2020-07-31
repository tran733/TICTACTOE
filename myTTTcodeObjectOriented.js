
var gameOver = false, gameStarted = false, time = 60, timer, symbolWin = [];
const winLength = 5, SideSize = 10, arrayOfSymbols = [], players = ["O", "X"];
var currRow = 0, currCol = 0, currPlayer = 0, id = 0;
const td = demo.getElementsByTagName("td");
const tr = demo.getElementsByTagName("tr");
var color1 = "blue", color2 = "red";
document.body.onload = () => {
    document.getElementById("blueScore").innerHTML = sessionStorage.blueScore == undefined ? 0 : sessionStorage.blueScore;
    document.getElementById("redScore").innerHTML = sessionStorage.redScore == undefined ? 0 : sessionStorage.redScore;
}
setColor.onclick = () => {
    color1 = document.getElementById("color").value;
    for (var i = 0; i < td.length; i++) {
        if (td[i].innerHTML == "O") {
            td[i].style.backgroundColor = color1;
        }
    }
}
setColor2.onclick = () => {
    color2 = document.getElementById("color2").value;
    for (var i = 0; i < td.length; i++) {
        if (td[i].innerHTML == "X") {
            td[i].style.backgroundColor = color2;
        }
    }
}
const resetGameScore = () => {
    sessionStorage.redScore = 0;
    sessionStorage.blueScore = 0;
    document.getElementById("blueScore").innerHTML = sessionStorage.blueScore;
    document.getElementById("redScore").innerHTML = sessionStorage.redScore;
}
const playAgain= () => {
    window.location.reload()
}
resetScore.onclick = function () { resetGameScore() };
resetBTN.onclick = function () { playAgain() };
pauseGame.onclick = () => {
    if (pauseGame.value == "Pause") {
        clearInterval(timer);
        pauseGame.value = "Continue"
    }
    else if (pauseGame.value == "Continue") {
        timer = setInterval(stopwatch, 1000);
        pauseGame.value = "Pause";
    }
}
function move(element,event) {
    var x = element.getAttribute("x");
    var y = element.getAttribute("y");
    document.body.style.overflow = "auto";
    if (!gameOver) {
        for (var i = 0; i < td.length; i++) {
            if (window.getComputedStyle(td[i], null).getPropertyValue("background-color") == "rgb(173, 216, 230)"
                && td[i].id != element.id)
            {
                td[i].style.backgroundColor = "white";
                break;
            }
        }
        element.style.backgroundColor = "lightblue";
        id = element.id;
        event.key == "Enter" ? new startCheck().createXorO(1, id) : "";
        currRow = Number(x);
        currCol = Number(y);
    }
}
function hoverOut(element) {
    element.style.backgroundColor = ((element.innerHTML == " ") ? "white" :
        (element.innerHTML == "O") ? color1 :
            (element.innerHTML == "X") ? color2 :
                "");
}
document.body.onkeydown = (event) => {
    if (!gameOver) {
        document.body.style.overflow = "hidden";
        if (event.key.includes("Arrow")) {
            for (var i = 0; i < td.length; i++) {
                td[i].style.backgroundColor = td[i].innerHTML == " " ? "white" :
                    td[i].innerHTML == "O" ? color1 :
                        td[i].innerHTML == "X" ? color2 : "";


            }
            event.key == "ArrowDown" ? currRow < SideSize - 1 ? currRow += 1 : currRow = 0 : // Check if the arrow down key is Pressed
                event.key == "ArrowUp" ? currRow > 0 ? currRow -= 1 : currRow = SideSize - 1 : // Check if the arrow up key is Pressed
                    event.key == "ArrowRight" ? currCol < SideSize - 1 ? currCol += 1 : currCol = 0 : // Check if the arrow right key is Pressed
                        event.key == "ArrowLeft" ? currCol > 0 ? currCol -= 1 : currCol = SideSize - 1 : "" //Check if the arrow left key if Pressed

            tr[currRow].getElementsByTagName('td')[currCol].style.backgroundColor = "lightblue";
            id = tr[currRow].getElementsByTagName('td')[currCol].id;
        }
        else {
            event.key == "Enter" ? new startCheck().createXorO(1, id) : "";
            event.ctrlKey && event.key == "m" ? modify.style.width = "250px" : "";


        }
    }
    else {
        tr[currRow].getElementsByTagName('td')[currCol].style.backgroundColor = "white";
    }
    event.ctrlKey && event.key == "x" ? modify.style.width = "0px" : "";
    event.key == "p" ? playAgain() :
        event.key == "r" ? resetGameScore() :
            "";

}

(function () {
    var j, k, l;
    l = 0;
    var tr = "";
    for (j = 0; j < SideSize; j++) {
        tr += "<tr>"
        for (k = 0; k < SideSize; k++) {
            tr += "<td id = '" + l + "' x = '"+ j + "' y = '"+ k + "'onmousemove = 'move(this,event);' onmouseout = 'hoverOut(this)' onclick = 'new startCheck().createXorO(this,1);' > </td>"
            l++;
        }
        arrayOfSymbols.push([]);

        tr += "</tr>";
    }
    demo.innerHTML += tr;
    demo.style.width = (SideSize * 60) + "px";
    demo.style.height = (SideSize * 30) + "px";

})();
function stopwatch() {
    if (time != 0) {
        time -= 1;
    }
    else if (time == 0) {
        gameOver = true;
        winner.innerHTML = "The winner is " + players[(currPlayer + 1 > 1) ? 0 : 1];
        players[(currPlayer + 1 > 1) ? 0 : 1] == "O" ? sessionStorage.blueScore = Number(sessionStorage.blueScore) + 1 :
            sessionStorage.redScore = Number(sessionStorage.redScore) + 1;
        document.getElementById("blueScore").innerHTML = sessionStorage.blueScore;
        document.getElementById("redScore").innerHTML = sessionStorage.redScore;
        clearInterval(timer);
    }
    document.getElementById("timer").innerHTML = time;
}
class startCheck {
    createXorO(objOnc, objOnkey) {
        var td = objOnkey == 1 ? document.getElementById(objOnc.id) :
            objOnc == 1 ? document.getElementById(objOnkey) : "";
       
        if (!gameStarted) {
            timer = setInterval(stopwatch, 1000);
            pauseGame.disabled = false;
            gameStarted = true;
        }
        if (pauseGame.value == "Continue") {
            pauseGame.value = "Pause";
            timer = setInterval(stopwatch, 1000);
        }
        if (td.innerHTML == " " && gameOver != true) {
            td.innerHTML = players[currPlayer];
            td.style.backgroundColor = currPlayer == 0 ? color1 : color2;
            currPlayer = (currPlayer == 0) ? 1 : 0;
            playerTurn.innerHTML = "It is " + ((currPlayer == 0) ? "O" : "X") + " turn";
            playerTurn.style.color = currPlayer == 0 ? color1 : color2;
            var squares = demo.getElementsByTagName("td");
            var index = parseInt(td.id);
            var x = parseInt(index / SideSize);
            var y = index % SideSize;
            arrayOfSymbols[x][y] = squares[index].innerHTML;

            new winnerClass().isWinner();
        }
        time = 60;

  }
}
/*

0: 0: X				 X
1: 0: O	 X		 O			X
2: O		 O		 X
3: X	 O	 O	 O	 O	 X
4: O		 O
5: X	 O		 X	 O
6: X				 X

 */




class generate extends startCheck {

    generateCompStr(symbol) {
        var string = "";
        for (var i = 0; i < winLength; i++) {
            string += symbol;
        }
        return string;
    }
    pushValues(col, row, i) {
        col == 0 ? symbolWin.push({ name: arrayOfSymbols[i + row][i], x: i + row, y: i }) :
            col == 1 ? symbolWin.push({ name: arrayOfSymbols[i][(SideSize - 1 - row) - i], x: i, y: SideSize - 1 - row - i }) :
                col == 2 ? symbolWin.push({ name: arrayOfSymbols[i][i + row], x: i, y: i + row }) :
                    col == 3 ? symbolWin.push({ name: arrayOfSymbols[i + row][(SideSize - 1) - i], x: i + row, y: (SideSize - 1) - i }) : "";

    }
}
var generateCollection = new generate();
const collectionO = generateCollection.generateCompStr("O");
const collectionX = generateCollection.generateCompStr("X");
class winnerClass {
    decideWinner(collectionValues) {
        var winnerName = " ";
        var index = -1;
        var i = -1;
        var tr = demo.getElementsByTagName("tr");
        (index = collectionValues.indexOf(collectionO)) > -1 ? (winnerName = "O",
            sessionStorage.blueScore = Number(sessionStorage.blueScore) + 1)
            :
            (index = collectionValues.indexOf(collectionX)) > -1 ? (winnerName = "X",
                sessionStorage.redScore = Number(sessionStorage.redScore) + 1) : index = -1;
   
    
        gameOver = (winnerName != " ") ? true : false;
        if (gameOver) {
            winner.innerHTML = "The winner is " + winnerName;
            winner.style.fontWeight = "bold";
            winner.style.color = winnerName == "O" ? color1 : color2; 
            i = (parseInt(index/9) + index % 9);
        
            for (; (i > -1) && (i < symbolWin.length); i++) {
                if (symbolWin[i].name == winnerName) {
                    tr[symbolWin[i].x].getElementsByTagName("td")[symbolWin[i].y].className = "win";
                } else
                    break;
            }

            document.getElementById("blueScore").innerHTML = sessionStorage.blueScore;
            document.getElementById("redScore").innerHTML = sessionStorage.redScore;
            clearInterval(timer);
        }

        symbolWin = [];
        return gameOver;
}

    getValuesByRules(type, row, col) {
        var collection = "";
        if (type == "rows") {

            for (col = 0; col < SideSize; col++) {
                collection += arrayOfSymbols[row][col];
                symbolWin.push({ name: arrayOfSymbols[row][col], x: row, y: col });
            }
        }
        else if (type == "cols") {

            for (row = 0; row < SideSize; row++) {
                collection += arrayOfSymbols[row][col];
                symbolWin.push({ name: arrayOfSymbols[row][col], x: row, y: col });
            }
        }
        else if (type == "diagonal") {
        
            for (var i = 0; i < (SideSize - row); i++) {
                collection +=
                   (col == 0) ? arrayOfSymbols[i + row][i] :        
                   (col == 1) ? arrayOfSymbols[i][(SideSize - 1 - row) - i] : 
                   (col == 2) ? arrayOfSymbols[i][i + row] :
                   (col == 3) ? arrayOfSymbols[i + row][(SideSize - 1) - i] : " ";
                    generateCollection.pushValues(col, row, i);
            }
        
        }
        return collection;
}  
/*
     [0:] 0: O , [0:] 1:   , [0:] 2: O , [0:] 3: ,[0:] 4: O , [0:] 5:   , [0:] 6: O 
     [1:] 0: X , [1:] 1: O , [1:] 2: X , [1:] 3: ,[0:] 4: O , [0:] 5:   , [0:] 6: O
     [2:] 0:   , [2:] 1: X , [2:] 2: O , [2:] 3: ,[0:] 4: O , [0:] 5:   , [0:] 6: O
     [3:] 0: O , [3:] 1:   , [3:] 2: X , [3:] 3: ,[0:] 4: O , [0:] 5:   , [0:] 6: O
     [4:] 0: X , [4:] 1: O , [4:] 2: X , [4:] 3: X,[0:] 4: O , [0:] 5:   , [0:] 6: O
     [5:] 0:   , [5:] 1: X , [5:] 2: O , [5:] 3: ,[0:] 4: X , [0:] 5:   , [0:] 6: O
     [6:] 0:   , [6:] 1: X , [6:] 2: O , [6:] 3: ,[6:] 4: O , [6:] 5:   , [6:] 6: O
     
 */
    isWinner() {
        var i = 0, k;
        var Winner = new winnerClass();
    /*gameOverCheck Start*/
        if (!gameOver) {
        
            for (i = 0; i < SideSize; i++) {
                for (k = 0; k < SideSize; k++) {                

                    if (Winner.decideWinner(Winner.getValuesByRules("rows", k, 0))  /* get values by rows.*/
                        || Winner.decideWinner(Winner.getValuesByRules("cols", 0, k))/* get values by columns*/
                        || Winner.decideWinner(Winner.getValuesByRules("diagonal", k, 0))/* get values by lower backslash*/
                        || Winner.decideWinner(Winner.getValuesByRules("diagonal", k, 2))/* get values by upper backslash */
                        || Winner.decideWinner(Winner.getValuesByRules("diagonal", k, 1))/* get values by upper slash*/
                        || Winner.decideWinner(Winner.getValuesByRules("diagonal", k, 3))/* get values by lower slash*/
                    ) {
                        return;
                       }
                } 
            }
          
            /*gameOverCheck End*/       
        }
   
    /*
     [0:] 0: O , [0:] 1: O , [0:] 2: 
     [1:] 0: X , [1:] 1: X , [1:] 2: X 
     [2:] 0:   , [2:] 1: O , [2:] 2: O
     */
}
}
