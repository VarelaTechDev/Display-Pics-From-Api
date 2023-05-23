window.onload = function() {
    const categories = [
        'waifu',
        'neko',
        'shinobu',
        'megumin',
        'bully',
        'cuddle',
        // Add all your categories here...
    ];

    const categoryDropdown = document.getElementById('category');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1); // Capitalize the first letter
        categoryDropdown.appendChild(option);
    });
}
