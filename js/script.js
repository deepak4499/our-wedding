// ========== INITIALIZATION ==========
const mailbox = document.getElementById("mailbox");
const music = document.getElementById("music");
const confettiCanvas = document.getElementById("confettiCanvas");
const cards = document.querySelectorAll(".card");
const photos = document.querySelectorAll(".photo-frame");
const loader = document.getElementById("loader");
const langToggle = document.getElementById("langToggle");

let opened = false;
let currentLang = 'en';

// ========== LOADING SCREEN ==========
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("hidden");
  }, 3000);
});

// ========== COUNTDOWN TIMER ==========
const weddingDate = new Date("2026-02-08T10:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
  if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
  if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
  if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');

  if (distance < 0) {
    const countdownTimer = document.querySelector(".countdown-timer");
    if (countdownTimer) {
      countdownTimer.innerHTML = "<h2>✨ Our Forever Begins! ✨</h2>";
    }
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ========== SLIDESHOW COUNTDOWN ==========
function updateSlideshowCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const slideDaysEl = document.getElementById("slideDays");
  const slideHoursEl = document.getElementById("slideHours");
  const slideMinutesEl = document.getElementById("slideMinutes");
  const slideSecondsEl = document.getElementById("slideSeconds");

  if (slideDaysEl) slideDaysEl.textContent = String(days).padStart(2, '0');
  if (slideHoursEl) slideHoursEl.textContent = String(hours).padStart(2, '0');
  if (slideMinutesEl) slideMinutesEl.textContent = String(minutes).padStart(2, '0');
  if (slideSecondsEl) slideSecondsEl.textContent = String(seconds).padStart(2, '0');

  if (distance < 0) {
    const slideshowCountdown = document.querySelector(".slideshow-countdown");
    if (slideshowCountdown) {
      slideshowCountdown.innerHTML = "<h3 style='text-align:center; padding:20px 0;'>✨ Our Forever Begins ✨</h3>";
    }
  }
}

// ========== LANGUAGE TOGGLE ==========
function updateLanguage() {
  // Apply current language to all elements
  if (document.body.classList.contains('lang-tamil')) {
    document.querySelectorAll('.lang-en').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.lang-ta').forEach(el => el.style.display = 'inline');
  } else {
    document.querySelectorAll('.lang-en').forEach(el => el.style.display = 'inline');
    document.querySelectorAll('.lang-ta').forEach(el => el.style.display = 'none');
  }
}

document.getElementById("langToggle").addEventListener("click", () => {
  currentLang = currentLang === 'en' ? 'ta' : 'en';
  document.querySelectorAll("[data-en][data-ta]").forEach(el => {
    el.textContent = el.getAttribute(`data-${currentLang}`);
  });
});

// ========== DARK MODE ==========
document.getElementById("darkModeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const icon = document.querySelector("#darkModeToggle i");
  icon.className = document.body.classList.contains("dark-mode") ? "fas fa-sun" : "fas fa-moon";
});

// ========== MUSIC TOGGLE (Simple On/Off) ==========
let musicPlaying = false;

document.getElementById("musicToggle").addEventListener("click", () => {
  if (musicPlaying) {
    music.pause();
    musicPlaying = false;
    document.querySelector("#musicToggle i").className = "fas fa-music";
  } else {
    music.play().catch(err => console.log("Music play blocked:", err));
    musicPlaying = true;
    document.querySelector("#musicToggle i").className = "fas fa-volume-up";
  }
});

// ========== MODAL CLOSE ==========
document.querySelectorAll(".modal-close").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".modal").forEach(modal => modal.classList.remove("active"));
  });
});

// ========== LANGUAGE TOGGLE ==========
if (langToggle) {
  langToggle.addEventListener("click", (e) => {
    e.preventDefault();
    
    // Toggle language class on body
    document.body.classList.toggle('lang-tamil');
    
    // Update button to show current language
    if (document.body.classList.contains('lang-tamil')) {
      langToggle.innerHTML = '<i class="fas fa-language"></i> த';
      currentLang = 'ta';
    } else {
      langToggle.innerHTML = '<i class="fas fa-language"></i> EN';
      currentLang = 'en';
    }
    
    console.log("Language switched to:", currentLang);
  });
}

document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("active");
  });
});

