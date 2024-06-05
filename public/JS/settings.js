/*Start Info Section */
let GenInfoInputs = document.querySelectorAll(".card.general-info input");
let inputEmail = document.querySelector("[name = 'email']");
let changeBtn = document.querySelector(".change");
let saveBtn = document.querySelector(" a.save");
let saveInfoBtn = document.querySelector("button.save-info");

GenInfoInputs.forEach((input) => {
  input.addEventListener("keyup", () => {
    let anyInputNotEmpty = false;
    GenInfoInputs.forEach((input) => {
      if (input.value.trim() !== "") {
        anyInputNotEmpty = true;
      }
    });
    if (anyInputNotEmpty) {
      //show the save information button if theres at least one input not empty
      saveInfoBtn.classList.add("visible");
    } else {
      saveInfoBtn.classList.remove("visible");
    }
  });
});

//hide the change button, show save button when foucs on input email
inputEmail.addEventListener("focus", () => {
  changeBtn.classList.toggle("hidden");
  saveBtn.classList.toggle("hidden");
});

// show the save button and hide the change button when click in change button
changeBtn.addEventListener("click", (event) => {
  event.preventDefault();
  inputEmail.disabled = false;
});

//hide the save button/ show change button, disable the input email when click on save button
saveBtn.addEventListener("click", (event) => {
  event.preventDefault();
  inputEmail.disabled = true;
  changeBtn.classList.toggle("hidden");
  saveBtn.classList.toggle("hidden");
});

/*End Info Section */

/*Start Security info section*/

let changePassBtn = document.querySelector(
  ".card.security-info .box:first-of-type a"
);
let savePassBtn = document.querySelector(
  ".card.security-info .box:first-of-type button.save"
);
let inputPass = document.querySelector("[type = 'password");

//hide/show the input password when click on the change button
changePassBtn.addEventListener("click", (event) => {
  event.preventDefault();
  inputPass.classList.toggle("hidden");
});

//change the change button to save button when focus on the password input
inputPass.addEventListener("click", () => {
  savePassBtn.classList.toggle("hidden");
  changePassBtn.classList.toggle("hidden");
});

//hide the input password and save button, show the change button when click on the save button
savePassBtn.addEventListener("click", (event) => {
  inputPass.classList.toggle("hidden");
  savePassBtn.classList.toggle("hidden");
  changePassBtn.classList.toggle("hidden");
});
/*End Security info section*/
