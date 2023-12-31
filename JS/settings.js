/*Start Info Section */

let inputEmail = document.querySelector("[name = 'email']");
let changeBtn = document.querySelector(".change");
let saveBtn = document.querySelector(" a.save");

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
  ".card.security-info .box:first-of-type a.save"
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
  event.preventDefault();
  inputPass.classList.toggle("hidden");
  savePassBtn.classList.toggle("hidden");
  changePassBtn.classList.toggle("hidden");
});
/*End Security info section*/

/*Start Dark mode*/
// let darkMode = document.querySelector(".dark-mode");
let darkModeBtn = document.querySelector(".dark-mode-btn");
let darkModeCheckBox = document.querySelector(".dark-mode input");
let pageSite = document.querySelector(".page");

/**
 * Add Event to toggle the dark class and store on local storage whether its in dark mode or no
 */
darkModeBtn.addEventListener("click", () => {
  pageSite.classList.toggle("dark");
  let isDarkMode = pageSite.classList.contains("dark");
  localStorage.setItem("darkMode", isDarkMode);
});

/**
 * Check if the local storage is on dark mode and assign the dark class or if its in light mode to remove the class
 */
const storedDarkMode = localStorage.getItem("darkMode");
if (storedDarkMode === "true") {
  pageSite.classList.add("dark");
  darkModeCheckBox.checked = true;
} else {
  pageSite.classList.remove("dark");
  darkModeCheckBox.checked = false;
}
/*End Dark mode*/
