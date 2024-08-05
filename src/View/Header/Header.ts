import './Header.scss';

export const Header = () => {
    const header = document.createElement("header") as HTMLHeadElement;

    const section = document.createElement("section") as HTMLElement;
    section.className = "header-section";
    const h1 = document.createElement("h1") as HTMLHeadElement;
    h1.innerText = "Riwi weather";

    const nav = document.createElement("nav") as HTMLElement;
    const ul = document.createElement("ul") as HTMLElement;
    ul.className = "ul-nav";
    ul.innerHTML = `
    <li><a href = "#/home">Home</a></li>
    <li><a href = "#/agregar-ciudad">Agregar ciudad</a></li>
    <li><a id="logout-a" href = "">Cerrar sesión</a></li>
    `
    section.append(h1);

    nav.append(ul);
    header.append(section, nav);

    const logout = ul.querySelector("#logout-a") as HTMLAnchorElement;
    logout.addEventListener("click", () => {
        sessionStorage.removeItem("token");
    });

    return header;
}