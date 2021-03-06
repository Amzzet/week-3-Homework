const rElement = document.getElementById("r");
const gElement = document.getElementById("g");
const bElement = document.getElementById("b");
const colorDisplayElement = document.getElementById("color-display");

const levels = Array.from(document.getElementsByClassName("mode"));
let selectedLevelButton = levels.find((level) => {
    const classList = Array.from(level.classList);
    return classList.includes("selected");
});

let gameLevel = selectedLevelButton.innerHTML;
let squares = getSquares()


levels.forEach((level) => {
    level.addEventListener("click",function () {
        levels.forEach((mode) => mode.classList.remove("selected"));
        this.classList.add("selected");

        gameLevel = this.innerHTML;
        SetTilesAccordingtogame(gameLevel)
        squares = getSquares()
    });
});
function getSquares(){
    const AllSquares = Array.from(document.getElementsByClassName("square"));
    if (gameLevel === "Easy"){
        return AllSquares.slice(0,3)
    } else{
        return AllSquares
    }

}

function SetTilesAccordingtogame(CurrentGameLevel) {
    const AllSquares = Array.from(document.getElementsByClassName("square"));
    if (CurrentGameLevel === "Easy") {
        const FirstThreeSquares = AllSquares.slice(0,3)
        const LastThreeSquares = AllSquares.slice(3,6)  
// Showing only the first three squares 
        LastThreeSquares.forEach(sq => sq.classList.add("hidden"))
        
    }else if (CurrentGameLevel === "Hard") {
        AllSquares.forEach(sq => sq.classList.remove("hidden"))
        //showing allsquares
    }     
}

//Attempt to make all squares  have background colar
 // assign each square a background colar
     // string interpolation inside of concentation
    // to combine the array (list) into a string using jsonstringfy
     // assign the header a random rgb value from one of the square values

const startButton = document.getElementById("reset");

startButton.addEventListener("click",function() {
    this.innerHTML = "New Colors";
    for (let i = 0; i < squares.length; i = i + 1) {

        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256); 
       
        const rgbString = "rgb(" + red + "," + green +"," + blue + " )";

        const square = squares[i];
        
        square.dataset.rgb_value = JSON.stringify([red,green,blue]);
        square.style.backgroundColor = rgbString;
    }
   
    const randomSquareIndex = Math.floor(Math.random() * squares.length);
    const headerColorSquare = squares[randomSquareIndex];
    setHeaderRgbBackgroundColor(headerColorSquare); 
});

function  setHeaderRgbBackgroundColor(squareElement) {
    const setHeaderElementBackgroundColor = (rgbValues, element) =>{
        const [r,g,b] = rgbValues;
        const rgbString = `rgb(${r}, ${g}, ${b})`;
        element.style.backgroundColor = rgbString;
        element.innerHTML = rgbValues.find((rgbValue) => {
            return rgbValue > 0;
        });      
    };
    const rgbString = squareElement.dataset.rgb_value;
    colorDisplayElement.dataset.rgb_value = rgbString;
    const [red, green, blue] = JSON.parse(rgbString);
    
    const redBackground = [red, 0, 0];
    const greenBackground = [0, green, 0];
    const blueBackground = [0, 0, blue];
    
    setHeaderElementBackgroundColor(redBackground, rElement);
    setHeaderElementBackgroundColor(greenBackground, gElement);
    setHeaderElementBackgroundColor(blueBackground, bElement);
}
//adding event listener  to each square so that it either disappers or changes
squares.forEach((square) => {
    square.addEventListener("click", function() {
        const headerRgbValue = colorDisplayElement.dataset.rgb_value;
        const squareRgbValue = this.dataset.rgb_value;

        if (headerRgbValue === squareRgbValue) {
            setSquareBackgroundAfterWin(headerRgbValue)

        }else{
            this.classList.add("hidden");
        }

    });
});

function setSquareBackgroundAfterWin(headerRgbString) {
    const [r,g,b] = JSON.parse(headerRgbString);
    const rgbString = `rgb(${r}, ${g}, ${b} )`;

    squares.forEach((sq) => {
        sq.classList.remove("hidden");
        sq.style.backgroundColor = rgbString;

    });
}
