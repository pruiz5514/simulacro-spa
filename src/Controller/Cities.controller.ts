import { ICities } from "../Model/ICities";
import { alertError, alertSuccess } from "./alerts";

export class CitiesContoller {
    url: string;

    constructor(url: string) {
        this.url = url
    }

    async postCity(endPoint: string, newCity: ICities): Promise<ICities> {
        const response = await fetch(`${this.url}${endPoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(newCity)
        });

        console.log(response.status);

        if (response.status != 201) {
            alertError("No se pudo añadir ciudad");
            throw new Error("No se añadir ciudad");
        }
        else {
            alertSuccess("Ciudad agregada exitosamente")
        }

        const data = await response.json();

        return data;
    }

    async getCities(endPoint: string) {
        const response = await fetch(`${this.url}${endPoint}`);
        const data = await response.json();
        console.log(response.status);

        if (response.status != 200) {
            throw new Error("No se puede mostrar las ciudades")
        }
        return data;
    }

    async deleteCity(endPoint: string): Promise<ICities> {
        const response = await fetch(`${this.url}${endPoint}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'Application-json'
            }
        });
        console.log(response.status);
        if (response.status != 200) {
            throw new Error("No se puede borrar la ciudad")
        }
        const data = await response.json();
        return data;
    }

    async updateCityPut(cityUpdated: ICities, endPoint: string) {
        const response = await fetch(`${this.url}${endPoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(cityUpdated)
        });

        console.log(response.status);

        if (response.status != 200) {
            alertError("No se pudo editar ciudad");
            throw new Error("No se editar ciudad");
        }
        else {
            alertSuccess("Ciudad editada exitosamente")
        }

        const data = await response.json();

        return data;
    }
}