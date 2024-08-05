import { LoginController } from '../../Controller/Login.controller';
import '../../style.scss';
import './Login.scss';

const url = "https://reqres.in/api/";

export const Login = (): HTMLElement => {
    const main = document.createElement("main") as HTMLElement;
    main.className = "login-main";
    const section = document.createElement("section") as HTMLElement;
    section.className = "login-section";

    const h1 = document.createElement("h1") as HTMLHeadElement;
    h1.innerText = "Riwi weather";
    h1.className = "login-title"

    const form = document.createElement("form") as HTMLFormElement;
    form.className = "login-form";

    const emailInput = document.createElement("input") as HTMLInputElement;
    emailInput.type = "email";
    emailInput.className = "login-input";
    emailInput.placeholder = "Correo electronico";

    const passwordInput = document.createElement("input") as HTMLInputElement;
    passwordInput.className = "login-input";
    passwordInput.placeholder = "Contraseña";
    passwordInput.type = "password";

    const button = document.createElement("button") as HTMLButtonElement;
    button.innerText = "Iniciar sesión";
    button.className = "login-button";
    button.type = "submit";

    form.append(emailInput, passwordInput, button);

    const a = document.createElement("a") as HTMLAnchorElement;
    a.innerText = "Crear una cuenta";
    a.href = "#/signUp";
    a.className = "signUp-a"

    section.append(h1, form, a);
    main.append(section);

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const user = {
            email: emailInput.value,
            password: passwordInput.value
        }

        const loginController = new LoginController(url);

        try {
            const login = await loginController.Login(user, "login");
            sessionStorage.setItem("token", login.token);
            window.location.hash = "#/home";
        } catch (e) {
            console.log(e);
        }
    })

    return main
}