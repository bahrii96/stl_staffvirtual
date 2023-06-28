(function ($) {

  const formMultiStepWrapper = document.querySelectorAll('.mulptiply-form');
  const FORM_ID = 'd3b1d23f-8094-4fda-be42-15583fabe2b9';

  $(document).ready(function () {
    initializeBlock($(this));
  });


  var initializeBlock = function ($block) {
    if (document.querySelector(".staff-form-popup")) {
      $(document).ready(function () {
        $('.staff-form-popup').each(function (index) {
          $(this).fancybox({
            maxWidth: 800,
            maxHeight: 600,
            fitToView: false,
            width: "70%",
            height: "70%",
            autoSize: false,
            closeClick: false,
            openEffect: "none",
            closeEffect: "none",
          });
        });
      });
    }
  }

  formMultiStepWrapper.forEach(form => {

    const btnNext = form.querySelector('#nextBtn'),
      btnPrev = form.querySelector('#prevBtn');

    var currentTab = 0; // Current tab is set to be the first tab (0)
    showTab(currentTab); // Display the current tab

    btnNext.addEventListener('click', next => {
      nextPrev(1);
    })

    btnPrev.addEventListener('click', prev => {
      nextPrev(-1);
    })

    function showTab(n) {
      // This function will display the specified tab of the form ... 
      var x = form.querySelectorAll(".tab");
      x[n].style.display = "flex";
      // ... and fix the Previous/Next buttons:
      if (n == 0) {
        form.querySelector("#prevBtn").style.display = "none";
      } else {
        form.querySelector("#prevBtn").style.display = "none";
      }
      if (n == (x.length - 1)) {
        form.querySelector("#nextBtn").innerHTML = "Submit";
      } else {
        form.querySelector("#nextBtn").innerHTML = "Next";
      }
    }

    function nextPrev(n) {
      // This function will figure out which tab to display
      console.log(validateForm());
      var x = form.querySelectorAll(".tab");
      // Exit the function if any field in the current tab is invalid:
      if (n == 1 && !validateForm()) return false;
      // Hide the current tab:
      x[currentTab].style.display = "none";
      // Increase or decrease the current tab by 1:
      currentTab = currentTab + n;
      // if you have reached the end of the form... :
      if (currentTab >= x.length - 1) {
        //...the form gets submitted:
        btnNext.style.display = 'none';
        form.querySelector("#submit").style.display = 'block';
        // return false;
      }
      // Otherwise, display the correct tab:
      showTab(currentTab);
    }

    function validateForm() {
      // This function deals with validation of the form fields
      let x, y, i, valid = true;
      x = form.querySelectorAll(".tab");
      xFirst = form.querySelector(".tab.fist-tab");
      xFirstInputs = xFirst.querySelectorAll("input[type='checkbox']:checked");
      y = x[currentTab].querySelectorAll(".required");
      // A loop that checks every input field in the current tab:

      for (i = 0; i < y.length; i++) {
        // If a field is empty...
        if (y[i].value == "") {
          // add an "invalid" class to the field:
          y[i].className += " invalid";
          // and set the current valid status to false:
          valid = false;
        }

        if (xFirst !== x[i] && xFirstInputs.length < 1) {
          valid = false;
        }
      }

      return valid; // return the valid status
    }
  })

  /* Form Sending */

  $('.mulptiply-form').each(function (index) {
    const currentForm = $(this);

    currentForm.find('form').submit(function (e) {
      e.preventDefault();
      formSendData($(this));
    });

    function getFormDataHubspot() {
      const dataForm = currentForm.find('.tab input[type="email"], .tab input[type="text"], .tab input[type="radio"]:checked');

      if (!dataForm) return;
      return currentForm.find('.tab input[type="email"], .tab input[type="text"], .tab input[type="radio"]:checked').map(function () {
        return {
          name: this.name,
          value: this.value
        }
      }).get();
    }

    function checkingCheckBoxesOnCheck() {
      const staffArray = [];
      let staffObjects = [];
      const checkBoxesChecked = currentForm.find('.tab.fist-tab input[type="checkbox"]:checked');

      if (!checkBoxesChecked) return;
      checkBoxesChecked.each(function (index) {
        const box = $(this);
        box.each(function (el) {
          staffArray.push($(this).next().text());
        })
        const joinEl = staffArray.join(', ');
        staffObjects = [{
          'name': 'staff',
          'value': joinEl,
        }];
      });

      return staffObjects;
    }

    function formSendData(thisEl) {
      // Create the new request
      var xhr = new XMLHttpRequest();
      let url = 'https://api.hsforms.com/submissions/v3/integration/submit/40032747/' + FORM_ID + '';
      const sendButton = thisEl.find('#submit');

      sendButton.text('Sending...');
      sendButton.attr('disabled', 'disabled');
      sendButton.attr('cursor', 'not-allowed');

      var data = {
        "submittedAt": Date.now(),
        "fields": jQuery.merge(checkingCheckBoxesOnCheck(), getFormDataHubspot()),
        "context": {
          "pageUri": window.location.href,
          "pageName": document.title
        }
      }

      const final_data = JSON.stringify(data);
      // Sends the request
      xhr.open('POST', url);
      // Sets the value of the 'Content-Type' HTTP request headers to 'application/json'
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          thisEl.addClass('success');
          thisEl.parent('.mulptiply-form__form').find('.mulptiply-form__form__success').addClass('show');
          // alert(xhr.responseText);
          //alert(xhr.responseText); // Returns a 200 response if the submission is successful.
        } else if (xhr.readyState == 4 && xhr.status == 400) {
          alert(xhr.responseText); // Returns a 400 error the submission is rejected.
        } else if (xhr.readyState == 4 && xhr.status == 403) {
          alert(xhr.responseText); // Returns a 403 error if the portal isn't allowed to post submissions.
        } else if (xhr.readyState == 4 && xhr.status == 404) {
          alert(xhr.responseText); //Returns a 404 error if the formGuid isn't found
        }
      }
      xhr.send(final_data);
    }

  });

})(jQuery);