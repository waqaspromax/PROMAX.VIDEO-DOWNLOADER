const form = document.querySelector("form");
const videoURL = document.querySelector("#video-url");
const quality = document.querySelector("#quality");
const submitBtn = form.querySelector("button[type='submit']");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const url = videoURL.value.trim();

  if (url === "") {
    alert("Please paste a video URL first.");
    return;
  }

  try {
    new URL(url);
  } catch (err) {
    alert("Please enter a valid video URL.");
    return;
  }

  const originalBtnText = submitBtn.innerText;
  submitBtn.innerText = "Processing...";
  submitBtn.disabled = true;

  try {
    // Send request to Cobalt API
    const response = await fetch("https://api.cobalt.tools/api/json", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        url: url,
        videoQuality: quality.value || "auto"
      })
    });

    const data = await response.json();

    if (data.url) {
      // Redirect to the direct media stream URL
      window.location.href = data.url;
    } else {
      alert("Could not process video. Make sure the link is public.");
    }
  } catch (error) {
    console.error("Download failed:", error);
    alert("Failed to connect to video service. Try again later.");
  } finally {
    submitBtn.innerText = originalBtnText;
    submitBtn.disabled = false;
  }
});
