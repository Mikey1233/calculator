"use strict";
const input = document.querySelector(".input");
const ans = document.querySelector(".ans");
const history = document.querySelector(".history");
const historySection = document.querySelector('.history__section')
const num = document.querySelectorAll(".btn");
const intro = document.querySelector(".intro");
let zero = document.querySelector(".zero");
const trashCan = document.querySelector(".svg");
trashCan.classList.add("act");

const allNum = [...num];
const numformat = {
  currency: "USD",
};
const b = 0;

function removeCommas(strOfNum) {
  let a = "";
  for (let w of strOfNum) {
    if (w === ",") {
      w = "";
    }
    a += w;
  }

  let y = Number(a).toFixed(3);
  return y;
}

let value;
let xox;
for (let x of allNum) {
  x.addEventListener("click", e => {
    value = e.target.dataset.key;
    if (value === "backSpace") {
      //if(zero.innerHTML !== '0' ||){
      if (input.innerHTML.length === 1) {
        input.innerHTML = "";
        input.append(0);
        xox = 1;
      } else {
        if (xox === 1) {
          let y = input.innerHTML.slice(0, -1);
          input.innerHTML = "";
          input.append(y);
        }
      }
    }

    if (input.innerHTML.length < 35) {
      if (value === "9") {
        numChecker();
      } else if (value === "8") {
        numChecker();
      } else if (value === "7") {
        numChecker();
      } else if (value === "6") {
        numChecker();
      } else if (value === "5") {
        numChecker();
      } else if (value === "4") {
        numChecker();
      } else if (value === "3") {
        numChecker();
      } else if (value === "2") {
        numChecker();
      } else if (value === "1") {
        numChecker();
      } else if (value === "0") {
        numChecker();
      } else if (value === ".") {
        if (input.innerHTML.length > 0) {
          validate(".", 2);
        } else {
          validate("0.", 2);
        }
      } else if (value === ")") {
        validateBrackets(")");
      } else if (value === "(") {
        validateBrackets("(");
      }
    }
  });
}

//code to prevent consecutive repitition of brackeks
function validateBrackets(str) {
  if (zero) {
    zero.remove();
    validate(str);
  } else {
    validate(str);
  }
}

let intro2; //variable to save the later info created by js

function clearHistory() {
  //function to clear history
  trashCan.addEventListener("click", () => {
    history.innerHTML = "";
    history.insertAdjacentHTML(
      "beforeEnd",
      `<div class="intro2 act">There's no history yet</div>`
    );
    intro2 = document.querySelector(".intro2");
    intro2.classList.remove("act");
    localStorage.clear();
    input.innerHTML = 0;
    ans.innerHTML = null;
    trashCan.classList.add("act");
  });
}
clearHistory(); //activation

for (let y of allNum) {
  y.addEventListener("click", e => {
    const value = e.target.dataset.key;
    if (value === "times") {
      validate("*");
    } else if (value === "divide") {
      // typeof zero === "object" ? zero.remove() : "";
      validate("/");
    } else if (value === "subtract") {
      //typeof zero === "object" ? zero.remove() : "";
      validate("-");
    } else if (value === "add") {
      //typeof zero === "object" ? zero.remove() : "";
      validate("+");
    } else if (value === "equals" && input.innerHTML !== "") {
      ans.innerHTML = "";
      let result = String(eval(input.innerHTML));
      if (result.length < 20) {
        const format = new Intl.NumberFormat("en-US", numformat).format(
          eval(input.innerHTML)
        );
        ans.append(format);
        historyTab(input, ans);
        input.innerHTML = "";
      } else {
        ans.innerHTML = "";
        ans.append(eval(input.innerHTML));
        historyTab(input, ans);
        input.innerHTML = "";
      }
    }
    if (value === "AC") {
      ans.innerHTML = null;
      input.innerHTML = 0;
    }
  });
}

