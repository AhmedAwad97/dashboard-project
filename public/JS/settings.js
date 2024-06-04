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
      saveInfoBtn.classList.add("visible");
    } else {
      saveInfoBtn.classList.remove("visible");
    }
  });
});

inputEmail.addEventListener("focus", () => {
  changeBtn.classList.toggle("hidden");
  saveBtn.classList.toggle("hidden");
});

changeBtn.addEventListener("click", (event) => {
  event.preventDefault();
  inputEmail.disabled = false;
});

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

changePassBtn.addEventListener("click", (event) => {
  event.preventDefault();
  inputPass.classList.toggle("hidden");
});

inputPass.addEventListener("click", () => {
  savePassBtn.classList.toggle("hidden");
  changePassBtn.classList.toggle("hidden");
});

savePassBtn.addEventListener("click", (event) => {
  inputPass.classList.toggle("hidden");
  savePassBtn.classList.toggle("hidden");
  changePassBtn.classList.toggle("hidden");
});
/*End Security info section*/
