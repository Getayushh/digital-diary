// Global Variables
let userProfile = {
    name: "Hello",
    avatar: "image.jpg"
};

// Functions to manage the sidebar sections
function showSection(sectionId) {
    const sections = document.querySelectorAll(".section");
    sections.forEach((section) => {
        section.classList.remove("active");
    });
    document.getElementById(sectionId).classList.add("active");
}


function analyzeMood() {
    const diaryText = document.getElementById("diaryEntry").value.toLowerCase(); // Get diary entry text
    const moodResult = document.getElementById("moodResult"); // Mood tracker display
    const moodFeedback = document.getElementById("moodFeedback"); // Optional detailed feedback
    const timestamp = new Date().toLocaleString();

    // Arrays of happy and sad keywords
    const happyWords = ["happy","wonderful" ,"joy", "excited", "grateful", "content", "love", "pleased", "amazing", "great", "fantastic", "cheerful"];
    const sadWords = ["sad", "upset", "angry", "disappointment","disappointed","frustration" ,"depressed", "miserable", "heartbroken", "lonely", "frustrated", "unhappy", "melancholy"];

    // Determine mood
    let mood = "Neutral";

    if (happyWords.some(word => diaryText.includes(word))) {
        mood = "😊 Happy";
    } else if (sadWords.some(word => diaryText.includes(word))) {
        mood = "😞 Sad";
    }

    // Update the mood display
    moodResult.innerText = `Mood: ${mood}`;
    if (moodFeedback) moodFeedback.innerText = `Detailed Mood: ${mood}`;

    // Update timestamp if the timestamp display is present
    const timestampElement = document.getElementById("diaryTimestamp");
    if (timestampElement) {
        timestampElement.innerText = `Last Entry: ${timestamp}`;
    }
}
// Fitness Tracker Calculations
// Fitness Tracker Calculations
function calculateFitness() {
    // Get the values from the form inputs
    const steps = parseInt(document.getElementById("steps").value) || 0;
    const sleep = parseInt(document.getElementById("sleep").value) || 0;
    const fitnessFeedback = document.getElementById("fitnessFeedback");

    // Get user-specific data from the form fields
    const age = parseInt(document.getElementById("age").value);
    const bloodPressure = document.getElementById("bloodPressure").value;
    const height = parseFloat(document.getElementById("height").value);
    const weight = parseFloat(document.getElementById("weight").value);

    // Check if all fields are filled in
    if (isNaN(age) || !bloodPressure || isNaN(height) || isNaN(weight)) {
        fitnessFeedback.innerText = "Please fill out all fields.";
        return;
    }

    // Determine recommended steps and sleep based on age group
    let recommendedSteps = 0;
    let recommendedSleep = 0;

    if (age < 18) {
        recommendedSteps = 12000; // For children and teens
        recommendedSleep = 8; // 8-10 hours of sleep
    } else if (age >= 18 && age <= 64) {
        recommendedSteps = 10000; // For adults
        recommendedSleep = 7; // 7-9 hours of sleep
    } else {
        recommendedSteps = 8000; // For older adults
        recommendedSleep = 7; // 7-8 hours of sleep
    }

    // Calculate fitness factor (based on steps and sleep)
    const fitnessFactor = (steps / 1000) + (sleep / 8);

    // Calculate the difference from recommended steps and sleep
    const stepsDifference = recommendedSteps - steps;
    const sleepDifference = recommendedSleep - sleep;

    // BMI Calculation
    const bmi = (weight / ((height / 100) ** 2)).toFixed(1); // BMI = weight (kg) / height (m)^2
    let bmiStatus = '';
    if (bmi < 18.5) {
        bmiStatus = 'underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        bmiStatus = 'normal weight';
    } else if (bmi >= 25 && bmi < 29.9) {
        bmiStatus = 'overweight';
    } else {
        bmiStatus = 'obese';
    }

    // Blood Pressure Interpretation
    const bp = bloodPressure.split('/');
    if (bp.length !== 2) {
        fitnessFeedback.innerText = "Please enter your blood pressure in the correct format (e.g., 120/80).";
        return;
    }
    const systolic = parseInt(bp[0]);
    const diastolic = parseInt(bp[1]);
    let bpStatus = '';
    if (systolic < 120 && diastolic < 80) {
        bpStatus = 'normal';
    } else if (systolic < 130 && diastolic < 80) {
        bpStatus = 'elevated';
    } else if (systolic < 140 || diastolic < 90) {
        bpStatus = 'high blood pressure (stage 1)';
    } else {
        bpStatus = 'high blood pressure (stage 2)';
    }

    // Generate feedback for the user
    let feedback = `Fitness Factor: ${fitnessFactor.toFixed(2)}\n\n`;

    // Feedback based on steps
    feedback += `You have walked ${steps} steps. `;
    feedback += stepsDifference > 0
        ? `You need to walk ${stepsDifference} more steps to meet the recommended ${recommendedSteps} steps for your age group. `
        : `Great job! You've met the recommended ${recommendedSteps} steps for your age group.`;

    // Feedback based on sleep
    feedback += `\n\nYou are sleeping ${sleep} hours. `;
    feedback += sleepDifference > 0
        ? `You need ${sleepDifference} more hours of sleep to reach the recommended ${recommendedSleep} hours. `
        : `Your sleep is on track with the recommended ${recommendedSleep} hours for your age group.`;

    // Feedback based on BMI
    feedback += `\n\nYour BMI is ${bmi} and you are considered ${bmiStatus}. `;
    feedback += `It's important to maintain a healthy weight for your overall health.`;

    // Feedback based on blood pressure
    feedback += `\n\nYour blood pressure is ${bloodPressure}, which is considered ${bpStatus}. `;
    feedback += `Please monitor your blood pressure regularly and consult a healthcare provider if necessary.`;

    // Display the feedback in the fitness section
    fitnessFeedback.innerText = feedback;
}

