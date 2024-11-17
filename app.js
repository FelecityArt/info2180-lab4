document.getElementById('searchBtn').addEventListener('click', function() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'superheroes.php', true);

    xhr.onload = function() {
        if (xhr.status === 200) {

            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = xhr.responseText;

            const heroes = Array.from(tempDiv.getElementsByTagName('li'))
                .map(li => li.textContent)
                .join('\n');

            alert('List of Superheroes:\n\n' + heroes);
        } else {
            alert('Error loading superheroes data');
        }
    };

    xhr.onerror = function() {
        alert('Network error occurred');
    };

    xhr.send();
});
