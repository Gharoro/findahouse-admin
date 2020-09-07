window.addEventListener("load", async (event) => {
  event.preventDefault();
  const items_row = document.getElementById("user-properties-row");
  const item_card = (item) => {
    return `
    <div class="col-sm-12 col-lg-4 single-card">
      <div class="card admin-card">
        <div class="w3-card-4">
          <img src="${item.property_images[0]}" />
          <div class="w3-container w3-center">
            <h4>${item.title}</h4>
            <p>Current Status: <strong>${item.status}</strong></p>
            <button class="btn reg-btn" onclick="update_status('${item.id}')" >Update Status</button>
            <button class="btn bk-btn">
              <a href="#" onclick="property_selected('${item.id}')">View Bookings </a>
            </button>
            <br />
            <small
              ><a href="#" style="color: red" id="delete"
              onclick="delete_property('${item.id}')"
                >Delete
              </a></small
            >
          </div>
        </div>
      </div>
    </div>
    `;
  };
  try {
    const response = await axios({
      method: "get",
      url: `${BASE_URL}/user_properties`,
      headers: { Authorization: token },
    });

    if (response.data.count === 0) {
      document.getElementById("user-properties-row").style.display = "none";
      document.getElementById("dashboard-sub-heading").innerHTML =
        response.data.message;
    } else {
      const items = response.data.data;
      items_row.innerHTML = `${items.map(item_card).join("")}`;
    }
  } catch (error) {
    console.log("ERROR: ", error.response);
  }
});

const property_selected = (id) => {
  event.preventDefault();
  console.log(id);
  sessionStorage.setItem("property_id", id);
  window.location = "bookings.html";
  return false;
};

const update_status = async (id) => {
  event.preventDefault();
  try {
    const response = await axios({
      method: "put",
      url: `${BASE_URL}/properties/${id}`,
      headers: { Authorization: token },
    });
    toastr.success(response.data.message, { timeOut: 4000 });
  } catch (error) {
    console.log("ERROR: ", error.response);
  }
};

const delete_property = async (id) => {
  event.preventDefault();
  try {
    const response = await axios({
      method: "delete",
      url: `${BASE_URL}/properties/${id}`,
      headers: { Authorization: token },
    });
    toastr.success(response.data.message, { timeOut: 4000 });
  } catch (error) {
    console.log("ERROR: ", error.response);
  }
};
