// "DOMContentLoaded" Makes sure all the HTML has loaded on the screen before JavaScript is applied
window.addEventListener("DOMContentLoaded", (event) => {
  
  const fulfilledOrders = document.querySelectorAll(".fulfilledOrder");

  for (let i = 0; i < fulfilledOrders.length; i++) {
          fulfilledOrders[i].addEventListener("click", () => {
          
          fetch("/orderConfirmation/dashboard/" + fulfilledOrders[i].dataset.id, {
            method: "DELETE",
          }).then((response) => {
        
          if (response.ok) {
            window.location.href = "/orderConfirmation/dashboard";
          } else {
            window.location.href = "/500.html";
          }
        })
        .catch((error) => console.error(error));
    });
  }

  

  
})
