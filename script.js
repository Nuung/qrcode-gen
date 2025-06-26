// Professional QR Code Generator - Enhanced JavaScript

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

  if (selectedTab && selectedContent) {
    selectedTab.classList.add("active");
    selectedTab.setAttribute("aria-selected", "true");
    selectedContent.classList.add("active");
  }
}

// Range value update
function updateRangeValue(id) {
  const slider = document.getElementById(id);
  const valueDisplay = document.getElementById(id + "Value");
  if (slider && valueDisplay) {
    valueDisplay.textContent = slider.value;
  }
}

// Drag and drop functionality
const uploadArea = document.querySelector(".upload-area");

if (uploadArea) {
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
}

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
    if (preview) {
      preview.innerHTML = `<img src="${logoDataUrl}" class="preview" alt="Logo Preview: ${file.name}">`;
    }

    const logoImage = document.getElementById("logoImage");
    const logoOverlay = document.getElementById("logoOverlay");
    if (logoImage && logoOverlay) {
      logoImage.src = logoDataUrl;
      logoImage.alt = `Logo: ${file.name}`;
      logoOverlay.style.display = "flex";
    }

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
    const elements = {
      utmSource: document.getElementById("utmSource"),
      utmMedium: document.getElementById("utmMedium"),
      utmCampaign: document.getElementById("utmCampaign"),
      utmContent: document.getElementById("utmContent"),
      utmTerm: document.getElementById("utmTerm"),
    };

    if (elements.utmSource) elements.utmSource.value = preset.source;
    if (elements.utmMedium) elements.utmMedium.value = preset.medium;
    if (elements.utmCampaign) elements.utmCampaign.value = preset.campaign;
    if (elements.utmContent) elements.utmContent.value = preset.content;
    if (elements.utmTerm) elements.utmTerm.value = preset.term;

    updateURLPreview();
    showSuccessMessage(`UTM preset applied: ${presetType.replace("-", " ")}`);
  }
}

function generateURL() {
  const hostUrlEl = document.getElementById("hostUrl");
  const utmSourceEl = document.getElementById("utmSource");
  const utmMediumEl = document.getElementById("utmMedium");
  const utmCampaignEl = document.getElementById("utmCampaign");
  const utmContentEl = document.getElementById("utmContent");
  const utmTermEl = document.getElementById("utmTerm");

  if (!hostUrlEl) return null;

  const hostUrl = hostUrlEl.value.trim();
  const utmSource = utmSourceEl ? utmSourceEl.value.trim() : "";
  const utmMedium = utmMediumEl ? utmMediumEl.value.trim() : "";
  const utmCampaign = utmCampaignEl ? utmCampaignEl.value.trim() : "";
  const utmContent = utmContentEl ? utmContentEl.value.trim() : "";
  const utmTerm = utmTermEl ? utmTermEl.value.trim() : "";

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
  const currentUrlEl = document.getElementById("currentUrl");
  if (url && currentUrlEl) {
    currentUrlEl.textContent = url;
  }
}

function generateQRCode() {
  const url = generateURL();
  if (!url) return;

  const currentUrlEl = document.getElementById("currentUrl");
  if (currentUrlEl) {
    currentUrlEl.textContent = url;
  }

  const cellSizeEl = document.getElementById("cellSize");
  const marginEl = document.getElementById("margin");
  const positionBoostEl = document.getElementById("positionBoost");
  const timingBoostEl = document.getElementById("timingBoost");
  const foregroundColorEl = document.getElementById("foregroundColor");
  const backgroundColorEl = document.getElementById("backgroundColor");

  const cellSize = cellSizeEl ? parseInt(cellSizeEl.value) : 32;
  const margin = marginEl ? parseInt(marginEl.value) : 20;
  const positionBoost = positionBoostEl ? parseInt(positionBoostEl.value) : 12;
  const timingBoost = timingBoostEl ? parseInt(timingBoostEl.value) : 8;
  const foregroundColor = foregroundColorEl
    ? foregroundColorEl.value
    : "#000000";
  const backgroundColor = backgroundColorEl
    ? backgroundColorEl.value
    : "#ffffff";

  try {
    // 오류 정정 레벨을 M으로 변경 (15% 복구 가능)
    const qr = qrcode(0, "M");
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
    if (qrContainer) {
      qrContainer.innerHTML = "";

      canvas.style.maxWidth = "100%";
      canvas.style.height = "auto";
      canvas.style.imageRendering = "crisp-edges";
      canvas.style.imageRendering = "pixelated";

      qrContainer.appendChild(canvas);
    }

    // Add logo overlay positioning
    if (logoDataUrl) {
      updateLogoOverlay();
    }

    qrGenerated = true;

    const pngBtn = document.getElementById("pngBtn");
    const svgBtn = document.getElementById("svgBtn");
    if (pngBtn) pngBtn.disabled = false;
    if (svgBtn) svgBtn.disabled = false;

    showSuccessMessage("QR Code generated successfully!");
  } catch (error) {
    console.error("Error generating QR code:", error);
    alert("Error generating QR code. Please check your inputs and try again.");
  }
}

