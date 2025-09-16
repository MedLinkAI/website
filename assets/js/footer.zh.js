// --- 1. Define your footer content (now with optional 'target' property) ---
const footerData = {
  linkColumns: [
    {
      title: '找到我们',
      links: [
        { text: 'GitHub', url: 'http://github.com/MedLinkAI-Limited', target: '_blank' },
      ]
    },
    {
      title: '公司',
      links: [
        { text: '关于我们', url: 'https://www.medlkai.com/zh/about' },
        { text: '联系我们', url: 'https://www.medlkai.com/zh/contact' }
      ]
    },
    {
      title: '服务',
      links: [
        { text: '预诊断', url: 'https://www.medlkai.com/zh/pre-diagnosis' },
        { text: '数据智能体', url: 'https://www.medlkai.com/zh/data-agent' },
        { text: '健康管理信息系统', url: 'https://www.medlkai.com/zh/hmis' },
        { text: '放大器', url: 'https://www.medlkai.com/zh/amplifier' },
        { text: '价格', url: 'https://www.medlkai.com/zh/pricing' }
      ]
    },
    {
      title: '支持',
      links: [
        { text: '常见问题', url: 'https://www.medlkai.com/zh/faq' }
      ]
    }
  ],
  legalInfo: {
    logo: {
      url: 'https://www.medlkai.com/zh/',
      src: 'https://www.medlkai.com/assets/img/logo/logo-banner-white.svg',
      alt: 'MedLinkAI Logo',
      width: '200'
    },
    links: [
      { text: 'Cookie 政策', url: 'https://www.medlkai.com/zh/legal/cookie-policy' },
      { text: '隐私政策', url: 'https://www.medlkai.com/zh/legal/privacy-policy' },
      { text: '使用条款', url: 'https://www.medlkai.com/zh/legal/terms-of-use' },
      { text: '网站地图', url: 'https://www.medlkai.com/sitemap.xml', target: '_blank' }
    ],
    lastUpdate: '2025年09月16日',
    copyright: '&copy; MedLinkAI Limited 保留所有权利。'
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
          最后更新：${data.legalInfo.lastUpdate}
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
  generateFooter('footer-zh', footerData);
});