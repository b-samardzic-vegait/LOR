
$(window).on('load', () => {
	setTimeout(() => {
		$('html').addClass('loaded');
	}, 10);
});

$(document).ready(() => {
    accordions.init();
});



const accordions = {
	$accordion: $('.js-accordion'),
	accordionActiveClass: 'accordions__content--show',
	iconClass: 'accordions__icon-rotate',

	init: function() {
		this.accordionOpener();
	},

	accordionOpener: function() {
		if (!this.$accordion.length) return;
		const _this = this;
		this.$accordion.each(function() {
			const $accBtn = $(this).find('.js-accordion-button');
			const $accContent = $(this).find('.js-accordion-content');
			$accBtn.on('click', function() {
				const index = $(this).parent().index();
				if ($accContent.eq(index).hasClass(_this.accordionActiveClass)) {
					$accContent.eq(index).removeClass(_this.accordionActiveClass);
					$(this).find('.icon').removeClass(_this.iconClass);
					$accContent.eq(index).stop().slideUp();
				} else {
					$accContent.eq(index).stop().slideDown(() => {
						$('html, body').animate({
							scrollTop: $(this).offset().top - 90
						}, 400);
					}).addClass(_this.accordionActiveClass);
					$(this).find('.icon').addClass(_this.iconClass);
				}
			});
			$accContent.eq(0).slideDown();
			$accContent.eq(0).addClass(_this.accordionActiveClass);
			$accBtn.first().find('.icon').addClass(_this.iconClass);
		});
	}
};