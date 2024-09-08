// "DOMContentLoaded" Makes sure all the HTML has loaded on the screen before JavaScript is applied
window.addEventListener("DOMContentLoaded", (event) => {
  //Allows the delete button, that is applied to all menu items, on the "editMenu" page to access that item and remove it. Will then refresh the page
  const deleteButtons = document.querySelectorAll(".deleteButton");

  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", () => {
      console.log("delete button");
      fetch("/menu/editMenu/" + deleteButtons[i].dataset.id, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            window.location.href = "/menu/editMenu";
          } else {
            window.location.href = "/500.html";
          }
        })
        .catch((error) => console.error(error));
    });
  }
  // After Toure fills out the update form then clicks the the update button, that is applied to all menu items on the "editMenu" page, it will access that item and update the info for that item. Will then refresh the page
  const updateForms = document.querySelectorAll(".updateForm");

  for (let i = 0; i < updateForms.length; i++) {
    updateForms[i].addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(updateForms[i]);
      const data = Object.fromEntries(formData.entries());

      fetch("/menu/editMenu/" + updateForms[i].dataset.id, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => {
          if (response.ok) {
            location.href = "/menu/editMenu";
          } else {
            window.location.href = "/500.html";
          }
        })
        .catch((error) => console.error(error));
    });
  }

  // After Toure fills out the add item form then clicks the the submit button. It will add that item to the database that lists all the menu item. Will then direct the page to "editMenu"
  const form = document.querySelector("#addItem");
  form
    .addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      let data = Object.fromEntries(formData.entries());

      fetch("/menu", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => {
      console.log("response is okay");
      if (response.ok) {
        location.href = "/menu/editMenu";
      } else {
        window.location.href = "/500.html";
      }
    })
    .catch((error) => console.error(error));
    })



  
})
