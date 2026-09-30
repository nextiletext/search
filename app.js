// Sample database of pages/articles you want your search engine to look through
const searchDatabase = [
    {
        title: "Introduction to HTML5",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
        snippet: "Learn the fundamentals of HTML5 structure, semantic tags, and how to build web pages from scratch."
    },
    {
        title: "CSS Flexbox Guide",
        url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout",
        snippet: "A comprehensive guide to mastering CSS Flexbox for responsive layouts and component alignment."
    },
    {
        title: "JavaScript Essentials for Beginners",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        snippet: "Discover variables, functions, loops, and DOM manipulation to make your websites interactive."
    },
    {
        title: "Hosting Sites on GitHub Pages",
        url: "https://pages.github.com/",
        snippet: "Host your static HTML, CSS, and JavaScript websites directly from a GitHub repository for free."
    }
];

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const resultsContainer = document.getElementById('results-container');
const resultsCount = document.getElementById('results-count');

function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    
    if (query === "") {
        resultsContainer.innerHTML = "";
        resultsCount.textContent = "";
        return;
    }

    // Filter database based on title or snippet match
    const filteredResults = searchDatabase.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.snippet.toLowerCase().includes(query)
    );

    displayResults(filteredResults, query);
}

function displayResults(results, query) {
    resultsContainer.innerHTML = "";
    
    if (results.length === 0) {
        resultsCount.textContent = `No results found for "${query}"`;
        return;
    }

    resultsCount.textContent = `Found ${results.length} result(s) for "${query}"`;

    results.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('result-card');
        
        card.innerHTML = `
            <h3><a href="${item.url}" target="_blank">${highlightMatch(item.title, query)}</a></h3>
            <p>${highlightMatch(item.snippet, query)}</p>
        `;
        
        resultsContainer.appendChild(card);
    });
}

// Optional: Highlight search terms in results
function highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark style="background-color: #ffeaa7;">$1</mark>');
}

// Event Listeners
searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    } else {
        performSearch(); // Real-time search as you type
    }
});
