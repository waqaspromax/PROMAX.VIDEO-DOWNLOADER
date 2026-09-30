const form = document.querySelector("form");
const videoURL = document.querySelector("#video-url");
const quality = document.querySelector("#quality");
const submitBtn = form.querySelector("button[type='submit']");

// Your active Cloudflare Worker URL
const WORKER_URL = "https://promax-downloader-api.promaxwaqas.workers.dev";

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

  // Remove Instagram tracking parameters
  if (url.includes("?")) {
    url = url.split("?")[0];
  }

  const originalBtnText = submitBtn.innerText;
  submitBtn.innerText = "Processing...";
  submitBtn.disabled = true;

  try {
    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url })
    });

    const data = await response.json();

    if (data.url) {
      // Single video download link
      window.location.href = data.url;
    } else if (data.picker && data.picker.length > 0) {
      // Carousel / Multi-item reel link
      window.location.href = data.picker[0].url;
    } else {
      alert("Could not process video. Make sure the video link is from a public post.");
    }
  } catch (error) {
    console.error("Download error:", error);
    alert("Error reaching backend service. Please try again.");
  } finally {
    submitBtn.innerText = originalBtnText;
    submitBtn.disabled = false;
  }
});
