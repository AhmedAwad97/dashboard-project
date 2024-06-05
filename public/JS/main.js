/*Header section*/
/**
 * make a drop menu when clicking on the profile photo or the notification icon in the header section
 */
let profilePic = document.querySelector("#profilePic");
//
// show/hide the profile content when click on the profile icon
//
profilePic.addEventListener("click", () => {
  document.querySelector(".profileContent").classList.toggle("visible");
  document.querySelector(".notificationContent").classList.remove("visible");
});

let notificationIcon = document.querySelector(".notificationIcon");
//
// show/hide the notification content when click on the notification icon
//
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
  //
  //hide the profile content and notification content when click anyway on the page other than profile and notification icon
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
    // in case of the selected row has data attribute with the id of tasks collection in the db
    if (taskId) {
      const endpoint = `/dashboard/${taskId}`;
      // fetch the endpoint and set delete request to server to delete routes it to controller to delete it from db
      fetch(endpoint, { method: "DELETE" })
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            //if the row deleted from db, delete it from html
            icon.closest(".tasks-row").remove();
          } else {
            console.log("Error deleting task");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //remove the selected row in case of the row is static (not saved/retrieved from server)
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
  //fetch the endpoint and send a post request to the backend to handle it through controller and update the db
  fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ postId }),
  })
    .then((response) => response.json())
    .then((result) => {
      //if the backend send success respond, it will send the like counts along with it, use it to update the counter
      if (result.success) {
        const likeCounter = like.nextElementSibling;
        likeCounter.textContent = `${result.likeCount} likes`;
        // if the result is unlike, remove the styling of like, otherwise add like's style
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
    // add the checked item to the schoosen item div and remove it from the checked item div
    choosenItems.appendChild(span);
    item.parentElement.parentElement.remove();
  });
});
/*Top Search Item*/
