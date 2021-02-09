export default function (triggerSelector, menuSelector, triggerActiveClass, menuActiveClass) {
	const trigger = document.querySelector(triggerSelector),
				menu = document.querySelector(menuSelector);

	trigger.addEventListener('click', () => {
		trigger.classList.toggle(triggerActiveClass);

		if (trigger.classList.contains(triggerActiveClass)) {
			menu.classList.add(menuActiveClass);
		} else {
			menu.classList.remove(menuActiveClass);
		}
	})
}