// --- 1. Define your menu content in a structured array ---
const menuData = [
  {
    title: 'Company',
    links: [
      { text: 'About Us', url: '/about.html' },
      { text: 'Careers', url: '/careers.html' },
      { text: 'Press', url: '/press.html' },
      { text: 'Contact', url: '/contact.html' }
    ]
  },
  {
    title: 'Services',
    links: [
      { text: 'Our System', url: '/system.html' },
      { text: 'Features', url: '/features.html' },
      { text: 'Pricing', url: '/pricing.html' },
      { text: 'Integrations', url: '/integrations.html' }
    ]
  },
  {
    title: 'Support',
    links: [
      { text: 'Help Center', url: '/help-center.html' },
      { text: 'FAQ', url: '/faq.html' },
      { text: 'Documentation', url: '/documentation.html' }
    ]
  }
];


// --- 2. Create a function to generate the menu ---
function generateMenu() {
  // Find the main container element
  const menuContainer = document.getElementById('fullscreen-menu-en');
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