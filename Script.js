alert("JavaScript is working!");
// Mobile Menu Toggle Logic
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Navigation / View Switching Logic
function navigateTo(sectionId) {
    // Hide all sections
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const target = document.getElementById(sectionId);
    if(target) {
        target.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Close mobile menu if open
    if(navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
}

// Attach event listeners to navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1); // removes '#'
        navigateTo(targetId);
    });
});

// Form Submission Logic
const form = document.getElementById('applicationForm');
const successSection = document.getElementById('success');
const generatedApplication = document.getElementById('generatedApplication');
const copyBtn = document.getElementById('copyBtn');
const copyConfirm = document.getElementById('copyConfirm');

form.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevents page reload

    // Gather data from the form
    const formData = new FormData(form);
    
    // Create a clean, formatted text version of the application
    let applicationText = `=== THE OBSIDIAN CIRCLE ===\n`;
    applicationText += `--- APPLICATION FOR INITIATION ---\n\n`;
    
    applicationText += `1. ALIAS: ${formData.get('alias')}\n`;
    applicationText += `2. AGE RANGE: ${formData.get('age')}\n\n`;
    
    applicationText += `3. INTERESTS:\n${formData.get('interests')}\n\n`;
    
    applicationText += `4. CURRENT SKILLS:\n${formData.get('skills_current')}\n\n`;
    
    applicationText += `5. SKILLS TO DEVELOP:\n${formData.get('skills_develop')}\n\n`;
    
    applicationText += `6. WHY JOIN:\n${formData.get('why_join')}\n\n`;
    
    applicationText += `7. CONTRIBUTION:\n${formData.get('contribution')}\n\n`;
    
    applicationText += `8. AREA OF INTEREST: ${formData.get('area_interest')}\n\n`;
    
    applicationText += `9. PROJECT IDEA:\n${formData.get('project_idea')}\n\n`;
    
    applicationText += `10. PRINCIPLES AGREEMENT: Accepted\n`;
    applicationText += `==================================`;

    // Save locally in the browser so the user doesn't lose it if they close the tab
    localStorage.setItem('obsidian_application', applicationText);

    // Put text into the display box
    generatedApplication.value = applicationText;

    // Show the Success/Received screen
    navigateTo('success');
});

// Copy to Clipboard Logic
copyBtn.addEventListener('click', () => {
    generatedApplication.select();
    generatedApplication.setSelectionRange(0, 99999); // For mobile devices

    // Use the clipboard API to copy text
    navigator.clipboard.writeText(generatedApplication.value).then(() => {
        copyConfirm.innerText = "Application text copied to clipboard!";
        
        // Clear message after 3 seconds
        setTimeout(() => {
            copyConfirm.innerText = "";
        }, 3000);
    }).catch(err => {
        copyConfirm.innerText = "Failed to copy. Please select the text and copy manually.";
        copyConfirm.style.color = "red";
    });
});

// Check if user has an unsaved application on load
window.onload = () => {
    const savedApp = localStorage.getItem('obsidian_application');
    if (savedApp && document.getElementById('success').classList.contains('active')) {
        generatedApplication.value = savedApp;
    }
};
                            
