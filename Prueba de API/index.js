function getCharacters(done) {
    const startTime = performance.now();
    const results = fetch("https://rickandmortyapi.com/api/character");

    results
        // 1. Usamos Promise.all para pasar los datos y el status code
        .then(response => Promise.all([response.json(), response.status]))
        // 2. Desestructuramos el resultado para obtener 'data' y 'status'
        .then(([data, status]) => {
            const endTime = performance.now();
            const duration = Math.round(endTime - startTime);
            const timeElement = document.createElement('p');

            // 3. Añadimos el status al texto que se mostrará
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