# Wedding Invitation - Interactive Mailbox 💌

A beautiful, interactive wedding invitation website featuring an animated mailbox that reveals invitation cards on scroll.

## ✨ Features

### Interactive Mailbox
- **Closed mailbox icon** displayed on initial page load
- **Click to open** - Clicking the mailbox plays background music and opens the door
- **Animated mailbox** with opening door and flag animation
- **Floating hearts** background animation after opening

### Scroll-Based Card Reveal
- **4 Beautiful cards** that pop out from the mailbox as you scroll down:
  1. **Wedding Details** - Names, date, time, and venue
  2. **About Us** - A heartfelt message about the couple
  3. **Our Journey** - The couple's love story
  4. **Special Message** - Placeholder for custom content

### Card Features
- **Cards appear on scroll down** - Each card pops out sequentially
- **Cards disappear on scroll up** - Cards return to the mailbox when scrolling back
- **Flip animation** - Cards flip from front to back to reveal content
- **Premium design** with elegant colors and typography

### Design Highlights
- **Premium color palette**: Deep purples, rose gold, and cream tones
- **Beautiful typography**: 
  - Playfair Display for headings
  - Cormorant Garamond for elegant text
  - Montserrat for body text
- **Fully responsive** - Works perfectly on desktop, tablet, and mobile devices
- **Smooth animations** throughout

## 🎨 Color Scheme

- **Background**: Deep purple gradient (#1a0033 to #3d1f4a)
- **Accents**: Rose gold (#c9a27a) and cream (#f4e4d7)
- **Cards**: Off-white with gradient borders
- **Text**: Deep purple (#4a2c5a) on cards

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

## 🎵 Music

Place your wedding music file at `music/bg.mp3`. The music will automatically play when the mailbox is opened (user interaction required by browsers).

## 🚀 Usage

1. Open `index.html` in a web browser
2. Click the mailbox to open it and start the music
3. Scroll down to reveal each invitation card
4. Scroll back up to see cards return to the mailbox

## 📝 Customization

### Update Wedding Details
Edit the content in `index.html` within the `.card-back` sections:
- Change names, date, venue in Card 1
- Update "About Us" message in Card 2
- Customize the journey story in Card 3
- Add your special message in Card 4

### Change Colors
Modify the color values in `css/style.css`:
- Background gradients in `body`
- Card colors in `.card-front` and `.card-back`
- Accent colors in `.detail-text`, `.card-ornament`, etc.

### Adjust Scroll Speed
In `js/script.js`, modify the `scrollStep` value:
```javascript
const scrollStep = isMobile ? 250 : 300; // Increase for slower scroll
```

## 🌟 Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 💡 Tips

- For best experience, view in fullscreen mode
- Ensure audio autoplay is allowed in your browser
- Use high-quality background music for better ambiance
- Test on different devices before sharing

---

**Made with ❤️ for a special celebration**
