const property_id = sessionStorage.getItem("property_id");

const table_body = document.getElementById("table-body");
const table_rows = (client) => {
  return `
    <tr>
        <td>${client.name}</td>
        <td>${client.email}</td>
        <td>${client.subject}</td>
        <td>${client.message}</td>
        <td><button class="btn bk-btn">Approve</button></td>
        <td><button class="btn reg-btn">Decline</button></td>
    </tr>
    `;
};

window.addEventListener("load", async (event) => {
  event.preventDefault();
  try {
    const response = await axios({
      method: "get",
      url: `${BASE_URL}/bookings/${property_id}`,
      headers: { Authorization: token },
    });
    console.log(response.data);
    if (response.data.count === 0) {
      document.getElementById("bookings-table").style.display = "none";
      document.getElementById(
        "bookings-sub-heading"
      ).innerHTML = `${response.data.message}.`;
    } else {
      const clients = response.data.data;
      console.log(clients);
      table_body.innerHTML = `${clients.map(table_rows).join("")}`;
    }
  } catch (error) {
    console.log("ERROR: ", error.response);
  }
});
