The following is the readme file for the calculator project.

## Instructions

To use this calculator, simply enter your equation into the input field and click on the equals button. The answer will be displayed in the output field.

You can also use the following buttons to perform mathematical operations:

* Add: +
* Subtract: -
* Multiply: *
* Divide: /
* Square: x^2
* Cube: x^3
* Square Root: √
* 1/x: 1/
* Percentage: %
* Clear: AC
* Backspace: <

The calculator also has a history feature that allows you to view your previous calculations. To clear the history, click on the trash can icon.

## Code Explanation

The calculator is built using HTML, CSS, and JavaScript. The HTML code defines the structure of the calculator, the CSS code defines the style of the calculator, and the JavaScript code defines the functionality of the calculator.

The JavaScript code is divided into two parts: the event handlers and the math functions. The event handlers listen for user input and trigger the appropriate actions. The math functions perform the mathematical calculations.

The event handlers are defined in the `<body>` tag. The `addEventListener()` method is used to attach event listeners to the buttons on the calculator. The event listeners are functions that are called when the corresponding event occurs.

The math functions are defined in the `<script>` tag. The `validate()` function is used to validate the user input. The `numChecker()` function is used to handle the first digit input in the calculator. The `historyTab()` function is used to add a new entry to the history. The `historyTab2()` function is used to add a new entry to the history for math functions. The `cleanCode()` function is used to format the output of math functions. The `sendToLocalStorage()` function is used to save the calculator history to local storage. The `window.addEventListener()` method is used to listen for the `load` event. The `load` event is triggered when the web page is loaded. The `load` event handler is used to get the calculator history from local storage and display it in the history section of the calculator.