const BASE_URL = "https://find-a-house-rails-api.herokuapp.com/api/v1";
const token = localStorage.getItem("token");

if (token) {
  window.location.href = "index.html";
}

/** Register User */
const register_user = async (event) => {
  event.preventDefault();
  const registerForm = document.getElementById("register-form");
  const formData = new FormData(registerForm);

  let bodyFormData = new FormData();
  bodyFormData.append("name", formData.get("name"));
  bodyFormData.append("email", formData.get("email"));
  bodyFormData.append("password", formData.get("password"));
  bodyFormData.append(
    "password_confirmation",
    formData.get("password_confirmation")
  );
  bodyFormData.append("office_address", formData.get("office_address"));
  bodyFormData.append("phone_number", formData.get("phone_number"));
  bodyFormData.append("profile_picture", formData.get("profile_picture"));
  try {
    const response = await axios({
      method: "post",
      url: `${BASE_URL}/users`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response.data);

    toastr.success(response.data.message, { timeOut: 5000 });
    setTimeout(function () {
      window.location.href = "login.html";
    }, 5000);
  } catch (error) {
    console.log("ERROR: ", error.response.data.errors);
    toastr.error("Please fill all fields");
  }
};

/** Login User */
const login_user = async (event) => {
  event.preventDefault();
  const loginForm = document.getElementById("login-form");
  const formData = new FormData(loginForm);

  let bodyFormData = new FormData();
  bodyFormData.append("email", formData.get("email"));
  bodyFormData.append("password", formData.get("password"));

  try {
    const response = await axios({
      method: "post",
      url: `${BASE_URL}/users/login`,
      data: bodyFormData,
      headers: { "Content-Type": "application/json" },
    });
    toastr.success(response.data.message, { timeOut: 3000 });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", response.data.user);
    setTimeout(function () {
      window.location.href = "index.html";
    }, 3000);
  } catch (error) {
    console.log("ERROR: ", error.response.data);
    toastr.error(error.response.data.error);
  }
};
