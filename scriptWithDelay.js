let favorites = [];
let isFirstLoad = true;  // Flag to track if it's the first load

document.getElementById('submitButton').addEventListener('click', function() {
    isFirstLoad = false;  // Update the flag after the first load
    let category = document.getElementById('category').value;
    let sfwToggle = document.getElementById('sfwToggle').value;

    // Start loading message
    let loadingMessage = 'Loading';
    let img = document.getElementById('imagePlaceholder');
    img.src = "";  // clear the current image

    let loadingMessageElement = document.getElementById('loadingMessage');
    loadingMessageElement.innerText = loadingMessage;
    if (isFirstLoad) {
        loadingMessageElement.style.display = 'none';  // Hide the loading message on first load
    } else {
        loadingMessageElement.style.display = 'block';  // Show the loading message on subsequent requests
    }

    let loadingInterval = setInterval(() => {
        loadingMessage += '.';
        loadingMessageElement.innerText = loadingMessage;
    }, 500);  // Adds a dot every half a second

    // Delay before making the fetch request
    setTimeout(() => {
        fetch(`https://api.waifu.pics/${sfwToggle}/${category}`)
            .then(response => response.json())
            .then(data => {
                clearInterval(loadingInterval);  // Stop the loading message
                img.src = data.url;
                img.onclick = function() {
                    addToFavorites(img.src);
                }
                loadingMessageElement.innerText = '';  // Clear the loading message
            })
            .catch(err => {
                clearInterval(loadingInterval);  // Stop the loading message
                console.error(err);
                img.alt = 'Error loading image';
                loadingMessageElement.innerText = 'Error loading image';  // Update the loading message with the error message
            });
    }, 2000);  // 2 seconds delay
});

function addToFavorites(src) {
    if (favorites.includes(src)) return;
    favorites.push(src);
    let img = document.createElement('img');
    img.src = src;
    img.onclick = function() {
        removeFromFavorites(img.src);
        img.parentNode.removeChild(img);
    }
    document.getElementById('favoritesContainer').appendChild(img);
}

function removeFromFavorites(src) {
    let index = favorites.indexOf(src);
    if (index > -1) {
        favorites.splice(index, 1);
    }
}
