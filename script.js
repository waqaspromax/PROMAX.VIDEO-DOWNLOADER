const form = document.querySelector("form");
const videoURL = document.querySelector("#video-url");
const submitBtn = form.querySelector("button[type='submit']");

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

  // Strip query parameters
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
      // Trigger download/redirect directly to video stream
      window.location.href = data.url;
    } else {
      alert("Could not process this video. Please verify the URL and try again.");
    }
  } catch (error) {
    console.error("Download error:", error);
    alert("Error reaching backend worker. Please try again.");
  } finally {
    submitBtn.innerText = originalBtnText;
    submitBtn.disabled = false;
  }
});
