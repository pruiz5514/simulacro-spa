export function guardian() {
    const token = sessionStorage.getItem("token");
    if (!token) {
        window.location.hash = "/";
    }
}