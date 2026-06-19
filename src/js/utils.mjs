export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function getParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}

export function renderWithTemplate(template, parentElement) {
    parentElement.innerHTML = template;
}

export async function loadTemplate(path) {
    const res = await fetch(path);
    const template = await res.text();
    return template;
}

export async function loadHeaderFooter() {
    const base = import.meta.env.BASE_URL;
    const headerTemplate = await loadTemplate(`${base}partials/header.html`);
    const footerTemplate = await loadTemplate(`${base}partials/footer.html`);
    const headerElement = document.querySelector("#main-header");
    const footerElement = document.querySelector("#main-footer");
    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);
}

export function alertMessage(message, scroll = true) {
    const alert = document.createElement("div");
    alert.classList.add("alert");
    alert.innerHTML = `<p>${message}</p><span>X</span>`;
    alert.addEventListener("click", function (e) {
        if (e.target.tagName === "SPAN") {
            document.querySelector("main").removeChild(this);
        }
    });
    document.querySelector("main").prepend(alert);
    if (scroll) window.scrollTo(0, 0);
}

export function renderListWithTemplate(
    templateFn,
    parentElement,
    list,
    position = "afterbegin",
    clear = false
) {
    if (clear) parentElement.innerHTML = "";
    const htmlStrings = list.map(templateFn);
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}
