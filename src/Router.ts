import { AddCity } from "./View/AddCity/AddCity";
import { CityDetails } from "./View/CityDetails/CityDetails";
import { Header } from "./View/Header/Header";
import { Home } from "./View/Home/Home";
import { Login } from "./View/Login/Login";
import { SignUp } from "./View/SignUp/SignUp";

export const Router = async () => {
    let { hash } = location;

    const divRoot = document.querySelector("#root") as HTMLElement;

    divRoot.innerHTML = "";

    if (hash == "" || hash == "#/") {
        divRoot.append(Login())
    }
    else if (hash == "#/signUp") {
        divRoot.append(SignUp())
    }
    else if (hash === "#/home") {
        divRoot.append(Header(), await Home())
    }
    else if (hash === "#/agregar-ciudad") {
        divRoot.append(Header(), AddCity())
    } else {
        divRoot.append(Header(), await CityDetails())
    }

}