
export async function getData() {
	try {
		let response = await fetch("./data.json", {mode: "cors"});
		console.log(response)
		return await response.json();
	} catch (e) {
		return e.message;
	}
}


export function createActivityDiv(object, title) {
	let div = document.createElement('div');
	div.classList.add("information-container")
	div.setAttribute(`data-title`, regexTitle(title));
	createActivityInformation(object, title, "daily").forEach(item => {
		div.append(item);
	})
	return div;
}

export function regexTitle(title) {
	return title.toLowerCase().replace(" ", "-")
}

function createActivityInformation(object, title, timePeriod) {
	let top = document.createElement("div");
	top.classList.add("top-container");
	let {current, previous} = object.timeframes[timePeriod];
	let image = document.createElement("img");
	image.src = "../images/icon-ellipsis.svg";
	let pTitle = document.createElement("p");
	pTitle.innerText = title;
	pTitle.classList.add("title");
	top.append(pTitle, image);
	let bottomDiv = document.createElement("div");
	bottomDiv.classList.add("bottom-container");
	let currentHours = document.createElement("p");
	currentHours.innerText = `${current}hrs`;
	currentHours.classList.add("current");
	let previousHours = document.createElement("p");
	previousHours.innerText = `Yesterday - ${previous}hrs`;
	previousHours.classList.add("previous");
	bottomDiv.append(currentHours, previousHours);
	return [top, bottomDiv];
}

export function createActivityBackground(title, src) {
	let div = document.createElement('div');
	div.classList.add('background');
	let image = document.createElement('img');
	image.src = src;
	image.classList.add('icon');
	div.style.backgroundColor = setBackgroundColour(title.toLowerCase().replace(' ', '-'));
	div.append(image);
	return div;
}

function setBackgroundColour(title) {
	switch (title) {
		case 'work':
			return '#ff8b64';
		case 'play':
			return '#56c2e6';
		case 'study':
			return '#ff5e7d';
		case 'exercise':
			return '#4bcf83';
		case 'social':
			return '#7235d1';
		case 'self-care':
			return '#f1c75b';
		default:
			return '';
	}
}

export function changeTimePeriod(data, period) {
	data.forEach(item => {
		let title = regexTitle(item.title);
		changeTime(item.timeframes[period], title, period);
	})
}

function changeTime({current, previous}, title, period) {
	let currentValue = document.querySelector(`[data-title=${title}] > .bottom-container > .current`)
	let previousValue = document.querySelector(`[data-title=${title}] > .bottom-container > .previous`)
	let previousBehaviour = period === "daily" ? `Yesterday - ${previous}hrs`
		: period === "weekly" ? `Last Week - ${previous}hrs`
			: period === "monthly" ? `Last Month - ${previous}hrs` : ""
	currentValue.textContent = `${current}hrs`;
	previousValue.textContent = previousBehaviour
}


