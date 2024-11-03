//Declaring goblal variables
let operator = '';
let currentValue = '';
let previousValue = '';

//Make the JS runs after the html and css load
document.addEventListener('DOMContentLoaded', function () {
  
  //store the html elements to js
  const previousScreen = document.querySelector('.previous');
  const currentScreen = document.querySelector('.current');
  const decimal = document.querySelector('#decimal');
  const result = document.querySelector('#result');
  const clearBtn = document.querySelector('#clear-btn');
  const numbers = document.querySelectorAll('.number');
  const operators = document.querySelectorAll('.operator');
  const erase = document.querySelector('#erase');

  //Adding the addEventListeners

  numbers.forEach((num) => {
    num.addEventListener('click', function() {
      handleNumber(this.textContent);
      currentScreen.textContent = currentValue;
    });
  });

  operators.forEach((op) => {
    op.addEventListener('click', function() {
      if(currentValue !== '' ||  currentValue != '0' ) {
        handleOperator(this.textContent);
        console.log(this.textContent)
        previousScreen.textContent = previousValue +" "+ operator;
        currentScreen.textContent = '';
      }
    });
  });

  result.addEventListener('click', function() {
    if(currentValue === '' || currentValue != '0') {
      calculate();
      if(previousValue.length > 10) {
        currentScreen.textContent = previousValue.slice(0,9) + "...";
      } else {
        currentScreen.textContent = previousValue;
      }
      previousScreen.textContent = '';
    }
  });

  clearBtn.addEventListener('click', function() {
    clearDisplay();
    currentScreen.textContent = 0;
    previousScreen.textContent = ''; 
  });

  decimal.addEventListener('click', function() {
    if(currentValue != '') {
      addDecimal();
      currentScreen.textContent = currentValue;
    }
  });

  erase.addEventListener('click', function() {
    if(currentValue != '') {
      remove();
      currentScreen.textContent = currentValue;
    };
  });
});

//Make the functions that i need

function handleNumber(num) {
  if(currentValue.length <= 8) {
    currentValue += num;
  };
}

function handleOperator(op) {
  operator = op;
  previousValue = currentValue;
  currentValue = '';
};

function calculate() {
  currentValue = Number(currentValue);
  previousValue = Number(previousValue);

  console.log(previousValue, currentValue)

  if(operator === '+') {
    previousValue += currentValue;
  } else if(operator === '-') {
    previousValue -= currentValue;
  } else if(operator === 'x') {
    previousValue *= currentValue;
  } else if(operator === '/') {
    previousValue /= currentValue;
  } else if(operator === '√') {
    previousValue = Math.sqrt(previousValue);
  } else if(operator === '%') {
    previousValue = (currentValue / 100) * previousValue;
  } else if(operator === '^') {
    previousValue = Math.pow(previousValue, currentValue);
  }

  
  currentValue = previousValue;
  previousValue = previousValue.toString();
  currentValue =  previousValue.toString();

}

function clearDisplay() {
  currentValue = '';
  previousValue = '';
  operator = '';
};

function addDecimal() {
  if(!currentValue.includes('.')) {
    currentValue += '.';
  };
};

function remove() {
   currentValue = currentValue.slice(0, -1);
};