function updateLogoOverlay() {
  const logoOverlay = document.getElementById("logoOverlay");
  const qrContainer = document.getElementById("qrcode");
  const logoSizeEl = document.getElementById("logoSize");

  if (!logoOverlay || !qrContainer || !logoSizeEl) return;

  const canvas = qrContainer.querySelector("canvas");
  if (!canvas) return;

  const logoSizePercent = parseInt(logoSizeEl.value);
  const canvasRect = canvas.getBoundingClientRect();

  // 프리뷰에서도 정확한 크기로 표시 (캔버스 실제 크기 기준)
  const logoSize =
    Math.min(canvasRect.width, canvasRect.height) * (logoSizePercent / 100);

  logoOverlay.style.width = `${logoSize}px`;
  logoOverlay.style.height = `${logoSize}px`;

  // 패딩도 비례적으로 조정
  const padding = logoSize * 0.15;
  logoOverlay.style.padding = `${padding}px`;
  logoOverlay.style.background = "white";
  logoOverlay.style.borderRadius = "8px";
}

function getSelectedResolution() {
  const resolutionEl = document.getElementById("downloadResolution");
  return resolutionEl ? parseInt(resolutionEl.value) : 1200;
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
  if (!qrCanvas) {
    alert("No QR code found. Please generate a QR code first.");
    return;
  }

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const outputSize = getSelectedResolution();
  canvas.width = outputSize;
  canvas.height = outputSize;

  const backgroundColorEl = document.getElementById("backgroundColor");
  const backgroundColor = backgroundColorEl
    ? backgroundColorEl.value
    : "#ffffff";

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, outputSize, outputSize);

  // QR 코드를 여백 없이 거의 전체 캔버스에 그리기 (95% 사용)
  const qrSize = outputSize * 0.95;
  const qrX = (outputSize - qrSize) / 2;
  const qrY = (outputSize - qrSize) / 2;

  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize);

  if (logoDataUrl) {
    const logoImg = new Image();
    logoImg.onload = function () {
      const logoSizeEl = document.getElementById("logoSize");
      const logoSizePercent = logoSizeEl ? parseInt(logoSizeEl.value) : 10;

      // 로고 크기를 정확히 프리뷰와 같게 설정 (QR 코드 전체 크기 기준으로)
      const logoSize = qrSize * (logoSizePercent / 100);
      const logoX = (outputSize - logoSize) / 2;
      const logoY = (outputSize - logoSize) / 2;

      // 로고 뒤에 배경 추가 (로고보다 약간 크게)
      const padding = logoSize * 0.15;
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(
        logoX - padding,
        logoY - padding,
        logoSize + padding * 2,
        logoSize + padding * 2
      );

      // 로고 그리기
      ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);

      downloadCanvasAsPNG(canvas, outputSize);
    };
    logoImg.src = logoDataUrl;
  } else {
    downloadCanvasAsPNG(canvas, outputSize);
  }
}

function downloadCanvasAsPNG(canvas, resolution) {
  try {
    const link = document.createElement("a");
    link.download = `QR_Code_Professional_${resolution}x${resolution}.png`;
    link.href = canvas.toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showSuccessMessage(
      `PNG downloaded successfully! (${resolution}x${resolution})`
    );
  } catch (error) {
    console.error("Error downloading PNG:", error);
    alert("Error downloading PNG. Please try again.");
  }
}

