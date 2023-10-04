const authAPI =
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDcM8SimAZcFBgqffi1XNHDp3ImMd9OWH8";

// For now, it is just a Mock.
// This is the mocked version of the createLogin functionality:

// const mockUserObject = {
//   userId: 1,
//   role: "student",
//   token: "eyASDklnweinlkjsdfljsdflkjsfdflnksdkljn",
// };

// export async function createLogin(email, password, confirm) {
//   // Do something
//   return new Promise((resolve, reject) => {
//     // We Mock some kind of server validation
//     if (password !== confirm) {
//       reject("Passwords don't match");
//     } else {
//       resolve({ ...mockUserObject, email });
//     }
//   });
// }

export async function createLogin(email, password, confirm) {
  const response = fetch(authAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
  });
  return response;
}

export async function login() {
  // Do something
}

export async function logout() {
  // Do something
}

export function userAuthValidation() {
  const userObject = localStorage.getItem("userObject");
  return userObject;
}
