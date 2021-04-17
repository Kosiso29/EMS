var modalShop = document.getElementById("ModalShop"); // Get the cart modal HTML element
var modalPayment = document.getElementById("ModalPayment"); // Get the payment modal HTML element
var header = document.getElementById("Header"); // Get the Intro page HTML element
var modalBackdrop = document.querySelector(".backdrop"); // Get the backdrop HTML element
var totalPrice = document.getElementById("TotalPrice"); // Get the total price HTML
var outputName = document.getElementById("OutputName"); // Get the payment output name HTML element
var tbodyEl = document.querySelector("tbody"); // Get the cart modal table body HTML element
var tbodyPayment = document.getElementById("Tbody"); // Get the payment modal table body HTML element
var buttonCart = document.querySelector("button"); // Get the cart button HTML element
var tableCount = 0; // Declaration and Initialization of the serial number variable
var inputError = false; // Declaration and Initialization of the error variable for the input elements

// This function displays the cart
var displayModal = () => {
    !modalShop.classList.contains("active") ? modalShop.classList.add("active") : modalShop.classList.remove("active"); // If cart is closed, Open it
    modalShop.classList.contains("active") ? modalBackdrop.style.display = "block" : modalBackdrop.style.display = "none"; // If cart is open, Close it
    caclculateItems(); // Calculate the total price of items in the table
}
//This function displays the Checkout modal after payment
var displayModalPayment = () => {
    !modalPayment.classList.contains("active") ? modalPayment.classList.add("active") : modalPayment.classList.remove("active"); // If payment modal is closed, Open it
    modalPayment.classList.contains("active") ? modalBackdrop.style.display = "block" : modalBackdrop.style.display = "none"; // If payment modal is open, Close it
    if (!modalPayment.classList.contains("active")) {
        location.reload(); // If cart is closed, reload the page
    }
    outputName.innerHTML = document.getElementById("Name").value; // Add the name of the customer to the payment modal display
    tbodyPayment.innerHTML = tbodyEl.innerHTML; // Set the table in the payment modal to be the same as the listed items in the cart
    for (let i = 0; i < tbodyPayment.children.length; i++){ // Loop through all the items in the table of the payment modal
        tbodyPayment.children[i].children[4].remove(); // Remove the "remove" button
        tbodyPayment.children[i].children[3].children[2].remove(); // Remove the increment button
        tbodyPayment.children[i].children[3].children[0].remove(); // Remove the decrement button
        tbodyPayment.children[i].children[2].remove(); // Remove the price
    }
}
//This function calculate the total price of the items in the cart
var caclculateItems = () => {
    var total = 0; // Declaration and Initialization of the total variable
    for (let i = 0; i < tbodyEl.children.length; i++) { // Loop through the items in the cart
        var price = Number(tbodyEl.children[i].children[2].innerHTML.replace(/₦/, "")); // Get each item's price
        var qty = Number(tbodyEl.children[i].children[3].children[1].innerHTML); // Get each item's quantity
        total += price * qty; // Calculate each and update the total variable
    }
    totalPrice.innerHTML = total; // Update the HTML total with the total variable after looping through all items
}
// This function is the eventHandler method for increment decrement and removal of an item in the cart
var adjustQty = (e) => {
    var tdEl; // Declaration of the variable for the table data element of quantity
    var btn = e.target; // Store the event target in a variable
    if (btn.classList.contains("decrement")) { // If target is from the decrement button
        if (btn.nextSibling.innerHTML == 1) { // Check if it is at the minimum value
            alert("You cannot have less than 1 item. If you wish to remove the item click remove"); // Alert the User that it is at it's minimum
            return; // Exit the function
        } else { // Else if it is not at the minimum value
            var price = Number(btn.closest("tr").children[2].innerHTML.replace(/₦/, "")); // Store the target price in a variable
            tdEl = btn.nextSibling.innerHTML; // Get the current quantity
            var originalPrice = price / tdEl; // Calculate the standard price of the item
            tdEl--; // Perform the required decrement of the quantity
            btn.nextSibling.innerHTML = tdEl; // Update the decremented quantity
            btn.closest("tr").children[2].innerHTML = "₦" + originalPrice * tdEl; // Update the quantity price
        }
    } else if (btn.classList.contains("increment")) { // If target is from the increment button
        var price = Number(btn.closest("tr").children[2].innerHTML.replace(/₦/, "")); // Store the target price in a variable
        tdEl = btn.previousSibling.innerHTML; // Get the current quantity
        var originalPrice = price / tdEl; // Calculate the standard price of the item
        tdEl++; // Perform the required increment of the quantity
        btn.previousSibling.innerHTML = tdEl; // Update the incremented quantity
        btn.closest("tr").children[2].innerHTML = "₦" + originalPrice * tdEl; // Update the quantity price
    } else if (btn.classList.contains("remove")) { // If target is from the remove button
        btn.closest("tr").remove(); // Remove the target item
        buttonCart.innerHTML = document.querySelector("tbody").children.length; // Update the number on the cart button
        document.getElementById(btn.id.toLowerCase()).innerHTML = "ADD TO CART"; // Update the shop button
        document.getElementById(btn.id.toLowerCase()).classList.remove("button"); // Update the appearance of the shop button
    } else { // If target is not from any of the buttons
        return; // Exit the function
    }
    caclculateItems(); // Calculate the total price of items in the table
}

