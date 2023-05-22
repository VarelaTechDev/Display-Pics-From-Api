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

    const apiUrl = `https://api.waifu.pics/${type}/${category}`;

    fetch(apiUrl, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('imageDisplay').innerHTML = `<img src="${data.url}" alt="Waifu Image">`;
    })
    .catch(error => console.error('Error:', error));
});
