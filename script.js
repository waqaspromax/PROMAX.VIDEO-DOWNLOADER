// Get the form and input elements
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
    // Calling Cobalt API (Public instance)
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
      // Redirect or open direct download link
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
    const data = await response.json();

    if (response.ok && data.downloadUrl) {
      // Trigger file download or redirect to direct video URL
      window.location.href = data.downloadUrl;
    } else {
      alert(data.message || "Error processing video download.");
    }
  } catch (error) {
    console.error("Download failed:", error);
    alert("Unable to reach backend server. Please check your connection.");
  } finally {
    // Reset Button State
    submitBtn.innerText = originalBtnText;
    submitBtn.disabled = false;
  }
});
