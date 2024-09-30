const container = document.querySelector(".container");
const userInput = document.getElementById("userInput");
const submitBtn = document.getElementById("submit");
const downloadBtn = document.getElementById("download");
const sizeOptions = document.querySelector(".sizeOptions");
const BGColor = document.getElementById("BGColor");
const FGColor = document.getElementById("FGColor");

let sizeChoice = 100;
let BGColorChoice = "#ffffff";
let FGColorChoice = "#377dff";

// Set size
sizeOptions.addEventListener("change", () => {
  sizeChoice = sizeOptions.value;
});

// Set background color
BGColor.addEventListener("input", () => {
  BGColorChoice = BGColor.value;
});

// Set foreground color
FGColor.addEventListener("input", () => {
  FGColorChoice = FGColor.value;
});

// Format input
const inputFormatter = (value) => {
  return value.replace(/[^a-z0-9A-Z]+/g, "");
};

// Generate QR Code and enable download
submitBtn.addEventListener("click", () => {
  container.innerHTML = "";
  // QR code generation
  new QRCode(container, {
    text: userInput.value,
    width: parseInt(sizeChoice),
    height: parseInt(sizeChoice),
    colorDark: FGColorChoice,
    colorLight: BGColorChoice,
  });

  // Set URL for download
  setTimeout(() => {
    const qrImage = container.querySelector("canvas").toDataURL("image/png");
    downloadBtn.href = qrImage;

    // Format the download filename
    let userValue = userInput.value;
    try {
      userValue = new URL(userValue).hostname;
    } catch (_) {
      userValue = inputFormatter(userValue);
    }

    downloadBtn.download = `${userValue}_QR.png`;
    downloadBtn.classList.remove("hide");
  }, 300);
});

// Enable/disable the Generate button based on input
userInput.addEventListener("input", () => {
  if (userInput.value.trim().length < 1) {
    submitBtn.disabled = true;
    downloadBtn.href = "";
    downloadBtn.classList.add("hide");
  } else {
    submitBtn.disabled = false;
  }
});

// Reset settings on page load
window.onload = () => {
  container.innerHTML = "";
  sizeChoice = 100;
  sizeOptions.value = 100;
  userInput.value = "";
  BGColor.value = BGColorChoice = "#ffffff";
  FGColor.value = FGColorChoice = "#377dff";
  downloadBtn.classList.add("hide");
  submitBtn.disabled = true;
};
