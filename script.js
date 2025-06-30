// Show the popup when the page loads
window.onload = function() {
    if (!localStorage.getItem('isLoggedIn')) {
        setTimeout(function() {
            document.getElementById("welcomePopup").style.display = "flex";
        }, 1000);
    } else {
        document.getElementById("mainContent").style.display = "block";
    }
};

// Close the welcome popup and show the main content
function closePopup() {
    document.getElementById("welcomePopup").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
}

// Show the login modal
function showLogin() {
    document.getElementById("loginModal").style.display = "flex";
}

// Close the login modal
function closeLoginModal() {
    document.getElementById("loginModal").style.display = "none";
}

// Show the sign-up modal
function showSignUp() {
    document.getElementById("signUpModal").style.display = "flex";
}

// Close the sign-up modal
function closeSignUpModal() {
    document.getElementById("signUpModal").style.display = "none";
}

// Validate login credentials
function validateLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const errorMessage = document.getElementById("loginError");

    // Check if email and password exist in localStorage
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    
    if (email === storedEmail && password === storedPassword) {
        alert("Login successful!");
        localStorage.setItem('isLoggedIn', true); // Save login state
        closeLoginModal();
        // Redirect to the dashboard.html page
        window.location.href = "dashboard.html";
    } else {
        errorMessage.style.display = "block";
    }
}

// Handle Sign Up
function handleSignUp(event) {
    event.preventDefault();
    
    const email = document.getElementById("signUpEmail").value;
    const password = document.getElementById("signUpPassword").value;
    const signUpError = document.getElementById("signUpError");
    
    // Check if email already exists
    if (localStorage.getItem('email') === email) {
        signUpError.style.display = "block";
    } else {
        // Store email and password in localStorage
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        alert("Sign up successful! You can now log in.");
        closeSignUpModal();
    }
}

// Show feature detail modal
function showFeatureDetail(title, description) {
    document.getElementById("featureTitle").textContent = title;
    document.getElementById("featureDescription").textContent = description;
    document.getElementById("featureModal").style.display = "flex";
}

// Close feature detail modal
function closeFeatureModal() {
    document.getElementById("featureModal").style.display = "none";
}


// Image slideshow logic
const images = [
    "./assets1/1.jpg",
    "./assets1/2.jpg",
    "./assets1/3.jpg",
    "./assets1/4.jpg",
    "./assets1/5.jpg",
    "./assets1/6.jpg",
];

let currentIndex = 0;
const slideshowImage = document.getElementById("slideshowImage");

function changeImage() {
    currentIndex = (currentIndex + 1) % images.length; // Loop through images
    slideshowImage.src = images[currentIndex];
}

// Change image every 2 seconds
setInterval(changeImage, 2000);