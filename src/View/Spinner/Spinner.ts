import './Spinner.scss';

export const Spinner = () => {
    const spinnerContainer = document.createElement("div") as HTMLDivElement;
    const spinner = document.createElement("div") as HTMLDivElement;

    spinnerContainer.className = "spinner-container"
    spinner.className = "spinner";

    spinnerContainer.append(spinner);

    return spinnerContainer;
}