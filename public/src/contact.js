// Submit button behavior
export function attachSubmitListener() {
    document.getElementById("contact-form").addEventListener("submit", submitContactForm);
}

// Get value from given input element
function readInputById(id){
    return document.getElementById(id).value;
}

// Submit contact form
function submitContactForm(e){
    e.preventDefault();

    // Get values
    let name = readInputById("contact-name");
    let email = readInputById("contact-email");
    let message = readInputById("contact-msg");

    console.log(name);
    console.log(email);
    console.log(message);
}

