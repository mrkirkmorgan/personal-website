// A JavaScript animation to create and update wave animations on a webpage

// All canvanses/waves on this page
let canvases = [];
let waves = [];
const buffer = 10; // A constant buffer determining when waves should be created/deleted
const waveInterval = 100; // A interval determining how often the waves should be updated

// Wait until the DOM is loaded before creating Wave objects
document.addEventListener('DOMContentLoaded', createWaves, false);

// Creates a Wave object for each <canvas> element that has the ".wave" class
function createWaves() {
    let waveElements = document.getElementsByClassName("wave");

    Array.prototype.forEach.call(waveElements, (element) => {
        let height = window.innerHeight;
        let width = window.innerWidth;
        if (element.getAttribute("data-height")) {
            height = parseInt(element.getAttribute("data-height"));
        }
        if (element.getAttribute("data-width")) {
            width = parseInt(element.getAttribute("data-width"));
        }

        let color = element.getAttribute("data-color");
        let oscillation = element.getAttribute("data-isOscillating") === "true";
        let speed = parseFloat(element.getAttribute("data-speed"));
        let sinOffset = parseFloat(element.getAttribute("data-offset"));
        let magnitude = 1 / parseInt(element.getAttribute("data-magnitude"));
        let widthRange = parseInt(element.getAttribute("data-width-range"));
        let lowestWidth = parseInt(element.getAttribute("data-lowest-width"));

        // Sets the height and width of the canvas element
        element.width = width;
        element.height = height;
        canvases.push(element);

        waves.push(new Wave(element, width, height, magnitude, widthRange, lowestWidth, color, oscillation, speed, sinOffset));
    });

    setInterval("wavesRun()", waveInterval);
}

// Runs all wave animations on the current page
function wavesRun() {
    waves.forEach((wave) => {
        wave.update();
        wave.clear();
        wave.draw();
    })
}

// A class for a wave -- Requires it's own canvas
class Wave {
    constructor(canvas, width, height, magnitude, widthRange, lowestWidth, color, isOscillating, speed, sinOffset) {
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.magnitude = magnitude;
        this.widthRange = widthRange;
        this.lowestWidth = lowestWidth;
        this.color = color;
        this.isOscillating = isOscillating;
        this.speed = speed;

        // Generate an initial wave array for this Wave
        this.ctx = this.canvas.getContext('2d');
        this.wavesArray = generateWaveArray(canvas, width, height, magnitude, widthRange, lowestWidth, color, isOscillating, speed, sinOffset);
    }

    // Updates all of the WaveBits that make up this Wave
    update() {
        let lastWave = this.wavesArray[this.wavesArray.length - 1];
        let firstWave = this.wavesArray[0];
        let firstStartPoint = firstWave.startPoint;
        let lastStartPoint = lastWave.startPoint;
        if (firstStartPoint > -buffer) {
            let newWidth = generateNumber(this.lowestWidth, this.widthRange);
            let newHeight = newWidth * this.magnitude;
            this.wavesArray.unshift(new WaveBit(this.canvas, this.height, this.color, newWidth, newHeight, firstStartPoint, this.isOscillating, this.speed, firstWave.getLifeCycle()));
        }
        if (this.width + buffer < lastStartPoint) {
            lastWave.remove();
            this.wavesArray.pop();
        }
        this.wavesArray.forEach((wave) => {
            wave.update();
        });
    };

    // Draws all the WaveBits that make up this Wave
    draw() {
        this.ctx.save();
        this.wavesArray.forEach((wave) => {
            wave.draw();
        });
        this.ctx.restore();
    };

    // Clears the area this Wave takes up
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    };
}

// A class for a cross-section of a wave that makes up the greater wave
class WaveBit {
    constructor(canvas, totalHeight, color, length, height, start, isOscillating, speed, sinOffset) {
        this.canvas = canvas;
        this.totalHeight = totalHeight;
        this.color = color;
        this.length = length;
        this.height = height;
        this.startPoint = start - length;
        this.endPoint = start; // x is the end of the wave
        this.isOscillating = isOscillating;
        this.speed = speed;
        this.lifeCycle = sinOffset;
        this.ctx = this.canvas.getContext('2d');
    }

    // Updates this WaveBit
    update() {
        if (this.isOscillating) {
            this.multiplier = -Math.sin(this.lifeCycle);
            this.lifeCycle += 0.05;
        }
        else {
            this.multiplier = 1;
        }
        this.startPoint += this.speed;
        this.endPoint += this.speed;
    };

    // Draws this WaveBit
    draw() {
        this.ctx.fillStyle = "rgba(" + this.color + ")";
        this.ctx.clearRect(this.startPoint, 0, this.endPoint, this.totalHeight / 2);
        this.ctx.beginPath();
        this.ctx.moveTo(this.startPoint, this.totalHeight / 2);
        let point1 = this.length / 4 + this.startPoint;
        let point2 = (this.length / 4) * 2 + this.startPoint;
        let point3 = (this.length / 4) * 3 + this.startPoint;
        let point4 = this.length + this.startPoint;
        this.ctx.quadraticCurveTo(point1, this.totalHeight / 2 + (this.height * this.multiplier), point2, this.totalHeight / 2);
        this.ctx.quadraticCurveTo(point3, this.totalHeight / 2 - (this.height * this.multiplier), point4, this.totalHeight / 2);
        this.ctx.lineTo(this.endPoint, this.totalHeight);
        this.ctx.lineTo(this.startPoint, this.totalHeight);
        this.ctx.lineTo(this.startPoint, this.totalHeight / 2);
        this.ctx.closePath();
        this.ctx.fill();
    };

    // Clears this WaveBit before it is removed from the Wave Array
    remove() {
        this.ctx.clearRect(this.startPoint, 0, this.length, this.totalHeight);
    };

    // Gets the length of this WaveBit
    getLength() {
        return this.length;
    };

    // Gets the lifecycle of this WaveBit
    getLifeCycle() {
        return this.lifeCycle;
    };
}

// Generates a random number between min & min + range
function generateNumber(min, range) {
    return Math.round(Math.random() * range) + min;
}

// Generates a random array of waves that cover the screen from right to left
function generateWaveArray(canvas, width, height, magnitude, widthRange, lowestWidth, color, isOscillating, speed, sinOffset) {
    let wavesArray = [];
    let remainingBudget = width;

    do {
        let newWidth = generateNumber(lowestWidth, widthRange);
        let newHeight = newWidth * magnitude;

        wavesArray.unshift(new WaveBit(canvas, height, color, newWidth, newHeight, remainingBudget, isOscillating, speed, height/2 + sinOffset));
        remainingBudget -= newWidth;
    } while (remainingBudget > 0);

    return wavesArray;
}