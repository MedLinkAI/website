// --- 1. Define your menu content in a structured array ---
const menuData = [
  {
    title: '公司',
    links: [
      { text: '关于我们', url: 'https://www.medlkai.com/zh/about.html' },
      { text: '联系我们', url: 'https://www.medlkai.com/zh/contact.html' }
    ]
  },
  {
    title: '服务',
    links: [
      { text: '预诊断', url: 'https://www.medlkai.com/zh/pre-diagnosis.html' },
      { text: '数据智能体', url: 'https://www.medlkai.com/zh/data-agent.html' },
      { text: '健康管理信息系统', url: 'https://www.medlkai.com/zh/hmis.html' },
      { text: '放大器', url: 'https://www.medlkai.com/zh/amplifier.html' },
      { text: '价格', url: 'https://www.medlkai.com/zh/pricing.html' }
    ]
  },
  {
    title: '支持',
    links: [
      { text: '常见问题', url: 'https://www.medlkai.com/zh/faq.html' }
    ]
  }
];


// --- 2. Create a function to generate the menu ---
function generateMenu() {
  // Find the main container element
  const menuContainer = document.getElementById('fullscreen-menu-zh');
  if (!menuContainer) return; // Exit if the container isn't found

  // Create the main row element that will hold the columns
  const row = document.createElement('div');
  row.className = 'row';

  // Loop through each category in our menuData
  menuData.forEach(category => {
    // Create a column for this category
    const col = document.createElement('div');
    col.className = 'col-sm';

    // Create the title (h3)
    const title = document.createElement('h3');
    title.className = 'menu-title';
    title.textContent = category.title;

    // Create the list (ul)
    const ul = document.createElement('ul');
    ul.className = 'menu-list';

    // Loop through the links for this category
    category.links.forEach(link => {
      // Create the list item (li)
      const li = document.createElement('li');

      // Create the anchor link (a)
      const a = document.createElement('a');
      a.href = link.url;
      a.textContent = link.text;
      a.className = 'link-fancy link-fancy-light me-2';

      // Append the link to the list item, and the list item to the list
      li.appendChild(a);
      ul.appendChild(li);
    });

    // Append the title and the list to the column
    col.appendChild(title);
    col.appendChild(ul);
    
    // Append the completed column to the main row
    row.appendChild(col);
  });

  // Append the fully constructed row to the main container
  menuContainer.appendChild(row);
}

// --- 3. Run the function after the page has loaded ---
document.addEventListener('DOMContentLoaded', generateMenu);