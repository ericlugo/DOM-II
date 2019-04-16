// <== returns a random int from min to max (inclusive) ==>
function rndInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// <== returns a form element based on the provided values ==>
const formBuilder = (element, type, placeHolder, width) => {
  let temp = document.createElement(element);

  if (type) {
    temp.setAttribute('type', type);
  }
  if (placeHolder) {
    if (type === 'text' || type === 'textArea') {
      temp.setAttribute('placeholder', placeHolder);
    } else if (type === 'button') {
      temp.innerText = placeHolder;
    }
  }
  if (width) {
    temp.style.width = width;
  }
  temp.style.margin = '1rem 0';
  temp.style.border = '1px solid black';
  temp.style.borderRadius = '.25rem';
  return temp;
};

// <== MAKING SURE FIXED NAV STAYS ON TOP OF OTHER ITEMS! ==>
document.querySelector('.main-navigation').style.zIndex = '1';

// Creating form items to use in exercises.
const firstNameField = formBuilder('input', 'text', 'First Name', '50%');
const lastNameField = formBuilder('input', 'text', 'Last Name', '50%');
const bioField = formBuilder('input', 'text', 'Enter some text here.', '100%');
const confirmationButton = formBuilder('button', 'button', 'Click Me!');

// Insert form items into a container and insert that container into the DOM.
const container = document.createElement('div');
container.style.margin = '2rem 0';
container.style.padding = '1rem 2rem';
container.style.border = '1px dashed black';
container.style.borderRadius = '2rem';
container.style.textAlign = 'center';
let mssg1 = 'DRAG THE BUTTON TO SEE SOMETHING!<br>';
let mssg2 = 'Click in the First Name box too!<br>';
let mssg3 = 'Also, and try to highlight what you type!<br>';
let mssg4 = 'Oh! And double click the button to see it work!<br>';
container.innerHTML = `${mssg1}${mssg2}${mssg3}${mssg4}`;
confirmationButton.setAttribute('draggable', 'true');
container.appendChild(firstNameField);
container.appendChild(lastNameField);
container.appendChild(bioField);
container.appendChild(confirmationButton);
document.querySelector('.intro').appendChild(container);

// <== EVENT LISTENERS ==>
// Adding a mouseover effect to all the images in the page.
document.querySelectorAll('img').forEach((image) => {
  image.style.filter = 'grayscale(100%)';
  image.style.transition = 'filter 500ms ease-in-out';
  image.addEventListener('mouseover', (event) => {
    event.target.style.filter = 'grayscale(0%)';
    setTimeout(function() {
      event.target.style.filter = 'grayscale(100%)';
    }, 1500);
  });
});

// Adding a keydown effect to all input fields
document.querySelectorAll('input').forEach((inputField) => {
  inputField.addEventListener('keydown', (event) => {
    let value = [rndInt(0, 255), rndInt(0, 255), rndInt(0, 255)];
    let keydownColorValue = `rgb(${value[0]}, ${value[1]}, ${value[2]})`;
    event.target.style.backgroundColor = keydownColorValue;
  });
});

// Adding a wheel effect to the nav bar.
let grayVal = 255;
document.querySelector('.nav-container').addEventListener('wheel', (event) => {
  if (event.deltaY > 0 && grayVal < 255) grayVal++;
  else if (event.deltaY < 0 && grayVal > 0) grayVal--;
  document.querySelector(
    '.main-navigation',
  ).style.backgroundColor = `rgb(${grayVal}, ${grayVal}, ${grayVal})`;
});
document.querySelector('.nav-container').childNodes.forEach((child) => {
  child.addEventListener('wheel', (event) => {
    event.stopPropagation();
  });
});

// Adding drag event to change border value of form container.
confirmationButton.addEventListener('dragstart', (event) => {
  let borderVal = rndInt(0, 255);
  container.style.border = `1px solid rgb(${borderVal}, ${borderVal}, ${borderVal})`;
});

// Once the first image loads a popup appears.... EVIL!!!
document.querySelector('img').addEventListener('load', (event) => {
  alert('Hi there!');
});

// The First Name box will change to a red outlined box when focus goes to it.
firstNameField.addEventListener('focus', (event) => {
  event.target.style.border = '1px solid red';
});

// Changes the font color in the Last Name box on resize... hooray!
window.addEventListener('resize', (event) => {
  let lastNameVal = [rndInt(0, 255), rndInt(0, 255), rndInt(0, 255)];
  lastNameField.style.color = `rgb(${lastNameVal[0]}, ${lastNameVal[1]}, ${
    lastNameVal[2]
  }`;
});

// Pesters you by changing the text color in the Bio Field upon scrolling... how inventive right?
window.addEventListener('scroll', (event) => {
  let bioVal = [rndInt(0, 255), rndInt(0, 255), rndInt(0, 255)];
  bioField.style.color = `rgb(${bioVal[0]}, ${bioVal[1]}, ${bioVal[2]})`;
});

// Changes the background color of the paragraph above the form container on highlight of it's text.
document.addEventListener('select', (event) => {
  let selectVal = [rndInt(0, 255), rndInt(0, 255), rndInt(0, 255)];
  document.querySelector('.intro p').style.backgroundColor = `rgb(100, 100, ${
    selectVal[0]
  })`;
});

// Does "something" on double-click...
confirmationButton.addEventListener('dblclick', (event) => {
  alert("You've won! something... not sure what... but you did it!");
});

// Stopping the default action of the button upon click.
confirmationButton.addEventListener('click', function(event) {
  event.preventDefault();
});
