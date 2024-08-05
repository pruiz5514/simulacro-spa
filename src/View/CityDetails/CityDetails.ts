import { CitiesContoller } from "../../Controller/Cities.controller";
import { guardian } from "../../Controller/guardian";
import { IWeather } from "../../Model/IWeather";
import { Spinner } from "../Spinner/Spinner";
import './CityDetails.scss';

export const CityDetails = async () => {
    guardian();

    const spinner = document.createElement("div") as HTMLDivElement;
    spinner.append(Spinner());

    const id = localStorage.getItem("viewMoreID");
    const city = await showCity(String(id));

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.city}&appid=1433f62652d56feaa76a71063b993a94`);
    const data: IWeather = await response.json();

    const main = document.createElement("main") as HTMLElement;
    main.className = "cityDetails-main";

    const sectionCityDetails = document.createElement("main") as HTMLElement;
    sectionCityDetails.className = "cityDetails-section";

    const h1 = document.createElement("h1") as HTMLHeadElement;
    h1.className = "cityDetails-tilte";
    h1.innerText = city.city;

    const imageContainer = document.createElement("div") as HTMLImageElement;
    imageContainer.className = "cityDetails-image-contaianer";
    const image = document.createElement("img") as HTMLImageElement;
    image.src = city.img;
    image.className = "cityDetails-image";

    const infoContianer = document.createElement("div") as HTMLImageElement;
    const country = document.createElement("p") as HTMLParagraphElement;
    country.innerText = city.country;
    const description = document.createElement("p") as HTMLParagraphElement;
    description.innerText = city.description;

    const temp = document.createElement("p") as HTMLParagraphElement;
    temp.innerText = String(data.main.temp);

    infoContianer.append(country, description, temp)

    imageContainer.append(image)
    sectionCityDetails.append(h1, imageContainer, infoContianer);


    const section = document.createElement("section") as HTMLElement;
    section.className = "addCity-section";

    const form = document.createElement("form") as HTMLFormElement;
    form.className = "addCity-form";

    const cityInput = document.createElement("input") as HTMLInputElement;
    cityInput.type = "text";
    cityInput.className = "addCity-input";
    cityInput.placeholder = "Ciudad";
    cityInput.required = true;

    const counrtyInput = document.createElement("input") as HTMLInputElement;
    counrtyInput.className = "addCity-input";
    counrtyInput.placeholder = "Pais";
    counrtyInput.type = "text";
    counrtyInput.required = true;

    const imageCity = document.createElement("input") as HTMLInputElement;
    imageCity.className = "addCity-input";
    imageCity.placeholder = "URL imagen";
    imageCity.type = "url";
    imageCity.required = true;

    const descriptionInput = document.createElement("textarea") as HTMLTextAreaElement;
    descriptionInput.className = "addCity-textarea";
    descriptionInput.placeholder = "Motivo de análisis climático";
    descriptionInput.required = true;

    const button = document.createElement("button") as HTMLButtonElement;
    button.innerText = "Editar";
    button.className = "addCity-button";
    button.type = "submit";

    form.append(cityInput, counrtyInput, imageCity, descriptionInput, button);

    section.append(form);

    setTimeout(() => {
        spinner.style.display = "none";
    }, 500)
    main.append(spinner, sectionCityDetails, section);

    form.addEventListener("submit", async (event: Event) => {
        event.preventDefault();
        const url = "http://localhost:3000/";
        const cityController = new CitiesContoller(url);

        const cityUpdated = {
            city: cityInput.value,
            country: counrtyInput.value,
            img: imageCity.value,
            description: descriptionInput.value,
            date: new Date()
        }
        try {
            const city = await cityController.updateCityPut(cityUpdated, `cities/${id}`);
            console.log(city);
            window.location.hash = "#/home";
        }
        catch (e) {
            console.log(e);
        }
    })
    return main;
}


async function showCity(id: string) {
    const url = "http://localhost:3000/";
    const cityController = new CitiesContoller(url);
    try {
        const city = await cityController.getCities(`cities/${id}`);
        return city;
    }
    catch (e) {
        console.log(e);
    }
} 