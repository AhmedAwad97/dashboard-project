let contactForm = document.getElementById("form");
let userInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let MessageContent = document.querySelector("[name = 'content']");
let nameInvalidDiv = document.querySelector(".name-invalid");
let contentInvalidDiv = document.querySelector(".content-invalid");

contactForm.addEventListener("submit", function (e) {
  //RegEx Pattern to check that the name doesnt contain any numbers or special characters
  let namePattern = /^[a-z]+$/gi;
  //RegEx Pattern to check that the Message is not empty
  let MessagePattern = /\S/gi;
  e.preventDefault(); // Prevent form submission if conditions are not met

  //Validate the Name and Message Values
  let isValidName = namePattern.test(userInput.value);
  let isValidMessage = MessagePattern.test(MessageContent.value);

  nameInvalidDiv.textContent = "";
  contentInvalidDiv.textContent = "";

  if (emailInput.value !== "") {
    if (!isValidName) {
      e.preventDefault();
      nameInvalidDiv.textContent =
        "*Please Enter a Valid Name, No Special Character And it Cant be Empty";
    }
    if (!isValidMessage) {
      e.preventDefault();
      contentInvalidDiv.textContent = "*You Cant send an empty message";
    }
    if (isValidName && isValidMessage) {
      document.querySelector(".pop-up").style.display = "flex";
      contactForm.style.display = "none";
    }
  }

  nameInvalidDiv.style.cssText = `
      color : red;
      margin-bottom: 5px;
      font-size: 14px;
      `;
  contentInvalidDiv.style.cssText = `
      color : red;
      margin-bottom: 5px;
      font-size: 14px;
      `;
});

/*Pop-up window*/
let closeBtn1 = document.querySelector(".pop-up button");
let closeIcon1 = document.querySelector(".pop-up i");

closeBtn1.addEventListener("click", () => {
  contactForm.reset();
  closeBtn1.parentElement.style.display = "none";
  contactForm.style.display = "block";
});

closeIcon1.addEventListener("click", () => {
  contactForm.reset();
  closeBtn1.parentElement.style.display = "none";
  contactForm.style.display = "block";
});
/*Pop-up window*/
