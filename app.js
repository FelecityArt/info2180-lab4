window.addEventListener('load', () => {
    document.getElementById('searchBtn').addEventListener('click', searchHeroes);
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchHeroes();
        }
    });

    function normalizeString(str) {
        // Remove special characters and convert to lowercase
        return str.toLowerCase()
                 .normalize('NFD')
                 .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
                 .replace(/[^a-z0-9\s]/g, '');     // Remove special characters
    }

    function searchHeroes(event) {
        if (event) event.preventDefault();

        const searchInput = document.getElementById('searchInput');
        const resultDiv = document.getElementById('result');
        const query = searchInput.value.trim();

        // If search is empty, just fetch all heroes
        const url = query === '' ? 'superheroes.php' : `superheroes.php?query=${encodeURIComponent(query)}`;

        fetch(url, { method: 'GET' })
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');
                const heroes = doc.querySelectorAll('li');

                if (heroes.length === 0) {
                    resultDiv.innerHTML = '<p>Superhero not found</p>';
                    return;
                }

                if (query === '') {
                    // Display full list
                    resultDiv.innerHTML = '<h3>SUPERHERO LIST</h3>';
                    const ul = document.createElement('ul');
                    heroes.forEach(hero => {
                        ul.appendChild(hero.cloneNode(true));
                    });
                    resultDiv.appendChild(ul);
                } else {
                    // Get all hero data
                    const superheroes = [
                        {
                            name: "Steve Rogers",
                            alias: "Captain America",
                            biography: "Recipient of the Super-Soldier serum, World War II hero Steve Rogers fights for American ideals as one of the world's mightiest heroes and the leader of the Avengers."
                        },
                        {
                            name: "Tony Stark",
                            alias: "Ironman",
                            biography: "Genius. Billionaire. Playboy. Philanthropist. Tony Stark's confidence is only matched by his high-flying abilities as the hero called Iron Man."
                        },
                        {
                            name: "Peter Parker",
                            alias: "Spiderman",
                            biography: "Bitten by a radioactive spider, Peter Parker's arachnid abilities give him amazing powers he uses to help others, while his personal life continues to offer plenty of obstacles."
                        },
                        {
                            name: "Carol Danvers",
                            alias: "Captain Marvel",
                            biography: "Carol Danvers becomes one of the universe's most powerful heroes when Earth is caught in the middle of a galactic war between two alien races."
                        },
                        {
                            name: "Natasha Romanov",
                            alias: "Black Widow",
                            biography: "Despite super spy Natasha Romanoff's checkered past, she's become one of S.H.I.E.L.D.'s most deadly assassins and a frequent member of the Avengers."
                        },
                        {
                            name: "Bruce Banner",
                            alias: "Hulk",
                            biography: "Dr. Bruce Banner lives a life caught between the soft-spoken scientist he's always been and the uncontrollable green monster powered by his rage."
                        },
                        {
                            name: "Clint Barton",
                            alias: "Hawkeye",
                            biography: "A master marksman and longtime friend of Black Widow, Clint Barton serves as the Avengers' amazing archer."
                        },
                        {
                            name: "T'challa",
                            alias: "Black Panther",
                            biography: "T'Challa is the king of the secretive and highly advanced African nation of Wakanda - as well as the powerful warrior known as the Black Panther."
                        },
                        {
                            name: "Thor Odinson",
                            alias: "Thor",
                            biography: "The son of Odin uses his mighty abilities as the God of Thunder to protect his home Asgard and planet Earth alike."
                        },
                        {
                            name: "Wanda Maximoff",
                            alias: "Scarlett Witch",
                            biography: "Notably powerful, Wanda Maximoff has fought both against and with the Avengers, attempting to hone her abilities and do what she believes is right to help the world."
                        }
                    ];

                    // Search for hero by name or alias using normalized strings
                    const normalizedQuery = normalizeString(query);
                    const foundHero = superheroes.find(hero => 
                        normalizeString(hero.name).includes(normalizedQuery) || 
                        normalizeString(hero.alias).includes(normalizedQuery)
                    );

                    if (foundHero) {
                        resultDiv.innerHTML = `
                            <h3>${foundHero.alias}</h3>
                            <h4>A.K.A. ${foundHero.name}</h4>
                            <p>${foundHero.biography}</p>
                        `;
                    } else {
                        resultDiv.innerHTML = '<p>Superhero not found</p>';
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                resultDiv.innerHTML = '<p>Error processing response</p>';
            });
    }
});