//code to prevent repititions of numeric operators and decimal
function validate(str, num = 1) {
  if (num === 2) {
    if (input.innerHTML === "0") {
      input.innerHTML = 0;
      input.append(".");
    }
    //code to initialise 0.1 when the ending of the equation is +,-,*,/
    if (
      input.innerHTML.slice(-1) === "*" ||
      input.innerHTML.slice(-1) === "/" ||
      input.innerHTML.slice(-1) === "+" ||
      input.innerHTML.slice(-1) === "-"
    ) {
      input.append("0.");
    }
    //preventing repitition
    if (str === input.innerHTML.slice(-1)) {
      input.append("");
    } else {
      input.append(str);
    }
  } else {
    typeof zero === "object" ? zero.remove() : "";
    if (str === input.innerHTML.slice(-1) || input.innerHTML === "0") {
      input.append("");
    } else {
      input.append(str);
    }
  }
}

//history tab for calculator
function historyTab(input, ans) {
  if (intro) {
    intro.remove();
    trashCan.classList.remove("act");
    const html = `<div> <span class='small'>${input.innerHTML}</span> = ${ans.innerHTML}</div>`;
    history.insertAdjacentHTML("afterBegin", html);
    sendToLocalStorage(input.innerHTML, ans.innerHTML);
  } else {
    const html = `<div> <span class='small>${input.innerHTML}</span> = ${ans.innerHTML}</div>`;
    history.insertAdjacentHTML("afterBegin", html);
    sendToLocalStorage(input.innerHTML, ans.innerHTML);
  }
  if (intro2) {
    intro2.classList.add("act");
  }
}

//history tab for maths functions
function historyTab2(input, ans, state) {
  if (intro) {
    intro.remove();
    trashCan.classList.remove("act");
    const html = `<div><span class='small'> ${state} ( ${input.innerHTML} )</span> = ${ans.innerHTML}</div>`;
    history.insertAdjacentHTML("afterBegin", html);
    sendToLocalStorage(input.innerHTML, ans.innerHTML);
  } else {
    const html = `<div><span class='small'> ${state} ( ${input.innerHTML} )</span>= ${ans.innerHTML}</div>`;
    history.insertAdjacentHTML("afterBegin", html);
    sendToLocalStorage(input.innerHTML, ans.innerHTML);
  }
  if (intro2) {
    intro2.classList.add("act");
  }
}

//code for the first digit input in the calculator
function numChecker() {
  xox = 1;
  if (input.innerHTML === "0") {
    input.innerHTML = "";
  }
  if (typeof zero === "object") {
    zero.remove();
    input.append(value);
  } else {
    input.append(value);
  }
}

//code to refactor the code at the math functions
function cleanCode(root, str) {
  const format = new Intl.NumberFormat("en-US", numformat).format(root);
  ans.append(format);
  historyTab2(input, ans, str);
  input.innerHTML = "";
}

//maths functioms

for (let y of allNum) {
  y.addEventListener("click", function (e) {
    value = e.target.dataset.key;
    if (value === "square" && input.innerHTML !== "") {
      ans.innerHTML = "";
      let sqr = eval(input.innerHTML);
      let sqr2 = sqr * sqr;

      if (String(sqr2).length < 20) {
        const format = new Intl.NumberFormat("en-US", numformat).format(sqr2);
        ans.append(format);
        historyTab2(input, ans, "sqr");
        input.innerHTML = "";
      } else {
        ans.innerHTML = "";
        ans.append(sqr2);
        historyTab2(input, ans, "sqr");
        input.innerHTML = "";
      }
    } else if (value === "cube" && input.innerHTML !== "") {
      ans.innerHTML = "";
      let cube = eval(input.innerHTML);
      let cube2 = cube * cube * cube;

      if (String(cube2).length < 20) {
        const format = new Intl.NumberFormat("en-US", numformat).format(cube2);
        ans.append(format);
        historyTab2(input, ans, "cube");
        input.innerHTML = "";
      } else {
        ans.innerHTML = "";
        ans.append(cube2);
        historyTab2(input, ans, "cube");
        input.innerHTML = "";
      }
    } else if (value === "root" && input.innerHTML !== "") {
      ans.innerHTML = "";
      let root = eval(input.innerHTML);
      let root2 = Math.sqrt(root);
      cleanCode(root2, "√");
    } else if (value === "inverse" && input.innerHTML !== "") {
      ans.innerHTML = "";
      let inverse = eval(input.innerHTML);
      let inverse2 = 1 / inverse;
      cleanCode(inverse2, "1/");
    } else if (value === "percent" && input.innerHTML !== "") {
      ans.innerHTML = "";
      let percent = eval(input.innerHTML);
      let percent2 = percent / 100;
      cleanCode(percent2, "percentage:");
    }
  });
}
//code to take code to local storage
function sendToLocalStorage(input, ans) {
  let dataStorage;
  if (localStorage.getItem("dataStorage") === null) {
    dataStorage = [];
  } else {
    dataStorage = JSON.parse(localStorage.getItem("dataStorage"));
  }
  dataStorage.push([input, ans]);
  localStorage.setItem("dataStorage", JSON.stringify(dataStorage));
}

