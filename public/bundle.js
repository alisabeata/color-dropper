/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createScene = void 0;
const drawImage_1 = __webpack_require__(2);
function createScene() {
    // Get Element
    const canvas = document.querySelector('#canvas-picker');
    const context = canvas.getContext('2d');
    // Draw Image
    (0, drawImage_1.drawImage)('images/1920x1080-img-min.jpg', canvas, context);
}
exports.createScene = createScene;


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.drawImage = void 0;
const addZoomLens_1 = __webpack_require__(3);
function drawImage(url, canvas, context) {
    const img = new Image();
    img.src = url;
    img.addEventListener('load', function imageIsLoaded() {
        const windowWidth = window.innerWidth;
        const originalWidth = img.width;
        const originalHeight = img.height;
        // Calculate the corresponding height to maintain the original aspect ratio
        const aspectRatio = originalWidth / originalHeight;
        const newHeight = windowWidth / aspectRatio;
        // Set canvas size to match image
        canvas.width = windowWidth;
        canvas.height = newHeight;
        // Draw Image
        context.drawImage(img, 0, 0, windowWidth, newHeight);
        // Add Lens
        (0, addZoomLens_1.addZoomLens)(canvas, context);
    });
}
exports.drawImage = drawImage;


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addZoomLens = void 0;
const debounce_1 = __webpack_require__(4);
const getHexColor_1 = __webpack_require__(5);
const createLensCircle_1 = __webpack_require__(7);
const addColorData_1 = __webpack_require__(8);
function addZoomLens(canvasOriginal, contextOriginal) {
    const canvas = document.querySelector('#canvas-lens');
    const textElement = document.querySelector('#color-lens');
    const colorElement = document.querySelector('.color');
    const colorPreview = document.querySelector('.color-preview');
    const dropperBtn = document.querySelector('.dropper-btn');
    const canvasContainer = document.querySelector('.canvas-container');
    const context = canvas.getContext('2d');
    const canvasSize = canvas.width;
    const zoom = 8;
    const shiftToCenter = 3;
    let hex;
    let showDropper = false;
    // Toggle Dropper
    dropperBtn.addEventListener('click', function () {
        canvasContainer.classList.toggle('show-dropper');
        showDropper = !showDropper;
        if (!showDropper) {
            colorElement.textContent = '';
            colorPreview.style.setProperty('background-color', 'white');
        }
    });
    // Add the lens by mousemove without debounce using requestAnimationFrame
    canvasOriginal.addEventListener('mousemove', (0, debounce_1.debounce)(function addLensByMouseMove(event) {
        if (showDropper) {
            requestAnimationFrame(() => {
                // Get the mouse position
                const containerRect = canvasOriginal.getBoundingClientRect();
                const mouseX = event.clientX - containerRect.left;
                const mouseY = event.clientY - containerRect.top;
                // Set styles
                canvas.style.display = 'block';
                textElement.style.display = 'flex';
                context.fillStyle = 'white';
                context.fillRect(0, 0, canvasSize, canvasSize);
                // turn off image aliasing
                context.imageSmoothingEnabled = false;
                // Draw a zoomed background
                context.drawImage(canvasOriginal, mouseX - canvasSize / zoom, mouseY - canvasSize / zoom, canvasSize + shiftToCenter, canvasSize + shiftToCenter, 0 - canvasSize / 2, 0 - canvasSize / 2, canvasSize * zoom, canvasSize * zoom);
                // Get the hex color by mousemove
                hex = (0, getHexColor_1.getHexColor)(contextOriginal, mouseX, mouseY);
                // Add border
                if (hex) {
                    (0, createLensCircle_1.createLensCircle)(canvas, context, hex);
                }
                // Update the canvas position based on mouse coordinates
                canvas.style.transform = `translate(${mouseX - canvasSize / 2 + shiftToCenter}px, ${mouseY - canvasSize / 2 + shiftToCenter}px)`;
                // Add color data
                if (hex) {
                    (0, addColorData_1.addColorData)(textElement, mouseX, mouseY, hex);
                }
            });
        }
    }, 4));
    // Save color by click
    canvasOriginal.addEventListener('click', function saveColorByClick() {
        if (hex && showDropper) {
            colorElement.textContent = hex;
            colorPreview.style.setProperty('background-color', hex);
        }
    });
    // Hide the zoom element if it's not over the canvas
    document.addEventListener('mousemove', function hideLensByMouseMove(event) {
        if (event.target.tagName !== 'CANVAS') {
            canvas.style.display = 'none';
            textElement.style.display = 'none';
        }
    });
}
exports.addZoomLens = addZoomLens;


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.debounce = void 0;
function debounce(func, delay) {
    let timeoutId;
    return function () {
        const context = this;
        const args = [...arguments];
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(function () {
            func.apply(context, args);
            timeoutId = null;
        }, delay);
    };
}
exports.debounce = debounce;


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getHexColor = void 0;
const convertRgbToHex_1 = __webpack_require__(6);
function getHexColor(contextOriginal, x, y) {
    // Get the pixel data at the mouse coordinates
    const pixelData = contextOriginal.getImageData(x, y, 1, 1).data;
    const hex = (0, convertRgbToHex_1.convertRgbToHex)(pixelData[0], pixelData[1], pixelData[2]);
    return hex;
}
exports.getHexColor = getHexColor;


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convertRgbToHex = exports.convertColor = void 0;
function convertColor(color) {
    // Check RGB values range to be 0-255
    const colorRes = Math.min(255, Math.max(0, color));
    // Convert each component to hex
    const hexColor = colorRes.toString(16).padStart(2, '0');
    return hexColor.toUpperCase();
}
exports.convertColor = convertColor;
function convertRgbToHex(red, green, blue) {
    return `#${convertColor(red)}${convertColor(green)}${convertColor(blue)}`;
}
exports.convertRgbToHex = convertRgbToHex;


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createLensCircle = void 0;
function createLensCircle(canvas, context, hex) {
    // Set the border color and draw an empty circle
    context.strokeStyle = hex;
    context.lineWidth = 20;
    // Align the coordinates and properties
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;
    // Set the shadow properties
    context.shadowColor = 'rgba(0, 0, 0, 0.2)'; // Shadow color with transparency
    context.shadowBlur = 2; // Blur radius
    context.shadowOffsetX = 0; // Shadow offset in the x-axis
    context.shadowOffsetY = 1; // Shadow offset in the y-axis
    // Add circle
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    context.stroke();
    context.closePath();
}
exports.createLensCircle = createLensCircle;


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addColorData = void 0;
function addColorData(textElement, x, y, hex) {
    textElement.textContent = hex;
    textElement.style.transform = `translate(${x}px, ${y}px)`;
}
exports.addColorData = addColorData;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const createScene_1 = __webpack_require__(1);
(0, createScene_1.createScene)();

})();

/******/ })()
;