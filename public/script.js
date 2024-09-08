
// "DOMContentLoaded" Makes sure all the HTML has loaded on the screen before JavaScript is applied
window.addEventListener("DOMContentLoaded", (event) => {
  //Query selctors for the payment options on the order page
  //Cashapp Pay
  var payment1 = document.querySelector("#payment1");
  console.log(payment1);
  //In-Person pay
  var payment2 = document.querySelector("#payment2");
  console.log(payment2);
  //Ordr button displays once the user toggles either radio buttons
  var orderButton = document.getElementById("orderButton");
  console.log(orderButton);


  

  //Cashapp qr code and button appears when the user clicks on the "Cashapp" radio button
  payment1.addEventListener("click",  (e) => {
    orderButton.innerHTML =
      "<center><img style='border-radius:7px !important; animation: 0.7s ease-out 0s 1 fadeIn;' src='https://cash.app/qr/$Toureparker?size=288&margin=0'><br><br><p style='font-size:30px !important; animation: 0.5s ease-out 0s 1 fadeIn;'>$Toureparker</p><br><button type='submit'  id='rsvp' class='btn btn-primary w-100 mt-2' style='animation: 0.5s ease-out 0s 1 fadeIn;'>Place Order</button></center>";

    console.log(orderButton);
  });

   //Just a button appears when the user clicks on the "In-person" radio button
  payment2.addEventListener("click", (e) => {
    orderButton.innerHTML =
      "<button type='submit'  id='rsvp' class='btn btn-primary w-100 mt-2' style='animation: 0.5s ease-out 0s 1 fadeIn;'>Place Order</button>";
    console.log(orderButton);
  });

  


  

  

  });
