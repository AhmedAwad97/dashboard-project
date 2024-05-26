/*Header section*/
/**
 * make a drop menu when clicking on the profile photo or the notification icon in the header section
 */

// const { post } = require("../../Routes/sideBarRouter/sideBarRouter");
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
const trashcan = document.querySelectorAll(".tasks-row a");
trashcan.forEach((icon) => {
  icon.addEventListener("click", (event) => {
    event.preventDefault();
    const taskId = icon.dataset.doc;

    if (taskId) {
      const endpoint = `/dashboard/${taskId}`;
      fetch(endpoint, { method: "DELETE" })
        .then((response) => response.json())
        .then((result) => {
          window.location.href = result.redirect;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      icon.parentElement.remove();
    }
  });
});

/*Latest task section*/

/*Latest Post Section*/
/*
change the fill color of the like and increament it 
*/

let like = document.querySelector(".react a");
like.addEventListener("click", (event) => {
  event.preventDefault();
  const postId = like.parentElement.parentElement.parentElement.dataset.postId;
  const endpoint = `/dashboard/likes/${postId}`;
  fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ postId }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        const likeCounter = like.nextElementSibling;
        likeCounter.textContent = `${result.likeCount} likes`;
        if (result.unliked) {
          like.querySelector("i").classList.remove("fa-solid");
          like.querySelector("i").classList.remove("liked");
        } else {
          like.querySelector("i").classList.add("fa-solid");
          like.querySelector("i").classList.add("liked");
        }
      } else {
        console.error("Error:", result.error);
      }
    })
    .catch((err) => {
      console.log(err);
    });
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
  commentSection.classList.toggle("hidden");
});

/*increment the comment counter with each comment added */
commentSectionBtn.addEventListener("click", (event) => {
  if (commentSectionInput.value.trim() === "") {
    event.preventDefault();
    commentSectionInput.placeholder = "You cant comment empty comment";
    return;
  }
  commentCounter++;
  comment.nextElementSibling.textContent = commentCounter;
  // commentSectionInput.value = "";
  commentSection.classList.toggle("hidden");
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
