import {getData, createActivityBackground, createActivityDiv, regexTitle, changeTimePeriod} from './utils.js';
let main = document.querySelector('main');
let daily = document.querySelector('[data-daily]')
let weekly = document.querySelector('[data-weekly]')
let monthly = document.querySelector('[data-monthly]')
let workData = await getData();
console.log(workData)
function createSections() {
	workData.forEach(item => {
		let section = document.createElement('section');
		section.classList.add('container');
		let title =  item.title
		section.id = regexTitle(title)
		section.append(createActivityBackground(title, item.icon), createActivityDiv(item, title));
		main.append(section);
	})
}
createSections()

daily.addEventListener('click', (e) => {
	changeTimePeriod(workData, daily.dataset.daily);
	removeTimePeriodActive(e);
});
weekly.addEventListener('click', (e) => {
	changeTimePeriod(workData, weekly.dataset.weekly);
	removeTimePeriodActive(e);

})
monthly.addEventListener('click', (e) => {
	changeTimePeriod(workData, monthly.dataset.monthly);
	removeTimePeriodActive(e);

})

function removeTimePeriodActive(e) {
	let active = document.querySelector("p.active");
	active.classList.remove("active");
	e.target.classList.add("active");
}