// ========== MAILBOX CLICK ==========
mailbox.addEventListener("click", () => {
  if (opened) return;
  opened = true;

  mailbox.classList.add("open");
  
  // Play music
  music.currentTime = 0;
  music.play().catch(err => console.log("Music play blocked:", err));
  musicPlaying = true;
  document.querySelector("#musicToggle i").className = "fas fa-volume-up";

  // Show confetti animation
  confettiCanvas.style.opacity = 1;
  startConfetti();

  // Hide mailbox and enable scrolling to reveal cards
  setTimeout(() => {
    const mailboxContainer = document.querySelector(".mailbox-container");
    mailboxContainer.classList.add("hidden");
    
    // Completely remove from layout after fade animation
    setTimeout(() => {
      mailboxContainer.style.display = "none";
    }, 800);
    
    // Hide countdown timer after clicking
    const countdownTimer = document.querySelector(".countdown-timer");
    if (countdownTimer) {
      countdownTimer.style.display = "none";
    }
    
    // Show and start slideshow countdown
    const slideshowCountdown = document.querySelector(".slideshow-countdown");
    if (slideshowCountdown) {
      slideshowCountdown.style.display = "flex";
      updateSlideshowCountdown();
      setInterval(updateSlideshowCountdown, 1000);
    }
    
    // Make slideshow visible
    const slideshow = document.querySelector('.memories-slideshow');
    if (slideshow) {
      slideshow.classList.add("visible");
    }
    
    document.querySelector(".cards").classList.add("visible");
    
    // Scroll to top to show countdown and slideshow
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
    
    // Enable scroll reveal for cards and photos
    setTimeout(() => {
      checkScroll();
    }, 1000);
    
    // Cards and photos will be revealed on scroll
    checkScroll();
  }, 1000);
});

// Keyboard accessibility
mailbox.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    mailbox.click();
  }
});

cards.forEach(card => {
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      card.click();
    }
  });
});

// ========== SCROLL-BASED REVEAL ==========
let scrollTimeout;
let isChecking = false;

// ========== INTERSECTION OBSERVER FOR FLIP ANIMATION ==========
// Create intersection observer to detect when cards enter/exit viewport
const flipObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const element = entry.target;
    
    if (entry.isIntersecting) {
      // Element is visible - flip if it was previously invisible
      if (element.classList.contains('was-invisible')) {
        element.classList.remove('was-invisible');
        element.classList.remove('flip');
        // Trigger reflow
        void element.offsetWidth;
        setTimeout(() => {
          element.classList.add('flip');
        }, 100);
      }
    } else {
      // Element is not visible - mark it and remove flip
      if (element.classList.contains('visible') && element.classList.contains('flip')) {
        element.classList.add('was-invisible');
        element.classList.remove('flip');
      }
    }
  });
}, {
  threshold: 0.1, // Trigger when 10% of element is visible
  rootMargin: '0px'
});

function checkScroll() {
  if (isChecking) return;
  isChecking = true;
  
  requestAnimationFrame(() => {
    const windowHeight = window.innerHeight;
    
    // Reveal cards on scroll with flip animation
    cards.forEach((card) => {
      const cardRect = card.getBoundingClientRect();
      const cardTrigger = windowHeight * 0.85; // More generous trigger
      
      if (cardRect.top < cardTrigger && cardRect.bottom > 0 && !card.classList.contains("visible")) {
        card.classList.add("visible");
        
        // Start observing card for flip animation when scrolling
        flipObserver.observe(card);
        
        // Flip card after a short delay
        setTimeout(() => {
          card.classList.add("flip");
        }, 400);
        
        // Apply language after card is visible
        setTimeout(() => {
          updateLanguage();
        }, 100);
      }
    });
    
    // Reveal photos on scroll with flip effect
    photos.forEach((photo) => {
      const photoRect = photo.getBoundingClientRect();
      const photoTrigger = windowHeight * 0.85;
      
      if (photoRect.top < photoTrigger && photoRect.bottom > 0 && !photo.classList.contains("visible")) {
        photo.classList.add("visible");
        
        // Start observing photo for flip animation when scrolling
        flipObserver.observe(photo);
        
        setTimeout(() => {
          photo.classList.add('flip');
        }, 400);
      }
    });
    
    // Reveal slideshow on scroll
    const slideshow = document.querySelector('.memories-slideshow');
    if (slideshow) {
      const slideshowRect = slideshow.getBoundingClientRect();
      const slideshowTrigger = windowHeight * 0.75;
      
      if (slideshowRect.top < slideshowTrigger && !slideshow.classList.contains("visible")) {
        slideshow.classList.add("visible");
      }
    }
    
    isChecking = false;
  });
}

// Listen for scroll events with immediate check
window.addEventListener("scroll", () => {
  if (opened) {
    checkScroll();
  }
}, { passive: true });

// Also check on resize
window.addEventListener("resize", () => {
  if (opened) {
    checkScroll();
  }
}, { passive: true });

// ========== PHOTO CAROUSEL ==========
document.querySelectorAll(".photo-carousel").forEach(carousel => {
  const images = carousel.querySelectorAll(".carousel-img");
  const prevBtn = carousel.querySelector(".carousel-btn.prev");
  const nextBtn = carousel.querySelector(".carousel-btn.next");
  const dotsContainer = carousel.querySelector(".carousel-dots");
  
  if (images.length <= 1) return;

  let currentIndex = 0;

  // Create dots
  images.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = "carousel-dot";
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = carousel.querySelectorAll(".carousel-dot");

  function goToSlide(index) {
    images.forEach(img => img.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));
    currentIndex = index;
    images[currentIndex].classList.add("active");
    dots[currentIndex].classList.add("active");
  }

  prevBtn.addEventListener("click", () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    goToSlide(newIndex);
  });

  nextBtn.addEventListener("click", () => {
    const newIndex = (currentIndex + 1) % images.length;
    goToSlide(newIndex);
  });

  // Auto-rotate every 5 seconds
  setInterval(() => {
    const newIndex = (currentIndex + 1) % images.length;
    goToSlide(newIndex);
  }, 5000);
});

