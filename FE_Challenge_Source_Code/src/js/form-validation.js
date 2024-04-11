import { populateResultsData } from './results';

var currentlySearching = true;//declare var currentlySearching to compare and know if it is phone number or email address

function showResultsSection() {
  const mainFormSection = document.getElementById('main-form');
  const searchAgainSection = document.getElementById('search-again');
  const featuresSection = document.getElementById('features');
  const resultsSection = document.getElementById('results');

  populateResultsData();
  mainFormSection.classList.add('d-none');
  featuresSection.classList.add('d-none');
  searchAgainSection.classList.remove('d-none');
  resultsSection.classList.remove('d-none');
}

//It validates if the information enteded is valid or not
function initInputValidation() {
  document.querySelectorAll('input[type="text"]').forEach(function (input) {
    input.addEventListener('keypress', function (event) {
      const inputuser = input.value.toLowerCase();
      const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      const regEy = /^[0-9]{1,10}$/;

      if (inputuser.match(regEx)) {
        var x = true;
        input.parentNode.classList.remove('error');
      } else {
        var x = false;
      }

      if (inputuser.match(regEy)) {
        var y = true;
        input.parentNode.classList.remove('error');
      } else {
        var y = false;
      }
      const keycode = event.keyCode ? event.keyCode : event.which;
      if (keycode == '13') {
        event.preventDefault();
        localStorage.clear();

        if (x === true && currentlySearching === true) {
          const proxyurl = '';
          const url = 'https://ltvdataapi.devltv.co/api/v1/records?email=' + input;
          fetch(proxyurl + url)
            .then(function (response) {
              return response.text();
            })
            .then(function (contents) {
              localStorage.setItem('userObject', contents);

              showResultsSection();
            })
            .catch(function (e) {
              console.log(e);
            });
        } else if (y === true && currentlySearching === false) {
          const proxyurl = '';
          const url = 'https://ltvdataapi.devltv.co/api/v1/records?phone=' + input;
          fetch(proxyurl + url)
            .then(function (response) {
              return response.text();
            })
            .then(function (contents) {
              localStorage.setItem('userObject', contents);
              showResultsSection();
            })
            .catch(function (e) {
              console.log(e);
            });
        }
        else if (x !== true && currentlySearching === true || y !== true && currentlySearching === false) {
          input.parentNode.classList.add('error');
        }
      }
    });
  });
}

//returns the information when the button is clicked
function initSearchButton() {
  document.querySelectorAll('.js-btn-search').forEach(function (button) {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      localStorage.clear();
      const selector = e.currentTarget.dataset.form;
      const userInput = document.getElementById(`email-${selector}-input`);
      const input = userInput.value.toLowerCase();
      //console.log(input);
      let x;
      const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      const regEy = /^[0-9]{1,10}$/; //restrictions for phone numbers

      if (input.match(regEx)) {
        x = true;
      } else {
        x = false;
      }

      let y;
      if (input.match(regEy)) {
        y = true;
      } else {
        y = false;
      }
      if (x === true && currentlySearching === true) {
        showLoadingPage();
        userInput.parentNode.classList.remove('error');
        const proxyurl = '';
        const url = 'https://ltvdataapi.devltv.co/api/v1/records?email=' + input;
        fetch(proxyurl + url)
          .then(function (response) {
            return response.text();
          })
          .then(function () {
            return showResultsSection();
          })
          .then(function () {
            hideLoadingPage();
           })
          .catch(function (e) {
            console.log(e);
          });
      }
      else if (y === true && currentlySearching === false) {
        showLoadingPage();
        userInput.parentNode.classList.remove('error');
        const proxyurl = '';
        const url = 'https://ltvdataapi.devltv.co/api/v1/records?phone=' + input;
        fetch(proxyurl + url)
      
          .then(function (response) {
            return response.text();
          })
          .then(function (contents) {
            localStorage.setItem('userObject', contents);
            showResultsSection();
          })
          .then(function () {
           hideLoadingPage();
          })

          .catch(function (e) {
            console.log(e);
          });
      }
      else if (x !== true && currentlySearching === true || y !== true && currentlySearching === false) {
        hideLoadingPage();
        userInput.parentNode.classList.add('error');
      }
    });
  });
}

//----buttons type of search----

//Function that allows change the placeholder and error message for emails address
function initEmailButton() {
  document.querySelectorAll('.button-emailSearch').forEach(function (button) {
    button.addEventListener('click', function (e) {
      var userInput = document.getElementById("email-search-input");
      userInput.placeholder = "Enter an Email Address";
      var errormsg = document.getElementById("error-msg");
      errormsg.textContent = "Please enter a valid Email";
      currentlySearching = true;
      document.getElementById('email-search-input').focus();
    });
  });
}

//Function that allows change the placeholder and error message for phone numbers
function initPhoneButton() {
  document.querySelectorAll('.button-phoneSearch').forEach(function (button) {
    button.addEventListener('click', function (e) {
      var phoneInput = document.getElementById("email-search-input");
      phoneInput.placeholder = "Enter a Phone Number";
      var errormsg = document.getElementById("error-msg");
      errormsg.textContent = "Please enter a valid phone number";
      currentlySearching = false;
    });
  });
}

//fuction that shows the loading page when a information is sended
function showLoadingPage() {
  loadingSection.style.display = 'block';
}

//fuction that hide the loading page when a information is loaded
function hideLoadingPage() {
  setTimeout(function () {
    loadingSection.style.display = 'none';
  }, 2000);
}

export { initInputValidation, initSearchButton, initEmailButton, initPhoneButton };