// Professional QR Code Generator - Cleaned JavaScript

let logoDataUrl = null;
let qrGenerated = false;

// Success message function
function showSuccessMessage(message) {
  const successEl = document.getElementById("successMessage");
  const textEl = document.getElementById("successText");
  textEl.textContent = message;
  successEl.classList.add("show");
  setTimeout(() => successEl.classList.remove("show"), 3000);
}

// Tab switching functionality
function switchTab(tabName) {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.remove("active");
    tab.setAttribute("aria-selected", "false");
  });
  document
    .querySelectorAll(".tab-content")
    .forEach((content) => content.classList.remove("active"));

  const selectedTab = document.querySelector(
    `[onclick="switchTab('${tabName}')"]`
  );
  const selectedContent = document.getElementById(`${tabName}-tab`);

  selectedTab.classList.add("active");
  selectedTab.setAttribute("aria-selected", "true");
  selectedContent.classList.add("active");
}

// Range value update
function updateRangeValue(id) {
  const slider = document.getElementById(id);
  const valueDisplay = document.getElementById(id + "Value");
  valueDisplay.textContent = slider.value;
}

// Drag and drop functionality
const uploadArea = document.querySelector(".upload-area");

["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  uploadArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

["dragenter", "dragover"].forEach((eventName) => {
  uploadArea.addEventListener(eventName, () =>
    uploadArea.classList.add("dragover")
  );
});

["dragleave", "drop"].forEach((eventName) => {
  uploadArea.addEventListener(eventName, () =>
    uploadArea.classList.remove("dragover")
  );
});

uploadArea.addEventListener("drop", handleDrop);

function handleDrop(e) {
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    handleLogoFile(files[0]);
  }
}

function handleLogoUpload(event) {
  const file = event.target.files[0];
  if (file) {
    handleLogoFile(file);
  }
}

