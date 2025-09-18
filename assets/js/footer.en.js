// --- 1. Define your footer content (now with optional 'target' property) ---
const footerData = {
  linkColumns: [
    {
      title: 'Find us',
      links: [
        { text: 'GitHub', url: 'http://github.com/MedLinkAI', target: '_blank' },
      ]
    },
    {
      title: 'Company',
      links: [
        { text: 'About Us', url: 'https://www.medlkai.com/company/' },
        { text: 'Contact', url: 'https://www.medlkai.com/company/contact' }
      ]
    },
    {
      title: 'Services',
      links: [
        { text: 'Overview & Pricing', url: 'https://www.medlkai.com/services/' },
        { text: 'Pre-diagnosis', url: 'https://www.medlkai.com/services/pre-diagnosis' },
        { text: 'Data Agent', url: 'https://www.medlkai.com/services/data-agent' },
        { text: 'HMIS', url: 'https://www.medlkai.com/services/hmis' },
        { text: 'Amplifier', url: 'https://www.medlkai.com/services/amplifier' },
      ]
    },
    {
      title: 'Support',
      links: [
        { text: 'FAQ', url: 'https://www.medlkai.com/support/faq' }
      ]
    }
  ],
  legalInfo: {
    logo: {
      url: 'https://www.medlkai.com/',
      src: 'https://www.medlkai.com/assets/img/logo/logo-banner-white.svg',
      alt: 'MedLinkAI Logo',
      width: '200'
    },
    links: [
      { text: 'Cookie Policy', url: 'https://www.medlkai.com/legal/cookie-policy' },
      { text: 'Privacy Policy', url: 'https://www.medlkai.com/legal/privacy-policy' },
      { text: 'Terms of Use', url: 'https://www.medlkai.com/legal/terms-of-use' },
      { text: 'Site Map', url: 'https://www.medlkai.com/sitemap.xml', target: '_blank' }
    ],
    lastUpdate: '09/16/2025',
    copyright: '&copy; MedLinkAI Limited all Rights Reserved.'
  }
};


// --- 2. Create a function to generate the footer HTML ---
function generateFooter(targetId, data) {
  const footerElement = document.getElementById(targetId);
  if (!footerElement) {
    console.error(`Footer element with id "${targetId}" not found.`);
    return;
  }

  // --- Generate the top part (link columns) ---
  const linkColumnsHtml = data.linkColumns.map((col, index) => {
    const columnClass = index < data.linkColumns.length - 1 ? 'col border-end border-dark' : 'col';
    
    const linksHtml = col.links.map(link => {
      // **UPDATED LOGIC HERE**
      // Check for the target property and add attributes if it exists
      const targetAttr = link.target === '_blank' ? 'target="_blank" rel="noopener noreferrer"' : '';
      return `
      <li class="nav-item">
        <a href="${link.url}" class="link-fancy link-fancy-light" ${targetAttr}>${link.text}</a>
      </li>
    `;
    }).join('');

    return `
      <div class="${columnClass}">
        <span class="h6">${col.title}</span>
        <ul class="nav flex-column">${linksHtml}</ul>
      </div>
    `;
  }).join('');
  
  // --- Generate the bottom part (legal info) ---
  const legalLinksHtml = data.legalInfo.links.map(link => {
    // **UPDATED LOGIC HERE**
    // Check for the target property and add attributes if it exists
    const targetAttr = link.target === '_blank' ? 'target="_blank" rel="noopener noreferrer"' : '';
    return `
    <a href="${link.url}" class="link-fancy link-fancy-light mx-2" ${targetAttr}>${link.text}</a>
  `;
  }).join('');

  const legalInfoHtml = `
    <div class="container small py-4 border-top border-dark">
      <div class="row align-items-center text-center">
        <div class="col-12 col-md-4 text-md-start mb-3 mb-md-0">
          <a href="${data.legalInfo.logo.url}">
            <img src="${data.legalInfo.logo.src}" alt="${data.legalInfo.logo.alt}" style="width: ${data.legalInfo.logo.width}px;">
          </a>
        </div>
        <div class="col-12 col-md-4 mb-3 mb-md-0">
          ${legalLinksHtml}
        </div>
        <div class="col-12 col-md-4 mb-3 mb-md-0">
          Last update: ${data.legalInfo.lastUpdate}
        </div>
        <div class="col-12 col-md-4 text-md-end">
          <span>${data.legalInfo.copyright}</span>
        </div>
      </div>
    </div>
  `;
  
  // --- Combine all parts and inject into the footer element ---
  footerElement.innerHTML = `
    <div class="container py-vh-3 text-secondary fw-lighter">
      <div class="row">
        ${linkColumnsHtml}
      </div>
    </div>
    ${legalInfoHtml}
  `;
}


// --- 3. Run the function after the page has fully loaded ---
document.addEventListener('DOMContentLoaded', () => {
  generateFooter('footer-en', footerData);
});