/*Header section*/
/**
 * make a drop menu when clicking on the profile photo or the notification icon in the header section
 */

let profilePic = document.querySelector("#profilePic");
profilePic.addEventListener("click", () => {
  document.querySelector(".profileContent").classList.toggle("visible");
  document.querySelector(".notificationContent").classList.remove("visible");
});

let notificationIcon = document.querySelector(".notificationIcon");
notificationIcon.addEventListener("click", () => {
  document.querySelector(".notificationContent").classList.toggle("visible");
  document.querySelector(".profileContent").classList.remove("visible");
});

/**
 * hide the menu when click on body anywhere except on the notification parts
 */
document.body.addEventListener("click", (event) => {
  let isProfilePicCliked = profilePic.contains(event.target);
  let isNotificationIconCliked = notificationIcon.contains(event.target);
  if (!isProfilePicCliked && !isNotificationIconCliked) {
    document.querySelector(".profileContent").classList.remove("visible");
    document.querySelector(".notificationContent").classList.remove("visible");
  }
});
/*Header section*/

/*Latest task section*/
/**
 * Deleting each row when click on the delete icon
 */
let deleteIcon = document.querySelectorAll(".tasks-row a");
deleteIcon.forEach((element) => {
  element.addEventListener("click", () => {
    element.parentElement.style.display = "none";
  });
});

/**
 * Save history of the form in the quick draft section to the latest task section
 */
let draftForm = document.querySelector(".quick-draft form");
let tasksSection = document.querySelector(".tasks");
const submissions = JSON.parse(localStorage.getItem("formSubmissions")) || [];

function saveSubmission(formData) {
  const submission = Object.fromEntries(formData);

  // Create HTML elements for the submission
  const submissionDiv = document.createElement("div");
  submissionDiv.classList.add(
    "tasks-row",
    "d-flex",
    "align-c",
    "gap-20",
    "mt-20"
  );

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("info");

  const titleHeading = document.createElement("h3");
  titleHeading.classList.add("fs-16");
  titleHeading.textContent = submission.title;

  const thoughtParagraph = document.createElement("p");
  thoughtParagraph.classList.add("c-grey", "fs-14", "mt-5");
  thoughtParagraph.textContent = submission.content;
  const deleteIcon = document.createElement("a");
  deleteIcon.href = "#";
  deleteIcon.onclick = (event) => {
    event.preventDefault();
    deleteIcon.parentElement.style.display = "none";
  };
  deleteIcon.innerHTML = '<i class="fa-regular fa-trash-can fs-20"></i>'; // Use "×" for a delete icon
  deleteIcon.classList.add("delete-icon");
  deleteIcon.addEventListener("click", function () {
    // Handle delete functionality
    // For example, remove the submission from the localStorage and the DOM
    const index = submissions.indexOf(submission);
    if (index !== -1) {
      submissions.splice(index, 1);
      localStorage.setItem("formSubmissions", JSON.stringify(submissions));
      submissionDiv.remove();
    }
  });

  // Append elements to submissionDiv
  submissionDiv.appendChild(infoDiv);
  submissionDiv.appendChild(deleteIcon);
  infoDiv.appendChild(titleHeading);
  infoDiv.appendChild(thoughtParagraph);

  // Append submissionDiv to tasksSection
  tasksSection.appendChild(submissionDiv);
}

draftForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(this);
  saveSubmission(formData);

  // Save the submission in the localStorage
  submissions.push(Object.fromEntries(formData));
  localStorage.setItem("formSubmissions", JSON.stringify(submissions));

  // Clear the form
  this.reset();
});

// Display existing submissions on page load
submissions.forEach((submission) => {
  const formData = new FormData();
  Object.entries(submission).forEach(([key, value]) => {
    formData.append(key, value);
  });
  saveSubmission(formData);
});

/*
Save history of the form to the latest task section  
*/
/*Latest task section*/

/*Latest Post Section*/
/*
change the fill color of the like and increament it 
*/
let like = document.querySelector(".react i ");
let counter = parseInt(like.nextElementSibling.textContent);
like.addEventListener("click", () => {
  like.classList.toggle("fa-solid");
  like.style.color = "red";
  if (like.classList.contains("fa-solid")) {
    counter++;
  } else {
    counter--;
  }
  like.nextElementSibling.textContent = counter;
});

/*
 * comment part, use on click event to show the comment section and increment it when user comment
 * and use the event to hide the input again
 * also show a pop up window confirming the comment
 */
let comment = document.querySelector(".comment i ");
let commentCounter = parseInt(comment.nextElementSibling.textContent);
let commentSection = document.querySelector(".comment-section");
let commentSectionInput = document.querySelector(".comment-section input");
let commentSectionBtn = document.querySelector(".comment-section button");

/*Display the comment input to add a comment */
comment.addEventListener("click", () => {
  commentSection.style.display = "block";
});

/*increment the comment counter with each comment added */
commentSectionBtn.addEventListener("click", () => {
  if (commentSectionInput.value.trim() === "") {
    commentSectionInput.placeholder = "You cant comment empty comment";
    return;
  }
  commentCounter++;
  comment.nextElementSibling.textContent = commentCounter;
  commentSectionInput.value = "";
  commentSection.style.display = "none";
  document.querySelector(".pop-up").style.display = "flex";
});

/*Close the pop-up window*/
let closeBtn = document.querySelector(".pop-up button");
let closeIcon = document.querySelector(".pop-up i");

closeBtn.addEventListener("click", () => {
  closeBtn.parentElement.style.display = "none";
});
closeIcon.addEventListener("click", () => {
  closeIcon.parentElement.style.display = "none";
});

/*Latest Post Section*/

/*Top Search Item*/
/**
 * pick up each checked item and remove it from the row and add it to the choosed item div
 */
let choosenItems = document.querySelector(".choosen-item");
let checkedItem = document.querySelectorAll(".checked-item");

checkedItem.forEach((item) => {
  item.addEventListener("change", () => {
    let span = document.createElement("span");
    spanContent = document.createTextNode(item.name);
    span.appendChild(spanContent);
    span.style.cssText = `
    background-color: #ccc;
    padding: 5px 10px;
    border-radius: 6px;
    font-size: 14px;
    width: fit-content;
    margin-right: 5px;
  `;
    choosenItems.appendChild(span);
    item.parentElement.parentElement.remove();
  });
});
/*Top Search Item*/