function handleLogoFile(file) {
  if (!file.type.startsWith("image/")) {
    alert("Please upload an image file only. Supported formats: PNG, JPG, SVG");
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    alert("File size too large. Please upload an image smaller than 5MB.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    logoDataUrl = e.target.result;

    const preview = document.getElementById("logoPreview");
    preview.innerHTML = `<img src="${logoDataUrl}" class="preview" alt="Logo Preview: ${file.name}">`;

    const logoImage = document.getElementById("logoImage");
    const logoOverlay = document.getElementById("logoOverlay");
    logoImage.src = logoDataUrl;
    logoImage.alt = `Logo: ${file.name}`;
    logoOverlay.style.display = "flex";

    showSuccessMessage(`Logo uploaded successfully: ${file.name}`);

    if (qrGenerated) {
      generateQRCode();
    }
  };

  reader.onerror = function () {
    alert("Error reading file. Please try again with a different image.");
  };

  reader.readAsDataURL(file);
}

// UTM presets functionality
function applyPreset(presetType) {
  const presets = {
    "social-facebook": {
      source: "facebook",
      medium: "social",
      campaign: "facebook_post",
      content: "qr_code",
      term: "",
    },
    "email-newsletter": {
      source: "newsletter",
      medium: "email",
      campaign: "monthly_newsletter",
      content: "qr_code",
      term: "",
    },
    "print-brochure": {
      source: "brochure",
      medium: "print",
      campaign: "marketing_brochure",
      content: "qr_code",
      term: "",
    },
    "youtube-video": {
      source: "youtube",
      medium: "video",
      campaign: "youtube_promotion",
      content: "qr_code",
      term: "",
    },
    "clear-all": {
      source: "",
      medium: "",
      campaign: "",
      content: "",
      term: "",
    },
  };

  const preset = presets[presetType];
  if (preset) {
    document.getElementById("utmSource").value = preset.source;
    document.getElementById("utmMedium").value = preset.medium;
    document.getElementById("utmCampaign").value = preset.campaign;
    document.getElementById("utmContent").value = preset.content;
    document.getElementById("utmTerm").value = preset.term;

    updateURLPreview();
    showSuccessMessage(`UTM preset applied: ${presetType.replace("-", " ")}`);
  }
}

function generateURL() {
  const hostUrl = document.getElementById("hostUrl").value.trim();
  const utmSource = document.getElementById("utmSource").value.trim();
  const utmMedium = document.getElementById("utmMedium").value.trim();
  const utmCampaign = document.getElementById("utmCampaign").value.trim();
  const utmContent = document.getElementById("utmContent").value.trim();
  const utmTerm = document.getElementById("utmTerm").value.trim();

  if (!hostUrl) {
    alert("Please enter a host URL.");
    return null;
  }

  let url = hostUrl;
  const params = [];

  if (utmSource) params.push(`utm_source=${encodeURIComponent(utmSource)}`);
  if (utmMedium) params.push(`utm_medium=${encodeURIComponent(utmMedium)}`);
  if (utmCampaign)
    params.push(`utm_campaign=${encodeURIComponent(utmCampaign)}`);
  if (utmContent) params.push(`utm_content=${encodeURIComponent(utmContent)}`);
  if (utmTerm) params.push(`utm_term=${encodeURIComponent(utmTerm)}`);

  if (params.length > 0) {
    url += (url.includes("?") ? "&" : "?") + params.join("&");
  }

  return url;
}

function updateURLPreview() {
  const url = generateURL();
  if (url) {
    document.getElementById("currentUrl").textContent = url;
  }
}

function generateQRCode() {
  const url = generateURL();
  if (!url) return;

  document.getElementById("currentUrl").textContent = url;

  const cellSize = parseInt(document.getElementById("cellSize").value);
  const margin = parseInt(document.getElementById("margin").value);
  const positionBoost = parseInt(
    document.getElementById("positionBoost").value
  );
  const timingBoost = parseInt(document.getElementById("timingBoost").value);
  const foregroundColor = document.getElementById("foregroundColor").value;
  const backgroundColor = document.getElementById("backgroundColor").value;

  const qr = qrcode(0, "L");
  qr.addData(url);
  qr.make();

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const modules = qr.getModuleCount();

  canvas.width = canvas.height = modules * cellSize + margin * 2 * cellSize;

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = foregroundColor;

  for (let row = 0; row < modules; row++) {
    for (let col = 0; col < modules; col++) {
      if (qr.isDark(row, col)) {
        const x = col * cellSize + margin * cellSize;
        const y = row * cellSize + margin * cellSize;

        const isPositionPattern =
          (row < 9 && col < 9) ||
          (row < 9 && col >= modules - 9) ||
          (row >= modules - 9 && col < 9);

        const isTimingPattern = row === 6 || col === 6;
        const isAlignmentPattern = row >= modules - 9 && col >= modules - 9;

        if (isPositionPattern) {
          ctx.fillRect(
            x - positionBoost / 2,
            y - positionBoost / 2,
            cellSize + positionBoost,
            cellSize + positionBoost
          );
        } else if (isTimingPattern) {
          ctx.fillRect(
            x - timingBoost / 2,
            y - timingBoost / 2,
            cellSize + timingBoost,
            cellSize + timingBoost
          );
        } else if (isAlignmentPattern) {
          const alignBoost = Math.min(positionBoost, timingBoost);
          ctx.fillRect(
            x - alignBoost / 2,
            y - alignBoost / 2,
            cellSize + alignBoost,
            cellSize + alignBoost
          );
        } else {
          ctx.fillRect(x, y, cellSize, cellSize);
        }
      }
    }
  }

  const qrContainer = document.getElementById("qrcode");
  qrContainer.innerHTML = "";

  canvas.style.maxWidth = "380px";
  canvas.style.maxHeight = "380px";
  canvas.style.imageRendering = "crisp-edges";
  canvas.style.imageRendering = "pixelated";

  qrContainer.appendChild(canvas);

  qrGenerated = true;
  document.getElementById("pngBtn").disabled = false;
  document.getElementById("svgBtn").disabled = false;

  showSuccessMessage("QR Code generated successfully!");
}

function downloadQR(format = "png") {
  if (!qrGenerated) {
    alert("Please generate a QR code first.");
    return;
  }

  if (format === "svg") {
    downloadSVG();
  } else {
    downloadPNG();
  }
}

function downloadPNG() {
  const qrCanvas = document.querySelector("#qrcode canvas");
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const outputSize = 1200;
  canvas.width = outputSize;
  canvas.height = outputSize;

  const backgroundColor = document.getElementById("backgroundColor").value;
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, outputSize, outputSize);

  const qrSize = outputSize * 0.9;
  const qrX = (outputSize - qrSize) / 2;
  const qrY = (outputSize - qrSize) / 2;

  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize);

  if (logoDataUrl) {
    const logoImg = new Image();
    logoImg.onload = function () {
      const logoSizePercent = parseInt(
        document.getElementById("logoSize").value
      );
      const logoSize = outputSize * (logoSizePercent / 100);
      const logoX = (outputSize - logoSize) / 2;
      const logoY = (outputSize - logoSize) / 2;

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(logoX - 12, logoY - 12, logoSize + 24, logoSize + 24);

      ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);

      const link = document.createElement("a");
      link.download = "QR_Code_Professional.png";
      link.href = canvas.toDataURL("image/png");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showSuccessMessage("PNG downloaded successfully!");
    };
    logoImg.src = logoDataUrl;
  } else {
    const link = document.createElement("a");
    link.download = "QR_Code_Professional.png";
    link.href = canvas.toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showSuccessMessage("PNG downloaded successfully!");
  }
}

