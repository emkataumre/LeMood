import { BASE_URL } from "./api.js";
import { postForm } from "./api.js";

const createButton = document.querySelector("#createClass");
export const form = document.querySelector("#createClassForm");

export function getFormData() {
  const formData = new FormData(form);
  const valuesObj = {};
  for (const [key, value] of formData.entries()) {
    valuesObj[key] = value;
  }
  return valuesObj;
}

if (document.querySelector("#createClassForm")) {
  createButton.addEventListener("click", postForm);
}
