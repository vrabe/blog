export function toggleClass(element, className) {
	element.classList.toggle(className);
}

export function elementHasClass(element, className) {
	return element.classList.contains(className);
}

export function rootInDarkMode() {
	return document.documentElement.getAttribute("data-theme") === "dark";
}
