# Background Design

### General Design
With respect to the background, I wanted to stay way from using images, and would like the background to primarily 
use colors and abstract shapes. I believe this looks more modern and allows for use of subtle animations that will
make the background seem more dynamic and intriguing. With later iterations of the website I'll probably introduce 
more dynamic and less abstrat themes, but for now given my limited knowledge of CSS & JS animations, I'll stick to 
abstract and simpler. 

### Wave Design
One of the designs I thought of that could fill larger blank spaces on the webpage is a wave animation that can
serve as interesting way to transition color changes of the background. These waves will be generated dynamically
and utilize HTML Canvases to render the animations. Placing two or three waves together could be an interesting 
graphic that can create a changing "middle" line that changes between them. 

Waves will have to be drawn in parts that utilize one sin or cos curve per section. Wave object will need to be 
smart enough to know when it needs to generate new curves and when to delete the ones that have already passed 
through the banner. In this sense the waves can move in a given direction giving them a flow property. 
Additionally, I plan on implementing functionality that will allow the waves to oscillate giving them movement
on an extra dimension. 

### Block Move Design
Another design I'm thinking of, is having various colored rectangles (fitting within the color scheme) that move 
in various random directions across the screen. They will sit on a lower z-index than the waves and will appear 
to move out of sight underneath them. The blocks on creation will have a random number generated between 1 and 4
and each option will correspond to a given side of the body. When this number is determined, another number between
1 and 3 will be generated determining the possible options of the blocks in that they can go directional in either
way or straight down the path.

Once the starting position and direction is assigned to the block, the block will have the corresponding @keyframe
CSS animation assigned to it. There are 8 CSS animations for block movement, one for each direction. Another random
number will be generated determining the speed of the animation which will be used when the animation property is 
assgined to the dynamically created block. Colors will also need to be randomly generated. The number of generated 
blocks will be limited however as I don't want too many simultaneously moving blocks on the screen. 
