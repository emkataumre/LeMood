import { deleteClass, getAllClasses } from "./api.js";
import { userAuthValidation } from "./auth.js";

window.addEventListener("load", async () => {
  const allClasses = await getAllClasses();

  const allClassesElements = allClasses.map((oneClass) => {
    return createClassElement(oneClass);
  });
  document.querySelector(".container").append(...allClassesElements);
});

function createClassElement(oneClass) {
  const p = document.createElement("p");
  p.innerHTML = oneClass.className;
  p.id = oneClass._id;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "delete";
  const updateButton = document.createElement("a");
  updateButton.textContent = "update";
  updateButton.href = "update/?id=" + oneClass.id;

  const div = document.createElement("div");
  p.classList.add("custom-paragraph");
  div.classList.add("custom-div");
  deleteButton.classList.add("custom-button");
  updateButton.classList.add("custom-link");

  div.append(p, deleteButton, updateButton);

  deleteButton.addEventListener("click", async () => {
    const response = await deleteClass(oneClass._id);
    if (response.ok) {
      div.remove();
    }
  });

  return div;
}

// Auth

window.addEventListener("load", async () => {
  const userObject = userAuthValidation();
  let user;
  if (userObject) {
    user = JSON.parse(userObject);
  } else {
    alert("Please login or sign up");
  }
});
