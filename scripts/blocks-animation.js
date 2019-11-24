// A JavaScript animation to create and update block animations on the webpage

let blocks = [];
const totalBlocks = 4; // Only 6 blocks can exist on the screen at one time
const blockInterval = 3000;

// Wait until the DOM is loaded before creating Block objects
document.addEventListener('DOMContentLoaded', initialize, false);

function initialize() {
    setInterval("blocksRun()", blockInterval);
    var i;
    for (i = 0; i < totalBlocks; i++) {
        blocks.push(new Block(i));
    }
}

// Performs occasional checks on blocks in play and deletes the stale ones/introduces new ones
function blocksRun() {
    let deletedBlocks = [];

    // Figure's out which blocks have finished their lifecycle and adds them to a list
    blocks.forEach((block) => {
        if (block.checkBlock(block.id)) {
            block.deleteBlock();
            var indexOf = blocks.indexOf(block);
            var deletedBlock = blocks.splice(indexOf, 1);
            deletedBlocks.push(deletedBlock[0].id);
        }
    });

    // Takes the specific deleted blocks and re-generates them
    deletedBlocks.forEach((blockId) => {
            blocks.push(new Block(blockId));
    });
}

class Block {
    constructor(id) {
        this.width = generateNumber(50, 80); // Block length will be 3x longer than the width
        this.color = generateNumber(1, 6);
        this.speed = generateNumber(250, 20).toString();
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
        switch (this.id) {
            case 0: newBlock.style.left = generateNumber(2, 65).toString() + "%";
                    newBlock.style.top = (-this.width * 3).toString() + "px";
                    newBlock.style.animation = "fall " + this.speed + "s";
            break;
            case 1: newBlock.style.left = (-this.width * 1.5).toString() + "px";
                    newBlock.style.top = generateNumber(2, 16).toString() + "%";
                    newBlock.style.animation = "moveRight " + this.speed + "s";
            break;
            case 2: newBlock.style.left = generateNumber(70, 20).toString() + "%";
                    newBlock.style.top = "-2%";
                    newBlock.style.animation = "fallLeft " + this.speed + "s";
            break;
            case 3: newBlock.style.left = generateNumber(90, 10).toString() + "%";
                    newBlock.style.top = "30%";
                    newBlock.style.animation = "riseLeft " + this.speed + "s";
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
        switch (this.id) {
            case 0: return blockY > body.height();
            case 1: return blockX > body.width();
            case 2: return blockX < 0;
            case 3: return blockX < 0;
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