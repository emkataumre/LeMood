import { getFormData } from "./form.js";
import { form } from "./form.js";
export const BASE_URL = "http://localhost:4000/";

function toArray(apibody) {
  const keys = Object.keys(apibody);
  const transformed = keys.map((key) => {
    const obj = apibody[key];
    obj.id = key;
    return obj;
  });
  return transformed;
}

export async function postForm(event) {
  event.preventDefault();
  const formData = getFormData();
  const response = await fetch(`${BASE_URL}classes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  form.reset();
  window.location.href = "/";
}

export async function getAllClasses() {
  const response = await fetch(`${BASE_URL}classes`);
  const body = await response.json();
  return toArray(body);
}

export async function deleteClass(id) {
  const endpoint = BASE_URL + "classes/" + id;
  const response = await fetch(endpoint, {
    method: "DELETE",
  });
  return response;
}

export async function getOneClass(id) {
  const response = await fetch(BASE_URL + "classes/" + id);
  const body = await response.json();
  return body;
}