function logAchievement() {
    const achievementText = prompt("Enter your achievement:");
    if (achievementText) {
        const achievementList = document.getElementById("achievementProgress");
        const achievementItem = document.createElement("p");
        achievementItem.innerText = `🎉 ${achievementText}`; // Use backticks for template literals
        achievementList.appendChild(achievementItem);
    }
}
// Reflection - View Past Entries
function viewPastEntries() {
    const pastEntries = localStorage.getItem("diaryEntry");
    const reflectionList = document.getElementById("reflectionList");
    reflectionList.innerText = pastEntries ? pastEntries : "No entries saved yet.";
}



// Initialize goals from localStorage
document.addEventListener("DOMContentLoaded", loadGoals);
function addGoal() {
    const goalInput = document.getElementById("goalInput").value.trim();
    const priority = document.getElementById("prioritySelect").value;

    if (goalInput) {
        // Add goal object to localStorage
        const storedGoals = JSON.parse(localStorage.getItem("goals")) || [];
        storedGoals.push({ text: goalInput, priority, completed: false });
        localStorage.setItem("goals", JSON.stringify(storedGoals));

        // Clear input and reload the goals
        document.getElementById("goalInput").value = "";
        loadGoals();
    }
}
function loadGoals() {
    const storedGoals = JSON.parse(localStorage.getItem("goals")) || [];
    const goalList = document.getElementById("goalList");

    // Clear existing list
    goalList.innerHTML = "";

    // Sort goals by priority
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    storedGoals.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

    // Display sorted goals
    storedGoals.forEach(({ text, priority, completed }, index) => {
        const goalItem = document.createElement("li");
        goalItem.className = `goal-item ${priority.toLowerCase()}`;

        const goalText = document.createElement("span");
        goalText.innerText = `${text} (${priority})`;
        if (completed) {
            goalText.style.textDecoration = "line-through";
        }

        const completeCheckbox = document.createElement("input");
        completeCheckbox.type = "checkbox";
        completeCheckbox.className = "complete-checkbox";
        completeCheckbox.checked = completed;
        completeCheckbox.addEventListener("change", function () {
            storedGoals[index].completed = this.checked;
            localStorage.setItem("goals", JSON.stringify(storedGoals));
            loadGoals();
        });

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "❌";
        deleteButton.className = "delete-button";
        deleteButton.addEventListener("click", function () {
            storedGoals.splice(index, 1);
            localStorage.setItem("goals", JSON.stringify(storedGoals));
            loadGoals();
        });

        goalItem.appendChild(completeCheckbox);
        goalItem.appendChild(goalText);
        goalItem.appendChild(deleteButton);
        goalList.appendChild(goalItem);
    });
}
// Function to update the Progress Overview section
function updateProgressOverview() {
    // Display the user's name and avatar from profile
    const userName = localStorage.getItem("displayName") || "John Doe";
    document.getElementById("userNameOutput").innerText = userName;
    document.getElementById("profilePic").src = localStorage.getItem("avatar") || "default-avatar.png";

    // Display saved achievements
    const achievements = JSON.parse(localStorage.getItem("achievements")) || [];
    const achievementList = document.getElementById("achievementList");
    achievementList.innerHTML = "";
    achievements.forEach(achievement => {
        const achievementItem = document.createElement("p");
        achievementItem.innerText = `🎉 ${achievement}`;
        achievementList.appendChild(achievementItem);
    });

   // Display saved goals
   const goals = JSON.parse(localStorage.getItem("goals")) || [];
   const goalList = document.getElementById("goalList");
   goalList.innerHTML = "";
   goals.forEach(goal => {
       const goalItem = document.createElement("li");
       goalItem.innerText = goal;
       goalList.appendChild(goalItem);
   });


    // Display saved mood
    const mood = localStorage.getItem("mood") || "Neutral";
    const moodResult = document.getElementById("moodResult");
    moodResult.innerText = `Mood: ${mood}`;
    const moodFeedback = document.getElementById("moodFeedback");
    moodFeedback.innerText = `Detailed Mood: ${mood}`;

    // Display fitness progress
    const fitnessScore = localStorage.getItem("fitnessScore") || 0;
    const fitnessFeedback = document.getElementById("fitnessFeedback");
    fitnessFeedback.innerText = `Fitness Factor: ${fitnessScore}`;

    // Display text settings (size, color, background)
    const textSize = localStorage.getItem("textSize") || "13px";
    const textColor = localStorage.getItem("textColor") || "#000000";
    const backgroundColor = localStorage.getItem("backgroundColor") || "#FFFFFF";
    document.getElementById("currentTextSize").innerText = textSize;
    document.getElementById("currentTextColor").innerText = textColor;
    document.getElementById("currentBackgroundColor").innerText = backgroundColor;
}

