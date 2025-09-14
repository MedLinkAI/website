document.addEventListener('DOMContentLoaded', function() {
  // --- Configuration ---
  const container = document.querySelector('.background-warp');
  const logoSrc = 'assets/img/logo/logo.svg'; // Make sure this path is correct!
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