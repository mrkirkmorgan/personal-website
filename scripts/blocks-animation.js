// A JavaScript animation to create and update block animations on the webpage

let blocks = [];
let blockCounter = 0;
const blockInterval = 5000;

// Wait until the DOM is loaded before creating Block objects
document.addEventListener('DOMContentLoaded', initialize, false);

function initialize() {
    setInterval("blocksRun()", blockInterval);
    var i;
    for (i = 0; i < 50; i++) {
        blocks.push(new Block(i, true));
        blockCounter++;
    }
}

// Performs occasional checks on blocks in play and deletes the stale ones/introduces new ones
function blocksRun() {

    // Figure's out which blocks have finished their lifecycle and delete them
    blocks.forEach((block) => {
        if (block.checkBlock(block.id)) {
            block.deleteBlock();
            var indexOf = blocks.indexOf(block);
            blocks.splice(indexOf, 1);
        }
    });

    // creates a random number of blocks each run
    let numNewBlocks = generateNumber(1, 3);
    for (let i = 0; i < numNewBlocks; i++) {
        blocks.push(new Block(blockCounter, false))
        blockCounter++;
    }
}

// A class for a singular block moving across the background
class Block {
    constructor(id, initial) {
        this.width = generateNumber(20, 30); // Block length will be 3x longer than the width
        this.color = generateNumber(1, 6);
        this.speed = generateNumber(250, 20).toString();
        this.orientation = generateNumber(0, 1);
        this.initial = initial;
        this.id = id;
        this.createBlock();
    }

    createBlock() {
        let background = $("#background");
        let newBlock = document.createElement('div');
        newBlock.id = "block" + this.id.toString();
        newBlock.className = "block";

        // Set witdh and height
        newBlock.style.width = this.width.toString() + "px";
        newBlock.style.height = (this.width * 3).toString() + "px";

        // Select the color
        switch (this.color) {
            case 1: newBlock.style.backgroundColor = "rgba(245, 246, 250, 0.4)";
            break;
            case 2: newBlock.style.backgroundColor = "rgba(149, 175, 192, 0.2)";
            break;
            case 3: newBlock.style.backgroundColor = "rgba(72, 126, 176, 0.2)";
            break;
            case 4: newBlock.style.backgroundColor = "rgba(0, 151, 230, 0.2)";
            break;
            case 5: newBlock.style.backgroundColor = "rgba(0, 168, 255, 0.2)";
            break;
            case 6: newBlock.style.backgroundColor = "rgba(39, 60, 117, 0.2)";
            break;
            case 7: newBlock.style.backgroundColor = "rgba(25, 42, 86, 0.2)";
            break;
            case 8: newBlock.style.backgroundColor = "rgba(64, 115, 158, 0.2)";
            break;
        }

        // Select the direction and orientation
        switch (this.orientation) {
            case 0: newBlock.style.left = generateNumber(2, 98).toString() + "%";
                    newBlock.style.animation = "fall " + this.speed + "s";

                    if (this.initial == true) {
                        newBlock.style.top = generateNumber(0, 96).toString() + "%";
                    } else {
                        newBlock.style.top = (-this.width * 3).toString() + "px";
                    }
            break;
            case 1: newBlock.style.left = generateNumber(2, 98).toString() + "%";
                    newBlock.style.animation = "rise " + this.speed + "s";

                    if (this.initial == true) {
                        newBlock.style.top = generateNumber(0, 96).toString() + "%";
                    } else {
                        newBlock.style.bottom = (-this.width * 3).toString() + "px";
                    }
            break;
        }
        
        background.append(newBlock);
    }

    // Checks to see if a block animation has completed based on it's location
    checkBlock() {
        let thisBlock = $("#block" + this.id.toString());
        let body = $("body");
        let position = thisBlock.position();
        let blockX = position.left;
        let blockY = position.top;

        // Checking if the animation is complete depends on orientation
        switch (this.orientation) {
            case 0: return blockY > body.height();
            case 1: return blockY < -this.width * 3;
        }
    }

    // Deletes a block off of the DOM so it can be re-generated
    deleteBlock() {
        $("#block" + this.id.toString()).remove();
    }
}

// Generates a random number between min & min + range
function generateNumber(min, range) {
    return Math.round(Math.random() * range) + min;
}