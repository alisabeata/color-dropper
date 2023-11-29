# Canvas Picker

## Getting Started

### `npm run serve`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. \

### `npm run build`

Builds the app for production to the `build` folder. \


### `npm run test`

Launches the test runner in the interactive watch mode. \



## Structure

`
project-root/
│
├── src/
│   ├── utils/
│   │   └── debounce.ts
│   ├── addColorData.ts
│   ├── addZoomLens.ts
│   ├── convertRgbToHex.ts
│   ├── createLensCircle.ts
│   ├── createScene.ts
│   ├── drawImage.ts
│   ├── getHexColor.ts
│   └── index.ts
│
├── tests/
│   └── ...
│
├── public/
│   ├── index.html
│   ├── index.css
│   ├── bundle.js
│   └── ...
│
└── ...
`

## Description

A color dropper picks a color from canvas. \

`debounce.ts` function is a utility for efficiently handling repeated calls \
to a function, ensuring that the target function is invoked only after a specified \
delay has passed since the last invocation.

`addColorData.ts` adds a color to the lens text element.

`addZoomLens.ts` is the main function, creates the lens canvas.

`convertRgbToHex.ts` converts the RGB color to HEX.

`createLensCircle.ts` an auxiliary function calls the `addZoomLens.ts` to create \ 
a canvas element.

`createScene.ts` gets the main canvas, invokes `drawImage.ts`.

`drawImage.ts` draws the main image.

`getHexColor.ts` gets HEX color as a string.

