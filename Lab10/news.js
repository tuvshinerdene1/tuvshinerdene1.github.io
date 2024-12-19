const description = localStorage.getItem('newsDescription');
    if (description) {
        document.getElementById('description').textContent = description;
    } else {
        document.getElementById('description').textContent = "No description available.";
    }