//code to get data fom the local storage wheb the web page is reloaded
window.addEventListener("load", function () {
    this.alert('sroll downward to check your history')
  let html = JSON.parse(this.localStorage.getItem("dataStorage"));
  if (html === null) {
    intro.classList.add("act");
  }
  if (intro) {
    if (html !== null) {
      trashCan.classList.remove("act");
      intro.remove();
      html.forEach(function (arr) {
        if (
          +`${(eval(arr[0]) * eval(arr[0])).toFixed(3)}` ===
          +removeCommas(arr[1])
        ) {
          const htmlText = `<div> <span class='small'>(${arr[0]})</span><sup>2</sup> = ${arr[1]}</div>`;
          history.insertAdjacentHTML("afterBegin", htmlText);
        } else if (
          +removeCommas(arr[1]) ===
          +`${(eval(arr[0]) * eval(arr[0]) * eval(arr[0])).toFixed(3)}`
        ) {
          const htmlText = `<div> <span class='small'>(${arr[0]})</span><sup>3</sup> = ${arr[1]}</div>`;
          history.insertAdjacentHTML("afterBegin", htmlText);
        } else if (eval(arr[0]) / 100 === +arr[1]) {
          const htmlText = `<div> <span class='small'>(${arr[0]})</span>% = ${arr[1]}</div>`;
          history.insertAdjacentHTML("afterBegin", htmlText);
        } else if (+removeCommas(arr[1]) === +Math.sqrt(arr[0]).toFixed(3)) {
          const htmlText = `<div> √<span class='small'>${arr[0]}</span> = ${arr[1]}</div>`;
          history.insertAdjacentHTML("afterBegin", htmlText);
        } else if (Math.round(1 / +arr[0]) === Math.round(+arr[1])) {
          const htmlText = `<div> <span class='small'>${arr[0]}</span><sup>-1</sup> = ${arr[1]}</div>`;
          history.insertAdjacentHTML("afterBegin", htmlText);
        } else {
          const htmlText = `<div> <span class='small'>${arr[0]}</span> = ${arr[1]}</div>`;
          history.insertAdjacentHTML("afterBegin", htmlText);
        }
      });
    }
  }
});
//window event

/*window.addEventListener("touchmove", function (e) {
    console.log(e.touches[0].clientY)
    console.log(e.touches[0])
  if (e.touches[0].clientY < e.touches[0].previousClientY) {
   
    console.log("User is scrolling upward");
  }
});*/


// Select the element you want to listen for touch events on
const targetElement = document.querySelector('body');

let startY = 0;

// Function to handle the touchmove event
function handleTouchMove(event) {
  const touch = event.touches[0];
  const deltaY = touch.clientY - startY;

  if (deltaY < 0) {
    console.log('User is scrolling upward');
    historySection.classList.add('active')
  }else if(deltaY > 0){
    historySection.classList.remove('active')

  }
}

// Event listener for touchstart to capture initial touch position
window.addEventListener('touchstart', (event) => {
  startY = event.touches[0].clientY;
});

// Event listener for touchmove to detect upward scrolling
window.addEventListener('touchmove', handleTouchMove);
console.log(historySection)
