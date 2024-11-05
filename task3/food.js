// Display a message when the page loads
window.onload = function() {
    document.getElementById("message").innerText = "We hope to see you soon at Avocado Restaurant!";
};

// Smooth scroll function for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(event) {
        event.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});
