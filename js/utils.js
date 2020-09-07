const token = localStorage.getItem("token");
const BASE_URL = "https://find-a-house-rails-api.herokuapp.com/api/v1";

if (!token) {
  window.location.href = "login.html";
}

const user = localStorage.getItem("user");
document.getElementById("user-name").innerHTML = `Welcome ${user}`;

/** Logout */
const logout = () => {
  localStorage.clear();
  window.location.href = "login.html";
};
