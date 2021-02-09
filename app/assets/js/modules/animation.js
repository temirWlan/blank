function countOffset(elem) {
	const rect = elem.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;

	return {
		top: rect.top + scrollTop,
		left: rect.left + scrollLeft
	};
}

function animateOnScroll(items, activeClass) {
	items.forEach((item, i) => {
		const itemHeight = item.offsetHeight,
				itemOffset = countOffset(item).top,
				animationStart = 4;	

		let itemPoint = window.innerHeight - (itemHeight / animationStart);

		if (itemHeight > window.innerHeight) {
			itemPoint = window.innerHeight - (window.innerHeight / animationStart);
		} 

		if ((window.pageYOffset > (itemOffset - itemPoint)) && window.pageYOffset < (itemOffset + itemHeight)) {
			item.classList.add(activeClass);
		} 
		});
};

export default function(itemSelector, activeClass) {
	const animationItems = document.querySelectorAll(itemSelector);



	animationItems.length > 0 && window.addEventListener('scroll', () => animateOnScroll(animationItems, activeClass));
	setTimeout(() => animateOnScroll(animationItems, activeClass), 500);
}