function downloadSVG() {
  const url = generateURL();
  const cellSize = parseInt(document.getElementById("cellSize").value);
  const margin = parseInt(document.getElementById("margin").value);
  const positionBoost = parseInt(
    document.getElementById("positionBoost").value
  );
  const timingBoost = parseInt(document.getElementById("timingBoost").value);
  const foregroundColor = document.getElementById("foregroundColor").value;
  const backgroundColor = document.getElementById("backgroundColor").value;

  const qr = qrcode(0, "L");
  qr.addData(url);
  qr.make();

  const modules = qr.getModuleCount();
  const qrSize = modules * cellSize + margin * 2 * cellSize;
  const totalSize = 1200;
  const qrOffset = (totalSize - qrSize) / 2;

  let svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="1200" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <rect width="1200" height="1200" fill="${backgroundColor}"/>
  <g transform="translate(${qrOffset}, ${qrOffset})">`;

  for (let row = 0; row < modules; row++) {
    for (let col = 0; col < modules; col++) {
      if (qr.isDark(row, col)) {
        const x = col * cellSize + margin * cellSize;
        const y = row * cellSize + margin * cellSize;

        const isPositionPattern =
          (row < 9 && col < 9) ||
          (row < 9 && col >= modules - 9) ||
          (row >= modules - 9 && col < 9);

        const isTimingPattern = row === 6 || col === 6;
        const isAlignmentPattern = row >= modules - 9 && col >= modules - 9;

        if (isPositionPattern) {
          svgContent += `\n    <rect x="${x - positionBoost / 2}" y="${
            y - positionBoost / 2
          }" width="${cellSize + positionBoost}" height="${
            cellSize + positionBoost
          }" fill="${foregroundColor}"/>`;
        } else if (isTimingPattern) {
          svgContent += `\n    <rect x="${x - timingBoost / 2}" y="${
            y - timingBoost / 2
          }" width="${cellSize + timingBoost}" height="${
            cellSize + timingBoost
          }" fill="${foregroundColor}"/>`;
        } else if (isAlignmentPattern) {
          const alignBoost = Math.min(positionBoost, timingBoost);
          svgContent += `\n    <rect x="${x - alignBoost / 2}" y="${
            y - alignBoost / 2
          }" width="${cellSize + alignBoost}" height="${
            cellSize + alignBoost
          }" fill="${foregroundColor}"/>`;
        } else {
          svgContent += `\n    <rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="${foregroundColor}"/>`;
        }
      }
    }
  }

  svgContent += `\n  </g>`;

  if (logoDataUrl) {
    const logoSizePercent = parseInt(document.getElementById("logoSize").value);
    const logoSize = totalSize * (logoSizePercent / 100);
    const logoX = (totalSize - logoSize) / 2;
    const logoY = (totalSize - logoSize) / 2;

    svgContent += `
  <rect x="${logoX - 12}" y="${logoY - 12}" width="${logoSize + 24}" height="${
      logoSize + 24
    }" fill="${backgroundColor}"/>
  <image x="${logoX}" y="${logoY}" width="${logoSize}" height="${logoSize}" xlink:href="${logoDataUrl}"/>`;
  }

  svgContent += `\n</svg>`;

  const blob = new Blob([svgContent], { type: "image/svg+xml" });
  const url_obj = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = "QR_Code_Professional.svg";
  link.href = url_obj;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url_obj);

  showSuccessMessage("SVG downloaded successfully!");
}

// Copy URL to clipboard functionality
function setupURLCopyFunction() {
  document.getElementById("currentUrl").addEventListener("click", function () {
    const url = this.textContent;
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          showSuccessMessage("URL copied to clipboard!");
        })
        .catch(() => {
          fallbackCopyTextToClipboard(url);
        });
    } else {
      fallbackCopyTextToClipboard(url);
    }
  });
}

function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand("copy");
    showSuccessMessage("URL copied to clipboard!");
  } catch (err) {
    console.error("Fallback: Could not copy text: ", err);
  }

  document.body.removeChild(textArea);
}

// Performance optimization: debounce range inputs
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const debouncedGenerateQR = debounce(generateQRCode, 200);

// Initialize application
window.addEventListener("load", function () {
  // Initialize range value displays
  ["cellSize", "margin", "positionBoost", "timingBoost", "logoSize"].forEach(
    (id) => {
      updateRangeValue(id);
    }
  );

  // Apply debounced generation to range inputs
  ["cellSize", "margin", "positionBoost", "timingBoost", "logoSize"].forEach(
    (id) => {
      const input = document.getElementById(id);
      input.oninput = function () {
        updateRangeValue(id);
        debouncedGenerateQR();
      };
    }
  );

  // Real-time URL preview
  [
    "hostUrl",
    "utmSource",
    "utmMedium",
    "utmCampaign",
    "utmContent",
    "utmTerm",
  ].forEach((id) => {
    document.getElementById(id).addEventListener("input", updateURLPreview);
  });

  // Setup URL copy functionality
  setupURLCopyFunction();

  // Keyboard navigation for upload area
  uploadArea.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      document.getElementById("logoFile").click();
    }
  });

  // Auto-generate QR code when settings change
  ["foregroundColor", "backgroundColor"].forEach((id) => {
    document.getElementById(id).addEventListener("change", generateQRCode);
  });

  // Generate initial QR code
  generateQRCode();
});
