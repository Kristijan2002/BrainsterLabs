// Function to display the value in a text box
function show(anything) {
  document.querySelector(".textBox").value = anything;
}

// Event listener for the dropdown menu to toggle its active state
let dropdown = document.querySelector(".dropdown");
dropdown.onclick = function () {
  dropdown.classList.toggle("active");
};

let dropdownValue = "";

//Event listener for the dropdown options
document.getElementById("htmlOption").addEventListener("click", function (e) {
  show("Студенти од маркетинг");
  setSuccessForSelect(selectOption);
  dropdownValue = "Студенти од маркетинг";
});

document.getElementById("cssOption").addEventListener("click", function () {
  show("Студенти од програмирање");
  setSuccessForSelect(selectOption);
  dropdownValue = "Студенти од програмирање";
});

document.getElementById("jsOption").addEventListener("click", function () {
  show("Студенти од data science");
  setSuccessForSelect(selectOption);
  dropdownValue = "Студенти од data science";
});

document.getElementById("reactOption").addEventListener("click", function () {
  show("Студенти од дизајн");
  setSuccessForSelect(selectOption);
  dropdownValue = "Студенти од дизајн";
});

// Event listener for the form submission
document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = document.getElementById("form");

  // Logging the values of each for elements
  [...form.elements].forEach((item) => {
    console.log(item.value);
  });
});

const form = document.getElementById("form");
const nameSurname = document.getElementById("name");
const companyName = document.getElementById("companyName");
const email = document.getElementById("email");
const phoneNumber = document.getElementById("phoneNumber");
const selectOption = document.getElementById("selectOption");

// Event listeners for input validation
nameSurname.addEventListener("input", function () {
  checkInput(
    nameSurname.value.trim(),
    nameSurname,
    "Ова поле е задолжително",
    ""
  );
});

companyName.addEventListener("input", function () {
  checkInput(
    companyName.value.trim(),
    companyName,
    "Ова поле е задолжително",
    ""
  );
});
email.addEventListener("input", function () {
  checkInput(
    email.value.trim(),
    email,
    "Ова поле е задолжително",
    "Имејлот е не валиден"
  );
});
phoneNumber.addEventListener("input", function () {
  checkInput2(
    phoneNumber.value.trim(),
    phoneNumber,
    "Ова поле е задолжително",
    "Телефонскиот број е не валиден"
  );
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();
});

// Function to validate all input fields
function checkInputs() {
  let nameSurnameValue = nameSurname.value.trim();
  let companyNameValue = companyName.value.trim();
  let emailValue = email.value.trim();
  let phoneNumberValue = phoneNumber.value.trim();
  let selectOptionValue = selectOption.value.trim();
  let x = document.querySelector("#snackbar");

  if (nameSurnameValue === "") {
    setErrorFor(nameSurname, "Ова поле е задолжително");
  } else {
    setSuccessFor(nameSurname);
    nameSurnameValue = true;
  }

  if (companyNameValue === "") {
    setErrorFor(companyName, "Ова поле е задолжително");
  } else {
    setSuccessFor(companyName);
    companyNameValue = true;
  }

  if (emailValue === "") {
    setErrorFor(email, "Ова поле е задолжително");
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, "Имејлот не е валиден");
  } else {
    setSuccessFor(email);
    emailValue = true;
  }

  if (phoneNumberValue === "") {
    setErrorFor(phoneNumber, "Ова поле е задолжително");
  } else if (!isPhoneNumber(phoneNumberValue)) {
    setErrorFor(phoneNumber, "Телефонскиот број е не валиден");
  } else {
    setSuccessFor(phoneNumber);
    phoneNumberValue = true;
  }
  if (selectOptionValue === "Избери тип на студент") {
    setErrorForSelect(selectOption, "Ова поле е задолжително");
  } else {
    setSuccessForSelect(selectOption);
    setDefault(nameSurname);
    setDefault(companyName);
    setDefault(email);
    setDefault(phoneNumber);
    setDefaultOptions(selectOption);
    selectOptionValue = true;
  }

  // If all inputs are valid, reset the form and display a success message
  if (
    nameSurnameValue === true &&
    companyNameValue === true &&
    emailValue === true &&
    phoneNumberValue === true &&
    selectOptionValue === true
  ) {
    document.querySelector("#form").reset();
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  }
}

// Function to validate an input field and display error/success messages
function checkInput(param, name, messageBlank, messageNotValid) {
  if (param === "") {
    setErrorFor(name, messageBlank);
  } else if (name === email) {
    if (!isEmail(param)) {
      setErrorFor(name, messageNotValid);
    } else {
      setSuccessFor(email);
    }
  } else {
    setSuccessFor(name);
  }
}

// Function to validate a phone number input field and display error/success message
function checkInput2(param, name, messageBlank, messageNotValid) {
  if (param === "") {
    setErrorFor(name, messageBlank);
  } else if (name === phoneNumber) {
    if (!isPhoneNumber(param)) {
      setErrorFor(name, messageNotValid);
    } else {
      setSuccessFor(phoneNumber);
    }
  } else {
    setSuccessFor(name);
  }
}

// Function to set error state for an input field
function setErrorFor(input, message) {
  const formItem = input.parentElement; //.form-item
  const small = formItem.querySelector("small");

  small.innerText = message;

  formItem.className = "col-12 col-sm-6 form-item error";
}

// Function to set success state for an input field
function setSuccessFor(input) {
  const formItem = input.parentElement; //.form-item

  formItem.className = "col-12 col-sm-6 form-item success";
}

// Function to set success state for the select option
function setSuccessForSelect(input) {
  const formItem = input.parentElement; //.form-item

  formItem.className = "dropdown active form-item success";
}

// Function to set error state for the select option
function setErrorForSelect(input, message) {
  const formItem = input.parentElement; //.form-item
  const small = formItem.querySelector("small");

  small.innerText = message;

  formItem.className = "dropdown active form-item error";
}

// Function to set default state for an input field
function setDefault(input) {
  const formItem = input.parentElement; //.form-item

  formItem.className = "col-12 col-sm-6 form-item";
}

// Function to set default state for the select option
function setDefaultOptions(input) {
  const formItem = input.parentElement; //.form-item

  formItem.className = "dropdown form-item";
}

// Function to validate an email addredd
function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

// Function to validate a phone number
function isPhoneNumber(phoneNumber) {
  return /((00)?\+?[389]{3})?[\/\-\s*\.]?(((\(0\))|0)?\s*7\d{1})[\/\-\s*\.\,]?([\d]{3})[\/\-\s*\.\,]?([\d]{3})/.test(
    phoneNumber
  );
}
