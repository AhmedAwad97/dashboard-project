/*Start Dark mode*/
let darkModeBtn = document.querySelector(".dark-mode-btn");
let darkModeCheckBox = document.querySelector(".dark-mode input");
let pageSite = document.querySelectorAll(".page");

/**
 * Add Event to toggle the dark class and store on local storage whether its in dark mode or no
 */
if (darkModeBtn && darkModeCheckBox) {
  darkModeBtn.addEventListener("click", () => {
    pageSite.forEach((page) => {
      page.classList.toggle("dark");
    });
    let isDarkMode = pageSite[0].classList.contains("dark");
    localStorage.setItem("darkMode", isDarkMode);
  });
}

/**
 * Check if the local storage is on dark mode and assign the dark class or if its in light mode to remove the class
 */
const storedDarkMode = localStorage.getItem("darkMode");
if (storedDarkMode === "true") {
  pageSite.forEach((page) => {
    page.classList.add("dark");
  });
  darkModeCheckBox.checked = true;
} else {
  pageSite.forEach((page) => {
    page.classList.remove("dark");
  });
  darkModeCheckBox.checked = false;
}
/*End Dark mode*/
