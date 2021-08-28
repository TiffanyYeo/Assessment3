// the code you are to write to control the game

const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');
let ichecked = 'true';
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const rowNum = 10, colNum = 10;

class field 
{
        constructor() {
            this._field = Array(rowNum).fill().map(() => Array(colNum));
            this._locationX = 0;
            this._locationY = 0;
        } //end of constructor

    generateField(percentage) {
        for (let y = 0; y < rowNum; y++) {
            for (let x = 0; x < colNum; x++) {
                const prob = Math.random();
                this._field[y][x] = prob > percentage ? fieldCharacter : hole;
            }//end of for-loop 2
        } //end of for-loop 1

        //Set the "hat" location : Object
        const hatLocation = {
            x: Math.floor(Math.random() * colNum),
            y: Math.floor(Math.random() * rowNum)
        };

        //Make sure the "hat" is not at the starting point
        while (hatLocation.x == 0 && hatLocation.y == 0) {
            hatLocation.x = Math.floor(Math.random() * colNum);
            hatLocation.y = Math.floor(Math.random() * rowNum);
        } //end of while-loop

        this._field[hatLocation.y][hatLocation.x] = hat;

        //Set the "home" position before the game starts
        this._field[0][0] = pathCharacter;

    }//end of generateField

    runGame() {
        let playing = true;
     //   console.log("Start Game");
        clear();
        //print the field
        this.print();
        this.askQuestion();
    } 

    print() {
        const displayString = this._field.map(row => {
            return row.join('');
        }).join('\n'); //end of arrow function row
        console.log("Start Game");
        console.log(displayString);
        
    } // end of print
 
    hitBoundary(x,y) {
        if(x > 9 || x < 0 || y > 9 || y < 0 ) {
            console.log(`Hit Boundary: Game Over!!`);
            return ichecked = 'false';
        }
    }

    hitHole(x,y) {
        if (this._field[y][x] == hole) {
            console.log(`You have dropped into a HOLE. Game Over!!`);
            return ichecked = 'false';
        } 
    }

    foundHat(x,y) {
        if (this._field[y][x] == hat) {
            console.log(`You have FOUND My Hat!! Well Done!`);
            return ichecked = 'false';
            
        }
    }

    moveStep(x,y) {
        if (this._field[y][x] == fieldCharacter || this._field[y][x] == pathCharacter) {
            this._field[y][x] = pathCharacter;
            clear();
            this.print();
            return ichecked = 'true';
        }          
    }

    askQuestion() {
        ichecked = 'true';
        let x = 0; 
        let y = 0;
        while (ichecked == 'true') {
            const direction = prompt ('Which way?[I-up,K-dowm,J-left,L-right]').toUpperCase();
            switch (direction) {
            case 'I': //up
                y -= 1;
                this.hitBoundary(x,y);
                if (ichecked == 'true'){
                this.hitHole(x,y);
                this.foundHat(x,y);
                this.moveStep(x,y);
                }
                break;    

            case 'K': //down
                y += 1;
                this.hitBoundary(x,y);
                if (ichecked == 'true'){
                this.hitHole(x,y);
                this.foundHat(x,y);
                this.moveStep(x,y); 
                }
                break;

            case 'J': //left
                x -= 1;
                this.hitBoundary(x,y);
                this.hitHole(x,y);
                this.foundHat(x,y);
                this.moveStep(x,y);
                break;

            case 'L': //right
                x += 1;
                this.hitBoundary(x,y);
                this.hitHole(x,y);
                this.foundHat(x,y);
                this.moveStep(x,y);
                break;

            default:
                clear();
                this.print();

            }
        }
                
    }
} // end of class field

//Create an instance of Field Class Object
const myfield = new field();
myfield.generateField(0.3);
myfield.runGame();