function downloadSVG() {
  const url = generateURL();
  if (!url) return;

  const cellSizeEl = document.getElementById("cellSize");
  const marginEl = document.getElementById("margin");
  const positionBoostEl = document.getElementById("positionBoost");
  const timingBoostEl = document.getElementById("timingBoost");
  const foregroundColorEl = document.getElementById("foregroundColor");
  const backgroundColorEl = document.getElementById("backgroundColor");

  const cellSize = cellSizeEl ? parseInt(cellSizeEl.value) : 32;
  const margin = marginEl ? parseInt(marginEl.value) : 20;
  const positionBoost = positionBoostEl ? parseInt(positionBoostEl.value) : 12;
  const timingBoost = timingBoostEl ? parseInt(timingBoostEl.value) : 8;
  const foregroundColor = foregroundColorEl
    ? foregroundColorEl.value
    : "#000000";
  const backgroundColor = backgroundColorEl
    ? backgroundColorEl.value
    : "#ffffff";

  try {
    // 오류 정정 레벨을 M으로 변경 (15% 복구 가능)
    const qr = qrcode(0, "M");
    qr.addData(url);
    qr.make();

    const modules = qr.getModuleCount();
    const qrSize = modules * cellSize + margin * 2 * cellSize;
    const totalSize = getSelectedResolution();

    // 여백을 최소화 - QR 코드가 전체 크기의 95%를 차지하도록
    const scaleFactor = (totalSize * 0.95) / qrSize;
    const scaledQrSize = qrSize * scaleFactor;
    const qrOffset = (totalSize - scaledQrSize) / 2;

    let svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${totalSize}" height="${totalSize}" viewBox="0 0 ${totalSize} ${totalSize}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <rect width="${totalSize}" height="${totalSize}" fill="${backgroundColor}"/>
  <g transform="translate(${qrOffset}, ${qrOffset}) scale(${scaleFactor})">`;

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
      const logoSizeEl = document.getElementById("logoSize");
      const logoSizePercent = logoSizeEl ? parseInt(logoSizeEl.value) : 10;

      // 로고 크기를 정확히 프리뷰와 같게 설정 (실제 QR 코드 크기 기준으로)
      const logoSize = scaledQrSize * (logoSizePercent / 100);
      const logoX = (totalSize - logoSize) / 2;
      const logoY = (totalSize - logoSize) / 2;

      // 로고 배경 추가
      const padding = logoSize * 0.15;
      svgContent += `
  <rect x="${logoX - padding}" y="${logoY - padding}" width="${
        logoSize + padding * 2
      }" height="${logoSize + padding * 2}" fill="${backgroundColor}" rx="8"/>
  <image x="${logoX}" y="${logoY}" width="${logoSize}" height="${logoSize}" xlink:href="${logoDataUrl}"/>`;
    }

    svgContent += `\n</svg>`;

    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url_obj = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const resolution = getSelectedResolution();
    link.download = `QR_Code_Professional_${resolution}x${resolution}.svg`;
    link.href = url_obj;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url_obj);

    showSuccessMessage(
      `SVG downloaded successfully! (${resolution}x${resolution})`
    );
  } catch (error) {
    console.error("Error downloading SVG:", error);
    alert("Error downloading SVG. Please try again.");
  }
}

// Copy URL to clipboard functionality
function setupURLCopyFunction() {
  const currentUrlEl = document.getElementById("currentUrl");
  if (!currentUrlEl) return;

  currentUrlEl.addEventListener("click", function () {
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

// Responsive logo overlay update
function handleResize() {
  if (logoDataUrl && qrGenerated) {
    updateLogoOverlay();
  }
}

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
      if (input) {
        input.oninput = function () {
          updateRangeValue(id);
          debouncedGenerateQR();
          if (id === "logoSize" && logoDataUrl) {
            updateLogoOverlay();
          }
        };
      }
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
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener("input", updateURLPreview);
    }
  });

  // Setup URL copy functionality
  setupURLCopyFunction();

  // Keyboard navigation for upload area
  if (uploadArea) {
    uploadArea.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const logoFileInput = document.getElementById("logoFile");
        if (logoFileInput) {
          logoFileInput.click();
        }
      }
    });
  }

  // Auto-generate QR code when settings change
  ["foregroundColor", "backgroundColor"].forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener("change", generateQRCode);
    }
  });

  // Handle window resize for responsive logo positioning
  window.addEventListener("resize", debounce(handleResize, 100));

  // Initialize download resolution change handler
  const downloadResolutionEl = document.getElementById("downloadResolution");
  if (downloadResolutionEl) {
    downloadResolutionEl.addEventListener("change", function () {
      const resolution = this.value;
      showSuccessMessage(
        `Download resolution set to ${resolution}x${resolution}px`
      );
    });
  }

  // Generate initial QR code
  generateQRCode();
});

// Handle visibility change to update logo overlay when tab becomes visible
document.addEventListener("visibilitychange", function () {
  if (!document.hidden && logoDataUrl && qrGenerated) {
    setTimeout(updateLogoOverlay, 100);
  }
});

// Enhanced error handling for QR code generation
window.addEventListener("error", function (e) {
  console.error("Global error:", e.error);
  if (e.error && e.error.message && e.error.message.includes("qrcode")) {
    alert("QR Code library error. Please refresh the page and try again.");
  }
});

// Accessibility improvements
document.addEventListener("keydown", function (e) {
  // ESC key to close success messages
  if (e.key === "Escape") {
    const successMessage = document.getElementById("successMessage");
    if (successMessage && successMessage.classList.contains("show")) {
      successMessage.classList.remove("show");
    }
  }

  // Ctrl/Cmd + G to generate QR code
  if ((e.ctrlKey || e.metaKey) && e.key === "g") {
    e.preventDefault();
    generateQRCode();
  }

  // Ctrl/Cmd + D to download PNG
  if ((e.ctrlKey || e.metaKey) && e.key === "d") {
    e.preventDefault();
    if (qrGenerated) {
      downloadQR("png");
    }
  }
});

// Touch device optimizations
if ("ontouchstart" in window) {
  // Add touch-friendly styles
  document.body.classList.add("touch-device");

  // Prevent zoom on double tap for buttons
  let lastTouchEnd = 0;
  document.addEventListener(
    "touchend",
    function (event) {
      const now = new Date().getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    },
    false
  );
}
