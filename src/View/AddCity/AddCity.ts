import { CitiesContoller } from '../../Controller/Cities.controller';
import { guardian } from '../../Controller/guardian';
import { ICities } from '../../Model/ICities';
import { Spinner } from '../Spinner/Spinner';
import './AddCity.scss'
export const AddCity = () => {

    const spinner = document.createElement("div") as HTMLDivElement;
    spinner.append(Spinner());

    guardian();
    const main = document.createElement("main") as HTMLElement;
    main.className = "addCity-main";
    const section = document.createElement("section") as HTMLElement;
    section.className = "addCity-section";

    const h1 = document.createElement("h1") as HTMLHeadElement;
    h1.innerText = "Agregar una ciudad";
    h1.className = "addCity-title"

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

    const description = document.createElement("textarea") as HTMLTextAreaElement;
    description.className = "addCity-textarea";
    description.placeholder = "Motivo de análisis climático";
    description.required = true;

    const button = document.createElement("button") as HTMLButtonElement;
    button.innerText = "Crear cuenta";
    button.className = "addCity-button";
    button.type = "submit";

    form.append(cityInput, counrtyInput, imageCity, description, button);

    section.append(h1, form);

    setTimeout(() => {
        spinner.style.display = "none";
    }, 500)

    main.append(spinner, section);

    const url = "http://localhost:3000/";

    form.addEventListener("submit", async (event: Event) => {
        event.preventDefault();

        const newCity: ICities = {
            city: cityInput.value,
            country: counrtyInput.value,
            img: imageCity.value,
            description: description.value,
            date: new Date()
        }

        const citiesController = new CitiesContoller(url);

        try {
            const cityAdded = await citiesController.postCity("cities", newCity);
            console.log(cityAdded);
            form.reset();
        }
        catch (e) {
            console.log(e);

        }
    })

    return main
}