import { alertError } from '../../Controller/alerts';
import { LoginController } from '../../Controller/Login.controller';
import { ICreateUser } from '../../Model/ILogin';
import '../../style.scss';
import './SignUp.scss';

export const SignUp = (): HTMLElement => {

    const main = document.createElement("main") as HTMLElement;
    main.className = "signUp-main";
    const section = document.createElement("section") as HTMLElement;
    section.className = "signUp-section";

    const h1 = document.createElement("h1") as HTMLHeadElement;
    h1.innerText = "Riwi weather";
    h1.className = "signUp-title"

    const form = document.createElement("form") as HTMLFormElement;
    form.className = "signUp-form";

    const emailInput = document.createElement("input") as HTMLInputElement;
    emailInput.type = "email";
    emailInput.className = "signUp-input";
    emailInput.placeholder = "Correo electronico";
    emailInput.required = true;

    const passwordInput = document.createElement("input") as HTMLInputElement;
    passwordInput.className = "signUp-input";
    passwordInput.placeholder = "Contraseña";
    passwordInput.type = "password";
    passwordInput.required = true;

    const confirmPassword = document.createElement("input") as HTMLInputElement;
    confirmPassword.className = "signUp-input";
    confirmPassword.placeholder = "Confirmar contraseña";
    confirmPassword.type = "password";
    confirmPassword.required = true;

    const button = document.createElement("button") as HTMLButtonElement;
    button.innerText = "Crear cuenta";
    button.className = "signUp-button";
    button.type = "submit";

    form.append(emailInput, passwordInput, confirmPassword, button);

    section.append(h1, form);
    main.append(section);

    form.addEventListener("submit", async (event: Event) => {
        event.preventDefault();

        if (passwordInput.value === confirmPassword.value) {
            const createUser: ICreateUser = {
                email: emailInput.value,
                password: passwordInput.value
            }
            const loginController = new LoginController("https://reqres.in/api/");

            try {
                const responseCreateUser = await loginController.createUser("register", createUser);
                console.log(responseCreateUser);
                window.location.hash = "";
            } catch (e) {
                form.reset();
                console.log(e);
            }
        } else {
            alertError("Las contraseñas no son iguales")
            form.reset();
        }
    })

    return main
}