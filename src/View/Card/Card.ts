import { ICities } from '../../Model/ICities';
import './Card.scss'

export const Card = (props: ICities, temp: number) => {
    let { id, city, country, img } = props;

    let tempC: number = Number((temp - 273.15).toFixed(0));
    const article = document.createElement("article") as HTMLElement;
    const image = document.createElement("img") as HTMLImageElement;
    const infoContainer = document.createElement("div") as HTMLDivElement;
    const h3 = document.createElement("h3") as HTMLHeadElement;
    const countryP = document.createElement("p") as HTMLParagraphElement;
    const temperauteP = document.createElement("p") as HTMLParagraphElement;
    const tempBar = document.createElement("div") as HTMLDivElement;


    const viewMoreContainer = document.createElement("div") as HTMLDivElement;
    viewMoreContainer.className = "viewMore-container";
    const viewMore = document.createElement("button") as HTMLButtonElement;
    viewMore.className = "viewMore-button"

    const deleteButton = document.createElement("span") as HTMLSpanElement;
    deleteButton.innerHTML = `<i card-delete = ${id} class="bi bi-x-circle-fill"></i>`
    deleteButton.className = "deleteCard-button"

    article.className = "card-container";

    image.className = "card-img";
    image.src = img;

    infoContainer.className = "infoContainer-card";
    h3.innerText = city;
    countryP.innerText = country;
    temperauteP.innerText = String((tempC) + " °C");

    viewMore.innerText = "Ver más";
    viewMore.setAttribute("viewMore-id", String(id));

    tempBar.className = "tempBar-card";
    if (tempC >= 30) {
        tempBar.style.backgroundColor = "red";
    } else if (tempC >= 18 && tempC < 30) {
        tempBar.style.backgroundColor = "yellow";
    } else if (tempC < 18) {
        tempBar.style.backgroundColor = "blue";
    }

    viewMoreContainer.append(viewMore)
    infoContainer.append(h3, countryP, temperauteP, tempBar);
    article.append(image, infoContainer, viewMoreContainer, deleteButton);
    return article;
}