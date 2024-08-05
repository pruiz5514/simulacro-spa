import { ICreateUser, ICreateUserResponse } from "../Model/ILogin";
import { alertError, alertSuccess } from "./alerts";

export class LoginController {
    url: string;
    token: string | undefined;

    constructor(url: string) {
        this.url = url;
    }

    async createUser(endPoint: string, newUser: ICreateUser): Promise<ICreateUserResponse> {
        const response = await fetch(`${this.url}${endPoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(newUser)
        });

        if (response.status != 200) {
            alertError("No se pudo crear usuario");
            throw new Error("No se pudo crear usuario");
        }
        else {
            alertSuccess("Usuario creado exitosamente")
        }
        const data = await response.json();

        return data;
    }

    async Login(user: ICreateUser, endPoint: string) {
        const response = await fetch(`${this.url}${endPoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(user)
        });

        if (response.status != 200) {
            alertError("No se pudo Inciar sesion, verifique que el correo o la contraseña sean correctas");
            throw new Error("No se pudo Inciar sesion");
        };

        const data = await response.json();
        this.token = data.token;
        return data;
    }
}