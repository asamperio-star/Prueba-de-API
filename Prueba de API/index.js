function getCharacters(done) {
    const startTime = performance.now();
    const results = fetch("https://rickandmortyapi.com/api/character");

    results
        
        .then(response => Promise.all([response.json(), response.status]))
        
        .then(([data, status]) => {
            const endTime = performance.now();
            const duration = Math.round(endTime - startTime);
            const timeElement = document.createElement('p');

        
            timeElement.textContent = `Tiempo de respuesta API: ${duration} ms | Status Code: ${status}`;
            
            document.body.prepend(timeElement);
            done(data);
        });
}

getCharacters(data => {
    data.results.forEach(personaje => {
        const article = document.createRange().createContextualFragment( /*html*/ `
            <article>
                <div class="image-container">
                    <img src="${personaje.image}" alt="Personaje">
                </div>
                <h2>${personaje.name}</h2>
                <span>${personaje.status}</span>
            </article>
        `);
        const main = document.querySelector("main");
        main.append(article);
    });
});