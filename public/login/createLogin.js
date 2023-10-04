import { createLogin } from "../auth.js";

const form = document.querySelector("#createLoginForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  //Getting the data from the form
  const data = new FormData(form);
  try {
    const response = await createLogin(
      data.get("email"),
      data.get("password"),
      data.get("confirm-password")
    );
    console.log(response);
    const body = await response.json;
    console.log(body);
    localStorage.setItem("userObject", JSON.stringify(response));
    console.log(response);
    if (response.ok === false) {
      alert("failed");
    }
    //window.location.href = "/";
  } catch (error) {
    console.log("there has been an error", error);
  }
});
