const apiKey = "wIaaeoqPtAEJ9UGWdJtbb1axZjlQumWBiEr2Na4q"; 

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const imageGrid = document.getElementById('image-grid');
const popularImage = document.getElementById('popular-image');

// Fetch the most popular image from NASA API
fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    // Create an image element and set its attributes
    const img = document.createElement('img');
    img.src = data.url;
    img.alt = data.title;
    img.title = data.title;
    img.className = 'popular-image';
    
    // Add the image to the popularImage container
    popularImage.appendChild(img);
  })
  .catch(error => console.log(error));

// Handle form submission and fetch images from NASA API
searchForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent page reload on form submit
  
  const searchQuery = searchInput.value;
  
  // Clear previous search results
  imageGrid.innerHTML = '';
  
  // Fetch images from NASA API based on search query
  fetch(`https://images-api.nasa.gov/search?q=${searchQuery}&media_type=image`)
    .then(response => response.json())
    .then(data => {
      // Loop through each image in the search results and create an image element for it
      data.collection.items.forEach(item => {
        const img = document.createElement('img');
        img.src = item.links[0].href;
        img.alt = item.data[0].title;
        img.title = item.data[0].title;
        
        // Add the image to the imageGrid container
        imageGrid.appendChild(img);
      });
    })
    .catch(error => console.log(error));
});
