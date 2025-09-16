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

(function(){
  const btn = document.getElementById('dropdownLanguage');
  const menu = document.getElementById('dropdownMenu');
  if (!btn || !menu) {
    console.warn('Dropdown portal: missing elements #dropdownLanguage or #dropdownMenu');
    return;
  }

  let isOpen = false;
  const placeholder = document.createComment('dropdown-placeholder');
  const PORTAL_Z = 3000;

  function positionMenu(){
    const btnRect = btn.getBoundingClientRect();

    // temporarily make menu measurable if currently display:none
    const prevDisplay = menu.style.display;
    const prevVis = menu.style.visibility;
    menu.style.visibility = 'hidden';
    menu.style.display = 'block';
    menu.style.position = 'fixed';
    menu.style.left = '0px';
    menu.style.top = '0px';

    const mRect = menu.getBoundingClientRect();
    let left = btnRect.left;
    let top = btnRect.bottom;

    // keep small page padding
    const PAD = 8;
    // adjust right overflow
    if (left + mRect.width > window.innerWidth - PAD) {
      left = Math.max(PAD, window.innerWidth - mRect.width - PAD);
    }
    // if no room below, show above
    if (btnRect.bottom + mRect.height > window.innerHeight - PAD) {
      top = btnRect.top - mRect.height;
      // if still negative, clamp to PAD
      if (top < PAD) top = PAD;
    }

    menu.style.left = Math.round(left) + 'px';
    menu.style.top  = Math.round(top)  + 'px';

    // restore visibility/display (but keep it visible if opened)
    menu.style.visibility = prevVis;
    menu.style.display = isOpen ? 'block' : prevDisplay;
  }

  function onDocClick(e){
    if (e.target === btn || btn.contains(e.target) || menu.contains(e.target)) return;
    closeMenu();
  }
  function onKeyDown(e){
    if (e.key === 'Escape') closeMenu();
  }

  function openMenu(){
    if (isOpen) return;

    // leave a placeholder so we can restore the original DOM position later
    const parent = menu.parentNode;
    parent.insertBefore(placeholder, menu);

    // move to body
    document.body.appendChild(menu);
    menu.classList.add('portal');
    menu.style.position = 'fixed';
    menu.style.zIndex = PORTAL_Z;
    menu.style.display = 'block';
    positionMenu();

    isOpen = true;
    btn.setAttribute('aria-expanded', 'true');

    // add listeners (delay doc click binding so the click that opened it doesn't immediately close it)
    setTimeout(() => document.addEventListener('click', onDocClick), 0);
    window.addEventListener('resize', positionMenu);
    window.addEventListener('scroll', positionMenu, true); // capture scroll on ancestors
    document.addEventListener('keydown', onKeyDown);
  }

  function closeMenu(){
    if (!isOpen) return;

    document.removeEventListener('click', onDocClick);
    window.removeEventListener('resize', positionMenu);
    window.removeEventListener('scroll', positionMenu, true);
    document.removeEventListener('keydown', onKeyDown);

    // restore original position
    if (placeholder.parentNode) {
      placeholder.parentNode.insertBefore(menu, placeholder);
      placeholder.parentNode.removeChild(placeholder);
    }
    menu.classList.remove('portal');

    // reset inline styles we used
    menu.style.display = 'none';
    menu.style.position = '';
    menu.style.left = '';
    menu.style.top = '';
    menu.style.zIndex = '';

    isOpen = false;
    btn.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu(){
    if (isOpen) closeMenu(); else openMenu();
  }

  // expose global function so your existing onclick="toggleDropdown()" keeps working
  window.toggleDropdown = toggleMenu;

  // optional: if you want to attach via JS instead of inline onclick, uncomment:
  // btn.addEventListener('click', function(e){ e.stopPropagation(); toggleMenu(); });

})();

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