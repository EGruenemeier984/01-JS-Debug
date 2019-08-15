"use strict";
 //global variables
 var twentyNine = document.createDocumentFragment();
 var thirty = document.createDocumentFragment();
 var thirtyOne = document.createDocumentFragment();
 var formValidity = true;
 var invColor = "rgb(255, 100, 100)";

 function setUpDays() { //Get the important select list from the DOM
   var dates = document.getElementById("delivDy").getElementsByTagName("option");
   twentyNine.appendChild(dates[28].cloneNode(true));
   thirty.appendChild(dates[28].cloneNode(true));
   thirty.appendChild(dates[29].cloneNode(true));
   thirtyOne.appendChild(dates[28].cloneNode(true));
   thirtyOne.appendChild(dates[29].cloneNode(true));
   thirtyOne.appendChild(dates[30].cloneNode(true));
 }

 function updateDays() {
   var deliveryDay = document.getElementById("delivDy");
   var dates = deliveryDay.getElementsByTagName("option");
   var deliveryMonth = document.getElementById("delivMo");
   var deliveryYear = document.getElementById("delivYr");
   if (deliveryMonth.selectedIndex === -1) { //when the year is selected and there is no month it sets it to -1 and then ruins the rest of the code
     return;
   }
   var selectedMonth = deliveryMonth.options[deliveryMonth.selectedIndex].value;


   if (deliveryYear.selectedIndex === -1) { //if year is not selected then set the value to 0
     deliveryYear.selectedIndex = 0;
   }
   while (dates[28]) { // Gets rid if the 1-28 values
     deliveryDay.removeChild(dates[28]);
   }
   switch (selectedMonth) { // Uses switch cases to
     case "2":
       if (deliveryYear.options[deliveryYear.selectedIndex].value === "2020") {
         deliveryDay.appendChild(twentyNine.cloneNode(true));
       }
       break;
     case "4":
     case "6":
     case "9":
     case "11":
       deliveryDay.appendChild(thirty.cloneNode(true))
       break;
   }
   switch (selectedMonth) {
     case "1":
     case "3":
     case "5":
     case "7":
     case "8":
     case "10":
     case "12":
       deliveryDay.appendChild(thirtyOne.cloneNode(true))
       break;
     default:
       console.log("Error line:74");
       break;
   }
 }

 function removeSelectDefaults() { // Gets the select tag and makes the default selected choice nothing.
   var emptyBoxes = document.getElementsByTagName("select");
   for (var i = 0; i < emptyBoxes.length; i++) {
     emptyBoxes[i].selectedIndex = -1;
   }
 }

 function copyBillingAddress() { // copies the billing address
   var billingInputElements = document.querySelectorAll("#billingAddress input");
   var deliveryInputElements = document.querySelectorAll("#deliveryAddress input");
   if (document.getElementById("sameAddr").checked) { // copy data rom billing to delivery
     for (var i = 0; i < billingInputElements.length; i++) {
       deliveryInputElements[i + 1].value = billingInputElements[i].value;
     }
     document.querySelector("#deliveryAddress select").value =
       document.querySelector("#billingAddress select").value;
   } else {
     for (var i = 0; i < billingInputElements.length; i++) {
       deliveryInputElements[i + 1].value = "";
     }
     document.querySelector("#delivery select").value = "";
   }
 }


 function validateAddress(fieldsetId) { // function that validateAddress
   //#billingAddress input
   var inputElements = document.querySelectorAll("#" + fieldsetId + " input");
   var errorDiv = document.querySelectorAll("#" + fieldsetId + " .errorMessage")[0];
   var fieldsetValidity = true;
   var elementCount = inputElements.length;
   var currentElement; // used to track an element that is empty
   try { // try to get a mistake in the fieldset
     for (var i = 0; i < elementCount; i++) {
       currentElement = inputElements[i];
       if (currentElement.value === "") {
         // debugger;
         currentElement.style.background = invColor; // changes background color of what needs to be filled in
         fieldsetValidity = false;
       } else {
         currentElement.style.background = "white";
       }
     }
     currentElement = document.querySelector("#" + fieldsetId + " select");
     if (currentElement.selectedIndex === -1) {
       currentElement.style.border = "1px solid red";
       fieldsetValidity = false;
     } else {
       currentElement.style.border = "";
     }
     if (fieldsetValidity === false) {
       if (fieldsetId === "billingAddress") {
         throw "Please complete all Billing Address information.";
       } else {
         throw "Please complete all Delivery Address information.";
       }
     } else {
       errorDiv.style.display = "none"; // sets the display to nothing
       errorDiv.innerHTML = ""; // sets the text to nothing
     }
   } catch (msg) { // pick up the error in the fieldset
     errorDiv.style.display = "block";
     errorDiv.innerHTML = msg;
     formValidity = false;
   }
 }


 function validateDeliveryDate() { // function that validateDeliveryDate
   //#billingAddress input
   var selectElements = document.querySelectorAll("#deliveryDate select");
   var errorDiv = document.querySelectorAll("#deliveryDate .errorMessage")[0];
   var fieldsetValidity = true;
   var elementCount = selectElements.length;
   var currentElement; // used to track an element that is empty
   try { // try to get a mistake in the fieldset
     for (var i = 0; i < elementCount; i++) {
       currentElement = selectElements[i];

       if (currentElement.selectedIndex === -1) {
         currentElement.style.border = "1px solid red";
         fieldsetValidity = false;
       } else {
         currentElement.style.border = "";
       }
     }
     if (fieldsetValidity === false) {
       throw "Please complete all Delivery Address information.";
     } else {
       errorDiv.style.display = "none"; //  sets the display to nothing
       errorDiv.innerHTML = ""; //  sets the text to nothing
     }
   } catch (msg) { // pick up the error in the fieldset
     errorDiv.style.display = "block";
     errorDiv.innerHTML = msg;
     formValidity = false;
   }

 }

 function validateCreateAccount() { // function that validateCreateAccount
   var errorDiv = document.querySelectorAll("#createAccount .errorMessage")[0];
   var userName = document.getElementById("username");
   var pass1Element = document.getElementById("pass1");
   var pass2Element = document.getElementById("pass2");
   var passwordMismatch = false;
   var fieldsetValidity = true;
   var blankCount = 0;


   try { // try to get a mistake in the fieldset
     userName.style.background = "none";
     pass1Element.style.background = "none";
     pass2Element.style.background = "none";
     errorDiv.style.display = "none";

     if (userName.value !== "" && pass1Element.value !== "" && pass2Element.value !== "") { // error
       if (pass1Element.value !== pass2Element.value) {
         passwordMismatch = true;
         throw "Passwords do not match, please re-enter";
       }
     } else if (userName.value === "" && pass1Element.value === "" && pass2Element.value === "") {
       // simplified the if statements to three if statements
       fieldsetValidity = true;
     } else {
       fieldsetValidity = false;
       throw "Enter all data fields to create an account.";
     }
   } catch (msg) { // pick up the error
     errorDiv.style.display = "block";
     errorDiv.innerHTML = msg;
     formValidity = false;
     pass1Element.style.background = invColor;
     pass2Element.style.background = invColor;
     if (passwordMismatch) {
       userName.style.background = "";
     } else { // anything else
       userName.style.background = invColor;
     }
   }

 }

 function validatePayment() { // function that validateDeliveryDate
   //#billingAddress input
   var errorDiv = document.querySelectorAll("#paymentInfo .errorMessage")[0];
   var fieldsetValidity = true;
   var ccNumElement = document.getElementById("ccNum");
   var cvvElement = document.getElementById("cvv");
   var cards = document.getElementsByName("PaymentType");
   var selectElements = document.querySelectorAll("#paymentInfo select");
   var elementCount = selectElements.length;
   var currentElement; //used to track an element that is empty
   try {
     if (!cards[0].checked && !cards[1].checked && !cards[2].checked && !cards[3].checked) {
       for (var i = 0; i < cards.length; i++) {
         cards[i].style.outline = "1px solid red";
       }
       fieldsetValidity = false;
     } else { // one is checked
       for (var i = 0; i < cards.length; i++) {
         cards[i].style.border = "";
       }
     }
     if (ccNumElement.value === "") { // if the card number value is nothng make the backgroud red
       ccNumElement.style.background = invColor;
       fieldsetValidity = false;
     } else {
       ccNumElement.style.background = "white";
     }
     for (var i = 0; i < elementCount; i++) { // Outlines the exp year and month in ted if not filled
       currentElement = selectElements[i];
       if (currentElement.selectedIndex === -1) {
         currentElement.style.border = "1px solid red";
         fieldsetValidity = false;
       } else {
         currentElement.style.border = "white";
       }
     }
     if (cvvElement.value === "") { // if the card number value is nothng make the backgroud red
       cvvElement.style.background = invColor;
       fieldsetValidity = false;
     } else {
       cvvElement.style.background = "white";
     }


     if (fieldsetValidity === false) {
       throw "please complete all payment information";
     } else {
       errorDiv.style.display = "none";
       errorDiv.innerHTML = "";
     }
   } catch (msg) { // pick up the error in the fieldset
     errorDiv.style.display = "block";
     errorDiv.innerHTML = msg;
     formValidity = false;
   }

 }

 function validateMessage() {

   var errorDiv = document.querySelectorAll("#message .errorMessage")[0];
   var msgBox = document.getElementById("customText");
   var fieldsetValidity = true;

   try { // try to get a mistake in the custom message
     if (document.getElementById("custom").checked && msgBox.value === "" || msgBox.value === msgBox.placeholder) { //error in the custom message box
       fieldsetValidity = false;
       msgBox.style.background = invColor;
     } else { // not error
       msgBox.style.background = "white";
     }
     if (fieldsetValidity === false) {
       throw "Please specify a custom message.";
     } else {
       errorDiv.style.display = "none"; // sets the display to nothing
       errorDiv.innerHTML = ""; // sets the text to nothing
     }
   } catch (msg) { // pick up the error in the fieldset
     errorDiv.style.display = "block";
     errorDiv.innerHTML = msg;
     formValidity = false;
   }

 }

 function validateForm(evt) { // function that is called hen the page is set up for form validation
   if (evt.preventDefault) { // prevents new and old browsers from running auto validate.
     evt.preventDefault();
   } else {
     evt.returnValue = false;
   }


   formValidity = true;
   validateAddress("billingAddress");
   validateAddress("deliveryAddress");
   validateDeliveryDate();
   validatePayment();
   validateMessage();
   validateCreateAccount();

   // NOTE: Doing validity testing
   if (formValidity === true) { //form is valid
     document.getElementById("errorText").innerHTML = "";
     document.getElementById("errorText").style.display = "none";
     document.getElementsByTagName("form")[0].submit();
   } else { // form is not valid
     document.getElementById("errorText").innerHTML = "Please fix the indicated problems and then resubmit your order.";
     document.getElementById("errorText").style.display = "block";
     scroll(0, 0);
   }
 }





 function showPass() { // onclick shows the password for validation
   var showPassword1 = document.getElementById("pass1");
   var showPassword2 = document.getElementById("pass2");
   if (document.getElementById("Spass").checked) {
     showPassword1.setAttribute("type", "text");
     showPassword2.setAttribute("type", "text");
   } else {
     showPassword1.setAttribute("type", "password");
     showPassword2.setAttribute("type", "password");
   }

   // document.getElementById("pass1").setAttribute("type", "text");

 }

 function setUpPage() { // onLoad this function will call other functions.
   removeSelectDefaults();
   setUpDays();
   createEventListeners();
 }

 function autoCheckCustom() {
   var messageBox = document.getElementById("customText");
   if (messageBox.value !== "" && messageBox.value !== messageBox.placeholder) {
     document.getElementById("custom").checked = "checked";
   } else {
     document.getElementById("custom").checked = "";
   }
 }

 function createEventListeners() { // takes care of all event listners that are needed.
   var deliveryMonth = document.getElementById("delivMo");
   if (deliveryMonth.addEventListener) {
     deliveryMonth.addEventListener("change", updateDays, false)
   } else if (deliveryMonth.attachEvent) {
     deliveryMonth.attachEvent("onchange", updateDays)
   }
   var deliveryYear = document.getElementById("delivYr");
   if (deliveryYear.addEventListener) {
     deliveryYear.addEventListener("change", updateDays, false)
   } else if (deliveryYear.attachEvent) {
     deliveryYear.attachEvent("onchange", updateDays)
   }
   var messageBox = document.getElementById("customText"); // adds event listener for the customtext
   if (messageBox.addEventListener) {
     messageBox.addEventListener("change", autoCheckCustom, false)
   } else if (messageBox.attachEvent) {
     messageBox.attachEvent("onchange", autoCheckCustom)
   }
   var sameAddress = document.getElementById("sameAddr"); // adds event handler that copies the billing address
   if (sameAddress.addEventListener) {
     sameAddress.addEventListener("change", copyBillingAddress, false)
   } else if (sameAddress.attachEvent) {
     sameAddress.attachEvent("onchange", copyBillingAddress)
   }
   
   var form = document.getElementsByTagName("form")[0]; // makes sure the form is valid
   if (form.addEventListener) {
     form.addEventListener("submit", validateForm, false)
   } else if (form.attachEvent) {
     form.attachEvent("onsubmit", validateForm)
   }

 }

 // On page load the event handler and removeSelectDefaults
 if (window.addEventListener) {
   window.addEventListener("load", setUpPage, false)
 } else if (window.attachEvent) {
   window.attachEvent("onload", setUpPage)
 }
