/** add listing */
const add_listing = async (event) => {
  event.preventDefault();
  console.log("Ready to add");

  const listingForm = document.getElementById("listing-form");
  const formData = new FormData(listingForm);

  let bodyFormData = new FormData();
  bodyFormData.append("title", formData.get("title"));
  bodyFormData.append("description", formData.get("description"));
  bodyFormData.append("price", formData.get("price"));
  bodyFormData.append("category", formData.get("category"));
  bodyFormData.append("property_type", formData.get("property_type"));
  bodyFormData.append("size", formData.get("size"));
  bodyFormData.append("location", formData.get("location").toLowerCase());
  bodyFormData.append("property_images[]", formData.get("property_images"));
  try {
    const response = await axios({
      method: "post",
      url: `${BASE_URL}/properties`,
      data: bodyFormData,
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    });
    toastr.success(response.data.message, { timeOut: 4000 });
  } catch (error) {
    console.log("ERROR: ", error.response);
    toastr.error(error.response.data.error);
  }
};
