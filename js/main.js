fetch('posts.json')
  .then(response => response.json())
  .then(posts => {
    const postContainer = document.getElementById('posts');
    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');
      postElement.innerHTML = `
        <h3><a href="${post.url}">${post.title}</a></h3>
        <p class="post-date">${post.date}</p>
      `;
      postContainer.appendChild(postElement);
    });
  })
  .catch(error => console.error('Error loading posts:', error));
  
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// Load saved theme on page load
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}

const searchInput = document.getElementById('search');
searchInput.addEventListener('input', e => {
  const query = e.target.value.toLowerCase();
  const posts = document.querySelectorAll('.post');
  posts.forEach(post => {
    const title = post.querySelector('h3').innerText.toLowerCase();
    post.style.display = title.includes(query) ? '' : 'none';
  });
});

let postsPerPage = 5;
let currentPage = 1;

function loadPosts(posts) {
  const container = document.getElementById('posts');
  container.innerHTML = '';
  let start = 0;
  let end = postsPerPage * currentPage;
  posts.slice(start, end).forEach(post => {
    // create post elements as above
  });
}

document.getElementById('load-more').addEventListener('click', () => {
  currentPage++;
  loadPosts(allPosts);
});

function readingTime(text) {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}