
navigator.geolocation.getCurrentPosition(
    function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=54ac4573647eaab790fe699fb0ce1f22&lang=pt_br&units=metric`)
            .then(res => res.json())
            .then(data => {
                const temp = Math.round(data.main.temp);
                const description = data.weather[0].description;

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
                main.classList.add(addClassMain(temp, description))
            }
            )
    },
    function (error) {
        alert('This browser does not suport geolocation')
    }
);


function addClassSection(temp) {
    if (temp < 20) {
        return 'cold'
    } else if (temp >= 20 && temp <= 26) {
        return 'spring'
    } else {
        return 'hot'
    }
}

function addClassMain(temp, description) {
    if (temp < 20 && description.toLowerCase().includes('chuva')) {
        return 'cold-rain'
    } else if (temp < 20 && !description.toLowerCase().includes('chuva')) {
        return 'cold-sun'
    } else if (temp >= 20 && temp <= 26 && description.toLowerCase().includes('chuva')) {
        return 'spring-rain'
    } else if (temp >= 20 && temp <= 26 && !description.toLowerCase().includes('chuva')) {
        return 'spring-sun'
    } else if (temp > 26 && description.toLowerCase().includes('chuva')) {
        return 'hot-rain'
    } else {
        return 'hot-sun'
    }
}
