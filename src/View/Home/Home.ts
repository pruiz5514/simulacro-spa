import { CitiesContoller } from '../../Controller/Cities.controller';
import { Card } from '../Card/Card';
import { ICities } from '../../Model/ICities';
import './Home.scss'
import { IWeather } from '../../Model/IWeather';
import { alertSuccess } from '../../Controller/alerts';
import { guardian } from '../../Controller/guardian';
import { Spinner } from '../Spinner/Spinner';

export const Home = async () => {
    guardian();


    const main = document.createElement("main") as HTMLElement;
    main.className = "home-main";

    const spinner = document.createElement("div") as HTMLDivElement;
    spinner.append(Spinner())

    const h1 = document.createElement("h1") as HTMLHeadElement;
    h1.className = "home-tilte";
    h1.innerText = "Ciudades";

    const cardsContainer = document.createElement("section") as HTMLElement;
    cardsContainer.className = "cardsContainer-home";

    const url = "http://localhost:3000/";
    const citiesController = new CitiesContoller(url);

    await showCities(cardsContainer, url);
    setTimeout(() => {
        spinner.style.display = "none";
    }, 500)


    main.append(spinner, h1, cardsContainer);

    document.addEventListener("click", async (event: Event) => {
        const target = event.target as HTMLElement;

        if (target.className.includes("bi")) {
            const idDelete = target.getAttribute("card-delete")

            try {
                const delteCity = await citiesController.deleteCity(`cities/${idDelete}`);
                console.log(delteCity);
                alertSuccess("Se borro exitosamente la ciudad");
                await showCities(cardsContainer, url);
            } catch (e) {
                console.log(e);
            }
        }

        if (target.className.includes("viewMore-button")) {
            const viewMoreID = target.getAttribute("viewMore-id");
            localStorage.setItem("viewMoreID", String(viewMoreID))
            window.location.hash = `#/city-${viewMoreID}`
        }
    })
    return main;
}

async function showCities(cardsContainer: HTMLElement, url: string) {
    try {
        cardsContainer.innerHTML = ``;
        const citiesController = new CitiesContoller(url);
        const citiesData = await citiesController.getCities("cities");
        citiesData.forEach(async (city: ICities) => {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.city}&appid=1433f62652d56feaa76a71063b993a94`);
            const data: IWeather = await response.json();
            cardsContainer.append(Card(city, data.main.temp))
        })

    }
    catch (e) {
        console.log(e);
    }
} 