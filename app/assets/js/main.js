import animate from './modules/animation';
import toggleMenu from './modules/menu';

window.addEventListener('DOMContentLoaded', () => {
	animate('.animation-item', 'visible');
	toggleMenu('.burger', '.header__nav', 'active-burger', 'active-nav');
});