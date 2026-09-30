const form = document.querySelector("form");
const videoURL = document.querySelector("#video-url");
const quality = document.querySelector("#quality");
const submitBtn = form.querySelector("button[type='submit']");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  let url = videoURL.value.trim();

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

  // Clean trailing tracking parameters from URL
  if (url.includes("?")) {
    url = url.split("?")[0];
  }

  const originalBtnText = submitBtn.innerText;
  submitBtn.innerText = "Processing...";
  submitBtn.disabled = true;

  try {
    // Request via CORS proxy to bypass browser restrictions
    const response = await fetch("https://corsproxy.io/?" + encodeURIComponent("https://api.cobalt.tools/api/json"), {
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
      window.location.href = data.url;
    } else if (data.picker) {
      // Handles multi-item posts/slideshows
      window.location.href = data.picker[0].url;
    } else {
      alert("Could not process this link. Make sure the account/video is public.");
    }
  } catch (error) {
    console.error("Download failed:", error);
    alert("Service busy or blocked by host. Please try again in a few seconds.");
  } finally {
    submitBtn.innerText = originalBtnText;
    submitBtn.disabled = false;
  }
});
