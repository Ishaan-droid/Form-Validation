'use strict';

// GLOBALS
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const age = document.querySelector('#age');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

const button = document.querySelector('#button');
const checkIcon = document.querySelectorAll('.d-flex .set-icon-correct');
const errorIcon = document.querySelectorAll('.d-flex .set-icon-error');
const errorMessage = document.querySelectorAll('.error-message');

// VALIDATORS
function renderErrorValidation(node, msg) {
  errorIcon[node].style.display = 'inline';
  errorMessage[node].style.display = 'inline';
  checkIcon[node].style.display = 'none';
  errorMessage[node].textContent = msg;
}

function renderCheck(node) {
  checkIcon[node].style.display = 'inline';
  errorIcon[node].style.display = 'none';
  errorMessage[node].style.display = 'none';
}

function nameCheck(nameValue, node, msg1, msg2) {
  if (nameValue.match(/\W|_/g)) {
    renderErrorValidation(node, msg1);
  } else if (nameValue === '') {
    renderErrorValidation(node, msg2);
  } else {
    renderCheck(node);
  }
}

// VALIDATE FIRST NAME
firstName.addEventListener('blur', () => {
  const firstNameValue = firstName.value;
  nameCheck(
    firstNameValue,
    0,
    'First Name cannot contain special characters.',
    'First Name cannot be blank.'
  );
});

// VALIDATE LAST NAME
lastName.addEventListener('blur', () => {
  const lastNameValue = lastName.value;
  nameCheck(
    lastNameValue,
    1,
    'Last Name cannot contain special characters.',
    'Last Name cannot be blank.'
  );
});

// VALIDATE AGE
age.addEventListener('blur', () => {
  const ageValue = age.value;
  if (!ageValue.match(/^[0-9]*$/)) {
    renderErrorValidation(2, 'Only Numbers are allowed');
  } else if (ageValue === '') {
    renderErrorValidation(2, 'Age is required.');
  } else {
    renderCheck(2);
  }
});

// VALIDATE EMAIL
email.addEventListener('blur', () => {
  const emailValue = email.value;
  if (emailValue === '') {
    renderErrorValidation(3, 'Email is required.');
  } else if (!emailValue.includes('@') || !emailValue.includes('.')) {
    renderErrorValidation(3, 'Incorrect format of email address.');
  } else {
    renderCheck(3);
  }
});

// VALIDATE PASSWORD
password.addEventListener('blur', () => {
  const passwordValue = password.value;
  if (passwordValue === '') {
    renderErrorValidation(4, 'Password is required.');
  } else {
    renderCheck(4);
  }
});

// VALIDATE FORM
button.addEventListener('click', () => {
  const setChecks = [...checkIcon];
  const alert = (msg, color) => `<div class="alert alert-${color}" id="boot_alert"role="alert">
                    ${msg}
                </div>`;

  const alertElement = document.querySelector('#boot_alert');
  if (alertElement != null || alertElement != undefined) {
    return;
  }

  if (setChecks.every(cur => cur.style.display === 'inline')) {
    document
      .querySelector('body')
      .insertAdjacentHTML(
        'beforebegin',
        alert('You have successfully registered with us!', 'success')
      );
  } else {
    document
      .querySelector('body')
      .insertAdjacentHTML('beforebegin', alert('Please fill all fields!', 'danger'));
  }
});

setInterval(() => {
  const alertElement = document.querySelector('#boot_alert');
  if (alertElement != null || alertElement != undefined) {
    alertElement.remove();
    clearInterval();
  }
}, 3000);
