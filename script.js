async function get() {
    const info = await fetch("https://web-production-b51f.up.railway.app/api/articles");
    const data = await info.json()
    console.log(data)
}
get()



const articlesContainer = document.getElementById('articles-container');
const navLinks = document.querySelector('.nav-links');
const menuToggle = document.querySelector('.menu-toggle');
const navItems = document.querySelectorAll('.nav-links li a');
// رابط الـ API الخاص بك
const API_URL = 'https://web-production-b51f.up.railway.app/api/articles'; // ← غيّر هذا بالرابط الحقيقي

let allArticles = [];

// عرض المقالات
function displayArticles(articles) {
  articlesContainer.innerHTML = '';
  articles.forEach(article => {
    if (article.category === "نبذة" || article.category === 'سياسة الاستخدام') {
      return; // تخطي هذا المقال
    }
    const card = document.createElement('div');
    card.className = 'article-card';
    card.innerHTML = `
      <h2 class="article-title">${article.title}</h2>
      <p class="article-category">${article.category}</p>
      <p class="article-snippet">${article.content.slice(0, 100)}...</p>
    `;
    card.onclick = () => {
      localStorage.setItem('selectedArticle', JSON.stringify(article));
      window.location.href = 'article.html';
    };
    articlesContainer.appendChild(card);
  });
}

// تحميل البيانات من API
async function fetchArticles() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    allArticles = data;
    displayArticles(allArticles);
  } catch (error) {
    articlesContainer.innerHTML = '<p>حدث خطأ أثناء تحميل المقالات.</p>';
    console.error('Error fetching articles:', error);
  }
}

// فلترة حسب التصنيف
document.querySelectorAll('[data-category]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const category = link.getAttribute('data-category');
    const filtered = allArticles.filter(article => article.category === category);
    displayArticles(filtered);
  });
});

menuToggle.onclick = () => {
    navLinks.classList.toggle('show');
  };
  
  // عند الضغط على أي رابط داخل القائمة، تغلق القائمة في الشاشات الصغيرة
navItems.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove('show');
      }
    });
  });
  
  // تحميل المقالات عند تحميل الصفحة
  window.onload = fetchArticles;

  console.log(menuToggle, navLinks); // تحقق إذا كانت العناصر موجودة


