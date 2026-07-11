// 1. Fixed the querySelector blank target string by adding the missing '#' ID prefix symbol.
const radiusOutput = document.getElementById('radius');
const areaOutput = document.querySelector('#area'); 

const PI = 3.14159; // 2. Fixed Syntax Error: Changed comparison '==' to assignment '='.
let radius = 10;    // 3. Fixed Runtime Error: Changed 'const' to 'let' to allow re-assignment down below.
let area = 0;

// First calculation (Radius = 10)
area = PI * radius * radius;
// 4. Fixed Runtime Error: Targeted the element text node properties via '.textContent' instead of reassigning the constant object variable directly.
radiusOutput.textContent = radius;
areaOutput.textContent = area;

// Second calculation (Radius = 20)
radius = 20; 
area = PI * radius * radius;
radiusOutput.textContent = radius;
areaOutput.textContent = area;