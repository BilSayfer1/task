export function reload(arr, component, place, headerText) {
    place.innerHTML = ""
    const header = document.createElement('div');
    header.className = 'column-header';
    header.textContent = headerText;
    place.append(header);

    for (let item of arr) {
        const elem = component(item);
        place.append(elem);
    }
}