// Function to update saved achievements (called when logging achievements)
function saveAchievement(achievementText) {
    if (!achievementText || achievementText.trim() === "") {
        alert("Achievement cannot be empty!");
        return;
    }
    
    let achievements = JSON.parse(localStorage.getItem("achievements")) || [];
    const now = new Date();
    const newAchievement = {
        text: achievementText.trim(),
        date: now.toLocaleDateString(),
        day: now.toLocaleDateString('en-US', { weekday: 'long' }),
    };
    achievements.push(newAchievement);
    localStorage.setItem("achievements", JSON.stringify(achievements));
    updateProgressOverview();
}

function updateProgressOverview() {
    const achievements = JSON.parse(localStorage.getItem("achievements")) || [];
    const tableBody = document.getElementById("achievementTableBody");
    tableBody.innerHTML = ""; // Clear existing rows

    achievements.forEach((achievement, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${achievement.text}</td>
            <td>${achievement.date}</td>
            <td>${achievement.day}</td>
        `;
        tableBody.appendChild(row);
    });
}

function clearAchievements() {
    if (confirm("Are you sure you want to clear all achievements?")) {
        localStorage.removeItem("achievements");
        updateProgressOverview();
    }
}

function logAchievement() {
    const achievement = prompt("Enter your achievement:");
    if (achievement) {
        saveAchievement(achievement);
    }
}

// Load achievements when the page loads
document.addEventListener("DOMContentLoaded", updateProgressOverview);


// Function to update saved goals (called when adding goals)
function saveGoal(goalText) {
    let goals = JSON.parse(localStorage.getItem("goals")) || [];
    goals.push(goalText);
    localStorage.setItem("goals", JSON.stringify(goals));
    updateProgressOverview();
}

// Function to update mood (called when analyzing mood)
function saveMood(moodText) {
    localStorage.setItem("mood", moodText);
    updateProgressOverview();
}

// Function to update fitness score (called when calculating fitness)
function saveFitnessScore(fitnessScore) {
    localStorage.setItem("fitnessScore", fitnessScore);
    updateProgressOverview();
}

// Function to save other settings (called when saving settings)
function saveSettings() {
    const displayName = document.getElementById("displayName").value;
    const textSize = document.getElementById("textSize").value;
    const textColor = document.getElementById("textColor").value;
    const backgroundColor = document.getElementById("backgroundColor").value;

    localStorage.setItem("displayName", displayName);
    localStorage.setItem("textSize", textSize);
    localStorage.setItem("textColor", textColor);
    localStorage.setItem("backgroundColor", backgroundColor);

    alert("Settings Saved!");
    updateProgressOverview();
}

// Function to apply the settings when the page is loaded
window.onload = function() {
    updateProgressOverview();
};

// Social Sharing (simulated)
function showInstagramShare() {
    const instagramLink = document.getElementById("instagramLink");
    const socialStatus = document.getElementById("socialStatus");

    // Show the Instagram link
    instagramLink.style.display = "block";

    // Redirect the user to Instagram login directly when they click the link
    const instagramLogin = document.getElementById("instagramLogin");

    // When the link is clicked, show the progress shared message
    instagramLogin.addEventListener("click", function(event) {
        socialStatus.innerText = "Progress shared on Instagram!";
    });
}

function showXShare() {
    const xLink = document.getElementById("xLink");
    const socialStatus = document.getElementById("socialStatus");

    // Show the X link
    xLink.style.display = "block";

    // Redirect the user to X login directly when they click the link
    const xLogin = document.getElementById("xLogin");

    // When the link is clicked, show the progress shared message
    xLogin.addEventListener("click", function(event) {
        socialStatus.innerText = "Progress shared on X!";
    });
}



// User Profile and Settings
function openSettings() {
    showSection('settings');
}

function changeProfilePic() {
    const newAvatar = prompt("Enter the new avatar URL:");
    if (newAvatar) {
        document.getElementById("profilePic").src = newAvatar;
    }
}

// Function to show/hide text customization options
function toggleTextOptions() {
    const displayName = document.getElementById("displayName").value;
    
    // If a display name is entered, show all customization sections
    if (displayName.trim() !== "") {
        document.getElementById("textSizeSection").style.display = "block";
        document.getElementById("textColorSection").style.display = "block";
        document.getElementById("backgroundColorSection").style.display = "block";
        document.getElementById("fontStyleSection").style.display = "block";
        document.getElementById("themeSection").style.display = "block";
    } else {
        // Otherwise, hide the customization sections
        document.getElementById("textSizeSection").style.display = "none";
        document.getElementById("textColorSection").style.display = "none";
        document.getElementById("backgroundColorSection").style.display = "none";
        document.getElementById("fontStyleSection").style.display = "none";
        document.getElementById("themeSection").style.display = "none";
    }
}

// Update text size dynamically
function updateTextSize() {
    const textSize = document.getElementById("textSize").value;
    document.body.style.fontSize = textSize + "px";
    document.getElementById("textSizeValue").innerText = textSize + "px";  // Display the current size
}

// Update text color dynamically
function updateTextColor() {
    const textColor = document.getElementById("textColor").value;
    document.body.style.color = textColor;
}

// Update background color dynamically
function updateBackgroundColor() {
    const backgroundColor = document.getElementById("backgroundColor").value;
    document.body.style.backgroundColor = backgroundColor;
}

// Update font style dynamically
function updateFontStyle() {
    const fontStyle = document.getElementById("fontStyle").value;
    document.body.style.fontFamily = fontStyle;
}

// Toggle dark/light mode
function toggleDarkMode() {
    const darkModeEnabled = document.getElementById("darkModeToggle").checked;
    if (darkModeEnabled) {
        document.body.style.backgroundColor = "#121212";  // Dark background
        document.body.style.color = "#ffffff";  // Light text color
    } else {
        document.body.style.backgroundColor = "";  // Default background
        document.body.style.color = "";  // Default text color
    }
}

// Save the settings (localStorage or server-side)
function saveSettings() {
    const displayName = document.getElementById("displayName").value;
    const textSize = document.getElementById("textSize").value;
    const textColor = document.getElementById("textColor").value;
    const backgroundColor = document.getElementById("backgroundColor").value;
    const fontStyle = document.getElementById("fontStyle").value;
    const darkModeEnabled = document.getElementById("darkModeToggle").checked;

    // Example: Save settings in localStorage for persistence
    localStorage.setItem("displayName", displayName);
    localStorage.setItem("textSize", textSize);
    localStorage.setItem("textColor", textColor);
    localStorage.setItem("backgroundColor", backgroundColor);
    localStorage.setItem("fontStyle", fontStyle);
    localStorage.setItem("darkModeEnabled", darkModeEnabled);

    alert("Settings Saved!");
}

// Apply saved settings (if any)
function applySavedSettings() {
    const savedName = localStorage.getItem("displayName");
    const savedSize = localStorage.getItem("textSize");
    const savedColor = localStorage.getItem("textColor");
    const savedBackground = localStorage.getItem("backgroundColor");
    const savedFont = localStorage.getItem("fontStyle");
    const savedDarkMode = localStorage.getItem("darkModeEnabled");

    if (savedName) document.getElementById("displayName").value = savedName;
    if (savedSize) document.body.style.fontSize = savedSize + "px";
    if (savedColor) document.body.style.color = savedColor;
    if (savedBackground) document.body.style.backgroundColor = savedBackground;
    if (savedFont) document.body.style.fontFamily = savedFont;
    if (savedDarkMode !== null) document.getElementById("darkModeToggle").checked = savedDarkMode === "true";

    if (savedSize) document.getElementById("textSize").value = savedSize;
    if (savedColor) document.getElementById("textColor").value = savedColor;
    if (savedBackground) document.getElementById("backgroundColor").value = savedBackground;
    if (savedFont) document.getElementById("fontStyle").value = savedFont;
}

// Load saved settings on page load
window.onload = function() {
    applySavedSettings();
};

// Logout Function
function logout() {
    alert("You have been logged out.");
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", function () {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
        document.getElementById("userName").innerText = savedName;
    }
});

// function exportToPDF() {
//     const { jsPDF } = window.jspdf;
//     const doc = new jsPDF();
    
//     // Get user diary information
//     const diaryText = localStorage.getItem("diaryEntry") || "No diary entries yet.";
//     const userName = localStorage.getItem("displayName") || "John Doe";
//     const mood = localStorage.getItem("mood") || "Neutral";
//     const achievements = JSON.parse(localStorage.getItem("achievements")) || [];
//     const goals = JSON.parse(localStorage.getItem("goals")) || [];
    
//     // Title and User Info
//     doc.setFontSize(18);
//     doc.text("User Diary", 20, 20);
//     doc.setFontSize(12);
//     doc.text(Name: ${userName}, 20, 30);
//     doc.text(Mood: ${mood}, 20, 40);
    
//     // Diary Content
//     doc.text("Diary Entry:", 20, 50);
//     doc.text(diaryText, 20, 60);
    
//     // Achievements
//     doc.text("Achievements:", 20, 80);
//     achievements.forEach((achievement, index) => {
//         doc.text(🎉 ${achievement}, 20, 90 + (index * 10));
//     });

//     // Goals
//     doc.text("Goals:", 20, 120);
//     goals.forEach((goal, index) => {
//         doc.text(- ${goal}, 20, 130 + (index * 10));
//     });

//     // Save as PDF
//     doc.save({userName},_Diary.pdf);
// }

// // Add event listener for the Export button
// document.getElementById("exportPdfBtn").addEventListener("click", exportToPDF);



