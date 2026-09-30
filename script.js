
// Get the form and input elements
const form = document.querySelector("form");
const videoURL = document.querySelector("#video-url");
const quality = document.querySelector("#quality");

// When the user clicks Download
form.addEventListener("submit", function (event) {

    // Stop the page from refreshing
    event.preventDefault();

    // Get the URL
    const url = videoURL.value.trim();

    // Check if URL is empty
    if (url === "") {
        alert("Please paste a video URL first.");
        return;
    }

    // Check whether it looks like a URL
    try {
        new URL(url);
    } catch {
        alert("Please enter a valid video URL.");
        return;
    }

    // Get selected quality
    const selectedQuality = quality.value;

    // Temporary message
    alert(
        "URL received successfully!\n\n" +
        "Quality: " + selectedQuality +
        "\n\nBackend downloader is not connected yet."
    );

});

