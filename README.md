# Professional QR Code Generator

**Create high-quality, customizable QR codes with logos and UTM tracking for professional marketing campaigns.**

[![Live Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](https://your-username.github.io/professional-qr-generator)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 🚀 Quick Start

**1-2 Sentence Description:**
A powerful web-based QR code generator that creates professional, customizable QR codes with logo integration and UTM parameter tracking for enhanced marketing analytics.

## 📖 Overview

The Professional QR Code Generator is a comprehensive, browser-based tool designed for marketers, businesses, and developers who need high-quality QR codes with advanced customization options. Built with vanilla HTML, CSS, and JavaScript, this tool provides enterprise-level features without requiring any backend infrastructure.

### Key Features

- **🎨 Advanced Design Customization**

  - Real-time adjustment of cell size, margins, and pattern thickness
  - Custom color schemes for foreground and background
  - Enhanced position and timing pattern recognition
  - Professional gradient UI with glassmorphism effects

- **📊 Marketing Analytics Integration**

  - Built-in UTM parameter support for campaign tracking
  - Real-time URL preview with parameter validation
  - Google Analytics and marketing platform compatibility

- **🖼️ Logo Integration**

  - Drag-and-drop logo upload functionality
  - Smart logo positioning and sizing
  - Support for PNG, JPG, and SVG formats
  - Automatic background optimization for logo visibility

- **📱 Cross-Platform Compatibility**

  - Responsive design for desktop, tablet, and mobile
  - Progressive enhancement for older browsers
  - Touch-friendly interface for mobile devices

- **⚡ Performance Optimized**
  - Client-side processing for instant generation
  - High-resolution output (1200x1200px) for print quality
  - Optimized QR code structure for maximum scanner recognition
  - SVG and PNG export options

## 🛠️ Technical Specifications

### QR Code Optimization

- **Error Correction Level**: L (Low) for maximum data density and recognition
- **Enhanced Pattern Recognition**: Boosted position, timing, and alignment patterns
- **Scanner Compatibility**: Optimized for all major QR code scanners
- **Output Formats**: High-resolution PNG (1200x1200) and scalable SVG

### Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Dependencies

- QRCode.js library (loaded via CDN)
- No build process required
- No external API dependencies

## 🎯 Use Cases

### Marketing Campaigns

- Print advertisements with trackable QR codes
- Social media campaign attribution
- Event registration and check-in systems
- Email marketing click tracking

### Business Applications

- Digital business cards with analytics
- Product packaging with campaign tracking
- Restaurant menu digitization
- Contact information sharing

### Developer Tools

- API endpoint documentation
- GitHub repository sharing
- Development environment setup links
- Testing and debugging workflows

## 🚀 Getting Started

### Quick Setup (30 seconds)

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/professional-qr-generator.git
   cd professional-qr-generator
   ```

2. **Open in browser**

   ```bash
   # Simple HTTP server (Python 3)
   python -m http.server 8000

   # Or use any static file server
   npx serve .
   ```

3. **Start generating QR codes**
   - Open `http://localhost:8000` in your browser
   - Enter your URL and UTM parameters
   - Customize the design as needed
   - Download high-quality PNG or SVG files

### GitHub Pages Deployment

1. Fork this repository
2. Go to Settings → Pages
3. Select "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Your QR generator will be live at `https://your-username.github.io/professional-qr-generator`

## 📚 Usage Guide

### Basic Configuration

1. **Host URL**: Enter your destination URL (required)
2. **UTM Source**: Specify traffic source (e.g., "ebook", "newsletter")
3. **UTM Medium**: Define medium type (e.g., "qr", "print", "digital")

### Design Customization

1. **Cell Size**: Adjust QR code module size (16-48px)
2. **Margin**: Control border spacing (8-32px)
3. **Pattern Boost**: Enhance scanner recognition (0-20px)
4. **Colors**: Customize foreground and background colors
5. **Logo**: Upload and resize brand logos (5-20% of QR size)

### Best Practices

- **Logo Guidelines**: Use square images (1:1 ratio) with transparent backgrounds
- **Color Contrast**: Maintain high contrast between foreground and background
- **Size Recommendations**: Minimum 200x200px for reliable scanning
- **Testing**: Always test with multiple devices and scanner apps

## 🔧 Customization

### Adding Custom Styles

```css
/* Add to the <style> section for custom themes */
.hero-section {
  background: linear-gradient(135deg, #your-color1, #your-color2);
}

.btn-primary {
  background: linear-gradient(135deg, #your-brand-color1, #your-brand-color2);
}
```

### Extending Functionality

```javascript
// Add custom export formats
function downloadCustomFormat() {
  // Your custom export logic here
}

// Add analytics tracking
function trackQRGeneration(url, utmParams) {
  // Your analytics implementation
}
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style and conventions
- Test across multiple browsers and devices
- Update documentation for new features
- Ensure responsive design compatibility

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [QRCode.js](https://github.com/davidshimjs/qrcodejs) for the core QR generation library
- Modern CSS techniques for glassmorphism and gradient effects
- Community feedback for feature improvements and bug reports

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature idea? Please [open an issue](https://github.com/your-username/professional-qr-generator/issues) with:

- Clear description of the problem/feature
- Steps to reproduce (for bugs)
- Browser and device information
- Screenshots if applicable

## ⭐ Show Your Support

If this project helped you, please consider:

- Giving it a ⭐ on GitHub
- Sharing it with your network
- Contributing to the codebase
- Reporting bugs and suggesting improvements

---

**Made with ❤️ for the open-source community**