// ========== ADD TO CALENDAR ==========
document.getElementById("addGoogleCal").addEventListener("click", () => {
  const start = "20251214T100000";
  const end = "20251214T180000";
  const title = "Deepakkumar & Vijayadurga Wedding";
  const details = "Join us for our special day!";
  const location = "Sri Vasavi Mahal,74, Big St, Pavazhakundur, Tiruvannamalai, Annamalai R.F., Tamil Nadu 606601";
  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
  window.open(url, '_blank');
});

document.getElementById("addAppleCal").addEventListener("click", () => {
  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:20251214T100000
DTEND:20251214T180000
SUMMARY:Deepakkumar & Vijayadurga Wedding
DESCRIPTION:Join us for our special day!
LOCATION:Sri Vasavi Mahal,74, Big St, Pavazhakundur, Tiruvannamalai, Annamalai R.F., Tamil Nadu 606601
END:VEVENT
END:VCALENDAR`;
  
  const blob = new Blob([icsContent], { type: 'text/calendar' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'wedding.ics';
  link.click();
});

// ========== VENUE MAP ==========
document.getElementById("venueMap").addEventListener("click", () => {
  const venue = "Sri Vasavi Mahal,74, Big St, Pavazhakundur, Tiruvannamalai, Annamalai R.F., Tamil Nadu 606601";
  window.open(`https://maps.google.com/?q=${encodeURIComponent(venue)}`);
});

// ========== CONFETTI ==========
let confettiCtx, confettiPieces = [];

function startConfetti() {
  confettiCtx = confettiCanvas.getContext("2d");
  resizeCanvas(confettiCanvas);
  for (let i = 0; i < 150; i++) {
    confettiPieces.push({
      x: Math.random() * confettiCanvas.width,
      y: -20,
      size: Math.random() * 8 + 3,
      speed: Math.random() * 3 + 2,
      color: ['#ff69b4', '#ffd700', '#87ceeb', '#98fb98', '#dda0dd'][Math.floor(Math.random() * 5)],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.1
    });
  }
  animateConfetti();
  
  // Stop confetti after 5 seconds
  setTimeout(() => {
    confettiCanvas.style.opacity = 0;
  }, 5000);
}

function animateConfetti() {
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiPieces.forEach(c => {
    c.y += c.speed;
    c.rotation += c.rotationSpeed;
    
    confettiCtx.save();
    confettiCtx.translate(c.x, c.y);
    confettiCtx.rotate(c.rotation);
    confettiCtx.fillStyle = c.color;
    confettiCtx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size);
    confettiCtx.restore();
  });
  
  if (confettiCanvas.style.opacity !== '0') {
    requestAnimationFrame(animateConfetti);
  }
}

// ========== HELPER FUNCTIONS ==========
function resizeCanvas(canvas) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", () => {
  resizeCanvas(confettiCanvas);
});

// Initialize canvas size
resizeCanvas(confettiCanvas);

// ========== PHOTO MEMORIES SLIDESHOW ==========
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
  const slides = document.querySelectorAll('.slide');
  const indicators = document.querySelectorAll('.indicator');
  
  if (!slides.length) return;
  
  // Wrap around
  if (index >= slides.length) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide = index;
  }
  
  // Hide all slides
  slides.forEach(slide => {
    slide.classList.remove('active');
  });
  
  // Remove active from all indicators
  indicators.forEach(indicator => {
    indicator.classList.remove('active');
  });
  
  // Show current slide
  slides[currentSlide].classList.add('active');
  if (indicators[currentSlide]) {
    indicators[currentSlide].classList.add('active');
  }
}

function changeSlide(direction) {
  showSlide(currentSlide + direction);
  resetSlideInterval();
}

function goToSlide(index) {
  showSlide(index);
  resetSlideInterval();
}

function resetSlideInterval() {
  clearInterval(slideInterval);
  startAutoSlide();
}

function startAutoSlide() {
  slideInterval = setInterval(() => {
    showSlide(currentSlide + 1);
  }, 5000); // Change slide every 5 seconds
}

// Start auto-slide when page loads
if (document.querySelector('.memories-slideshow')) {
  showSlide(0);
  
  // Start auto-play after mailbox opens
  setTimeout(() => {
    if (opened) {
      startAutoSlide();
    }
  }, 2000);
}

// Pause slideshow on hover
const slideshowContainer = document.querySelector('.slideshow-container');
if (slideshowContainer) {
  slideshowContainer.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });
  
  slideshowContainer.addEventListener('mouseleave', () => {
    startAutoSlide();
  });
}

console.log("🎉 Wedding Invitation Enhanced - All Features Loaded! 💕");
