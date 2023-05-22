const categories = [
    "waifu",
    "neko",
    "shinobu",
    "megumin",
    "bully",
    "cuddle",
    "cry",
    "hug",
    "awoo",
    "kiss",
    "lick",
    "pat",
    "smug",
    "bonk",
    "yeet",
    "blush",
    "smile",
    "wave",
    "highfive",
    "handhold",
    "nom",
    "bite",
    "glomp",
    "slap",
    "kill",
    "kick",
    "happy",
    "wink",
    "poke",
    "dance",
    "cringe"
];

const categoryDropdown = document.getElementById('category');

categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.text = category;
    categoryDropdown.add(option);
});

document.getElementById('submitButton').addEventListener('click', function() {
    const category = document.getElementById('category').value;
    const type = document.getElementById('type').value;
    const imageDisplay = document.getElementById('imageDisplay');

    const apiUrl = `https://api.waifu.pics/${type}/${category}`;
    const loadingText = document.createTextNode('Loading...');
    imageDisplay.innerHTML = '';
    imageDisplay.appendChild(loadingText);

    let dots = '';

    const loadingInterval = setInterval(function() {
        if (dots.length < 3) {
            dots += '.';
        } else {
            dots = '';
        }
        loadingText.textContent = 'Loading' + dots;
    }, 500);

    setTimeout(function() {
        fetch(apiUrl, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            const image = new Image();
            image.onload = function() {
                clearInterval(loadingInterval);
                imageDisplay.innerHTML = '';
                imageDisplay.appendChild(image);
            };
            image.onerror = function() {
                clearInterval(loadingInterval);
                console.error('Error: Failed to load the image.');
                imageDisplay.textContent = 'Failed to load the image.';
            };
            image.src = data.url;
            image.alt = '';
            image.style.maxWidth = '100%';
            image.style.maxHeight = '100%';
            image.style.borderRadius = '10px';
            image.style.boxShadow = '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)';
        })
        .catch(error => {
            clearInterval(loadingInterval);
            console.error('Error:', error);
            imageDisplay.textContent = 'Failed to load the image.';
        });
    }, 2000); // Delay of 2 seconds (2000 milliseconds) before fetching the data
});
