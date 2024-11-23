document.addEventListener("DOMContentLoaded", function () {
    let generatedOTP = '';
    let registeredUsers = {}; // Object to store registered users

    const sendOTPSection = document.getElementById('sendOTPSection');
    const verifyOTPSection = document.getElementById('verifyOTPSection');
    const userDetailsSection = document.getElementById('userDetailsSection');
    const successSection = document.getElementById('successSection');

    const sendOTPForm = document.getElementById('sendOTPForm');
    const verifyOTPForm = document.getElementById('verifyOTPForm');
    const userDetailsForm = document.getElementById('userDetailsForm');
    const loginForm = document.getElementById('loginForm');

    const otpError = document.getElementById('otpError');
    const loginError = document.getElementById('loginError');

    const resendOTPButton = document.getElementById('resendOTP');

    let userEmail = '';  // Store email globally to be used across the flow

    // Function to generate OTP
    function generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
    }

    // Function to show/hide sections
    function showSection(sectionToShow) {
        [sendOTPSection, verifyOTPSection, userDetailsSection, successSection].forEach(section => {
            section.style.display = 'none'; // Hide all sections
        });
        sectionToShow.style.display = 'block'; // Show the desired section
    }

    // Step 1: Send OTP (New User Signup)
    sendOTPForm.addEventListener('submit', function (e) {
        e.preventDefault();
        userEmail = document.getElementById('email').value;
        
        // Generate and "send" OTP
        generatedOTP = generateOTP();
        alert(`OTP sent to ${userEmail}: ${generatedOTP}`);

        showSection(verifyOTPSection); // Move to Verify OTP section
    });

    // Step 2: Verify OTP
    verifyOTPForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const enteredOTP = document.getElementById('otp').value;

        if (enteredOTP === generatedOTP) {
            showSection(userDetailsSection); // Move to User Details form
        } else {
            otpError.textContent = 'Invalid OTP. Please try again.';
        }
    });

    // Resend OTP
    resendOTPButton.addEventListener('click', function () {
        generatedOTP = generateOTP();
        alert(`OTP resent to ${userEmail}: ${generatedOTP}`);
    });

    // Step 3: Register User
    userDetailsForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const mobile = document.getElementById('mobile').value;
        const password = document.getElementById('password').value;

        // Store user info
        registeredUsers[userEmail] = { name, age, mobile, password };

        alert(`User registered successfully with email: ${userEmail}`);
        showSection(successSection); // Show success page
    });

    // Existing User Login
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const userId = document.getElementById('userId').value;
        const password = document.getElementById('password').value;

        if (registeredUsers[userId] && registeredUsers[userId].password === password) {
            alert('Login successful!');
            showSection(successSection); // Show success/home page
        } else {
            loginError.textContent = 'Invalid User ID or Password.'; // Show error
        }
    });
});
