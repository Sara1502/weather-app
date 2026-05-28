
navigator.geolocation.getCurrentPosition(
    function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        fetch(`/api/clima?lat=${latitude}&lon=${longitude}`)
            .then(res => res.json())
            .then(data => {
                const temp = Math.round(data.main.temp);
                const description = data.weather[0].description;
                const weatherId = data.weather[0].id;

                const conteudo = document.getElementById('body')
                conteudo.innerHTML = `     
                    <main class="background ">
                            <section class="temperature">
                                <h1 class="graus">${temp}°C</h1>
                                <h2 class="clima">${description}</h2>
                            </section>
                        </main>
                `

                const section = document.querySelector('section')
                section.classList.remove('hot', 'cold', 'spring')
                section.classList.add(addClassSection(temp))

                const main = document.querySelector('main')
                main.classList.remove('cold-rain', 'cold-sun', 'sping-rain', 'spring-sun', 'hot-rain', 'hot-sun')
                main.classList.add(addClassMain(temp, weatherId))
            }
            )
    },
    function (error) {
        alert('This browser does not suport geolocation')
    }
);


function addClassSection(temp) {
    if (temp < 20) return 'cold'
    if (temp >= 20 && temp <= 26) return 'spring'
    if (temp > 26) return 'hot'
}

function addClassMain(temp, weatherId) {
    const rain = weatherId < 600;

    if (temp < 20 && rain) return 'cold-rain'
    if (temp < 20 && !rain) return 'cold-sun'
    if (temp >= 20 && temp <= 26 && rain) return 'spring-rain'
    if (temp >= 20 && temp <= 26 && !rain) return 'spring-sun'
    if (temp > 26 && rain) return 'hot-rain'
    if (temp > 26 && !rain) return 'hot-sun'
}
