AOS.init({ duration: 800, });

let scrollpos = window.scrollY
const header = document.querySelector(".navbar")
const header_height = header.offsetHeight
const add_class_on_scroll = () => header.classList.add("scrolled", "shadow-sm")
const remove_class_on_scroll = () => header.classList.remove("scrolled", "shadow-sm")
window.addEventListener('scroll', function() {
  scrollpos = window.scrollY;
  if (scrollpos >= header_height) {
    add_class_on_scroll()
  } else {
    remove_class_on_scroll()
  }
  console.log(scrollpos)
})

document.addEventListener('DOMContentLoaded', function() {
  // --- Configuration ---
  const container = document.querySelector('.background-warp');
  const logoSrc = 'https://www.medlkai.com/assets/img/logo/logo.svg'; // Make sure this path is correct!
  const logoSize = 200; // The size of each logo in pixels
  const blinkInterval = 200; // Time in milliseconds between each new blink starts

  if (!container) return;

  // --- Create the Logo Grid ---
  // Disable the original background to prevent double images
  container.style.backgroundImage = 'none';

  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  const cols = Math.ceil(containerWidth / logoSize);
  const rows = Math.ceil(containerHeight / logoSize);

  let logos = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const logo = document.createElement('img');
      logo.src = logoSrc;
      logo.className = 'blinking-logo';

      logo.style.width = `${logoSize}px`;
      logo.style.height = `${logoSize}px`;
      logo.style.top = `${i * logoSize}px`;
      logo.style.left = `${j * logoSize}px`;

      container.appendChild(logo);
      logos.push(logo);
    }
  }

  // --- Start the Random Blinking Effect ---
  setInterval(() => {
    // Pick a random logo that isn't already blinking
    const availableLogos = logos.filter(logo => !logo.classList.contains('is-blinking'));
    if (availableLogos.length === 0) return;

    const randomIndex = Math.floor(Math.random() * availableLogos.length);
    const logoToBlink = availableLogos[randomIndex];

    // Add the class to trigger the CSS animation
    logoToBlink.classList.add('is-blinking');

    // Remove the class after the animation is done
    // This allows the same logo to be blinked again later
    logoToBlink.addEventListener('animationend', () => {
      logoToBlink.classList.remove('is-blinking');
    }, { once: true }); // 'once: true' automatically removes the event listener

  }, blinkInterval);

});

document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menu-toggle');
  const fullscreenMenu = document.getElementById('fullscreen-menu');
  
  if (menuToggle && fullscreenMenu) {
    menuToggle.addEventListener('click', function() {
      // Toggle the 'active' class on both the button and the menu
      this.classList.toggle('active');
      fullscreenMenu.classList.toggle('active');
      
      // Toggle a class on the body to prevent scrolling when the menu is open
      document.body.classList.toggle('no-scroll');
    });
  }
});

async function toggleDropdown() {
  var dropdownMenu = document.getElementById('dropdownMenu');
  dropdownMenu.classList.toggle('show');
}

async function switchToEnglish() {
  let url = new URL(window.location.href);
  if (url.pathname.startsWith("/zh/")) {
    url.pathname = url.pathname.replace(/^\/zh\//, "/");
    url.pathname = url.pathname.replace(/index\.html$/, "");
    window.location.href = url.toString();
  }
}

async function switchToChinese() {
  let url = new URL(window.location.href);
  if (!url.pathname.startsWith("/zh/")) {
    url.pathname = url.pathname.replace(/index\.html$/, "");
    url.pathname = "/zh" + url.pathname;
    window.location.href = url.toString();
  }
}