tbodyEl.addEventListener("click", adjustQty); // Set an event listener for a click on the cart table items
// This function adds/removes an item to the cart
var addItem = (input) => {
    if (input.innerHTML === "ADD TO CART") { // If item is not added
        tableCount++; // Increase the serial number
        tbodyEl.innerHTML += `
            <tr>
                <td>${tableCount}</td>
                <td>${input.previousElementSibling.innerHTML}</td>
                <td>${input.previousElementSibling.previousElementSibling.children[2].innerHTML.replace(/,/, "")}</td>
                <td><button class="decrement">-</button><span>1</span><button class="increment">+</button></td>
                <td><button id="${input.previousElementSibling.innerHTML.toUpperCase().replace(/ /g,'')}" class="remove">Remove</button></td>
            </tr>
        `; // Populate the item details in a table
        input.innerHTML = "REMOVE FROM CART"; // Update the shop button
        input.classList.add("button"); // Update the appearance of the shop button
        buttonCart.innerHTML = document.querySelector("tbody").children.length; // Update the number on the cart button
    } else { // If item is already added
        document.getElementById(input.id.toUpperCase()).closest("tr").remove(); // remove the item from the cart
        input.innerHTML = "ADD TO CART"; // Update the shop button
        input.classList.remove("button"); // Update the appearance of the shop button
        buttonCart.innerHTML = document.querySelector("tbody").children.length; // Update the number on the cart button
    }
}
// This function checks for errors in the "name" input element
var nameInput = (input) => {
    if (input.value === "") { // If there's no name
        input.nextElementSibling.style.display = "block"; // Display the error
        input.classList.add("input"); // Update the appearance of the input element
        inputError = true; // Update validity
    } else { // If there's a name
        input.nextElementSibling.style.display = "none"; // Don't display the error
        input.classList.remove("input"); // Update the appearance of the input element
        inputError = false; // Update validity
    }
}
// This function checks for errors in the "email" input element
var emailInput = (input) => {
    inputError = true; // Update validity
    const validity = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(input.value).toLowerCase()); // Set email validation format
    if (input.value === "") { // If there's no email
        input.nextElementSibling.style.display = "block"; // Display the error
        input.classList.add("input"); // Update the appearance of the input element
    } else { // If there's an email
        if (!validity) { // If it doesn't match the validation format
            input.nextElementSibling.innerHTML = "Invalid email"; // Set the error type
            input.nextElementSibling.style.display = "block"; // Display the error
            input.classList.add("input"); // Update the appearance of the input element
        } else { // If it matches the validation format
            input.nextElementSibling.style.display = "none"; // Don't display the error
            input.classList.remove("input"); // Update the appearance of the input element
            inputError = false; // Update validity
        }
    }
}
// This function checks for errors in the "phone number" input element
var phoneInput = (input) => {
    inputError = true; // Update validity
    if (input.value === "") { // If there's no phone number
        input.nextElementSibling.style.display = "block"; // Display the error
        input.classList.add("input"); // Update the appearance of the input element
    } else { // If there's a phone number
        if (/\D/.test(input.value)) { // If it doesn't match the validation format
            input.nextElementSibling.innerHTML = "Phone number can only be numbers"; // Set the error type
            input.nextElementSibling.style.display = "block"; // Display the error
            input.classList.add("input"); // Update the appearance of the input element
            return; // Exit the function
        }
        if (input.value.length < 11) { // If it isn't long enough
            input.nextElementSibling.innerHTML = "Your telephone number cannot be less than 11 characters" // Set the error type
            input.nextElementSibling.style.display = "block"; // Display the error
            input.classList.add("input"); // Update the appearance of the input element
        } else { // If it matches the validation format
            input.nextElementSibling.style.display = "none"; // Don't display the error
            input.classList.remove("input"); // Update the appearance of the input element
            inputError = false; // Update validity
        }
    }
}
// This is the Paystack checkout function
function payWithPaystack() {
    displayModal(); // Close the displayed cart modal
    if (tbodyEl.children.length === 0) { // If there's no item in the cart
        alert("Kindly select an item to checkout"); // Indicate to the user that to add items before checkout
        return; // Exit the function
    }
    if (inputError || document.getElementById("Name").value === "" || document.getElementById("Email").value === "" || document.getElementById("PhoneNumber").value === "") { // If input fails validation
        alert("Kindly fill in the correct details"); // Indicate to the user to update input before checkout
        return; // Exit the function
    }
    let handler = PaystackPop.setup({
      key: 'pk_test_ece0c2b607f6c75ef67324f6b1af9a8f42d1a4b0', // Replace with your public key
      email: document.getElementById("Email").value, // Get the input email
      amount: document.getElementById("TotalPrice").innerHTML * 100, // Get the total shopping price
      ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      // label: "Optional string that replaces customer email"
      onClose: function(){
        alert('Window closed.'); // Alert for Paystack modal closure
      },
      callback: function(){
        displayModalPayment(); // Display the payment modal
      }
    });
    handler.openIframe(); // Open Paystack payment modal
}
// This function creates a smooth flow to the page sections 
document.querySelectorAll('a[href^="#"]').forEach(anchor => { // Get all the anchor tags pointing to a section
    anchor.addEventListener('click', function (e) { // Set an event listener for a click on the anchor tag
        e.preventDefault(); // Prevent default actions on the action tag

        document.querySelector(this.getAttribute('href')).scrollIntoView({ // Get the href attribute
            behavior: 'smooth' // Set the scroll to smooth
        });
    });
});