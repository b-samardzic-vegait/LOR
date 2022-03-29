
$(window).on('load', () => {
	setTimeout(() => {
		$('html').addClass('loaded');
	}, 10);
});

$(document).ready(() => {
    tabs.init();
});


const tabs = {
	$tabContainer: $('.js-tabs'),
	activeClass: 'tabs__button--active',
	iconClass: 'tabs__icon-rotate',

	init: function() {
		this.desktopTabs();
		this.mobileTabs();
	},

	desktopTabs: function() {
		if (!this.$tabContainer.length) return;
		const _this = this;
		this.$tabContainer.each(function() {
			const $tabBtn = $(this).find('.js-switch-tabs');
			const $tabContent = $(this).find('.js-content-tab');
			const $tabMobile = $(this).find('.js-mobile-tab');
			$tabBtn.on('click', function() {
				const index = $(this).parent().index();
				$tabContent.hide();
				$tabContent.eq(index).show();
				$tabBtn.removeClass(_this.activeClass);
				$(this).addClass(_this.activeClass);
			});
			$tabBtn.first().click();
			$tabMobile.eq(0).find('.icon').addClass(_this.iconClass);
		});
	},

	mobileTabs: function() {
		if (!this.$tabContainer.length) return;
		const _this = this;
		this.$tabContainer.each(function() {
			const $tabContent = $(this).find('.js-content-tab');
			const $tabMobile = $(this).find('.js-mobile-tab');
			$tabMobile.on('click', function() {
				const index = $(this).parent().index();
				if ($tabContent.eq(index).hasClass(_this.activeClass)) {
					$tabContent.eq(index).removeClass(_this.activeClass);
					$(this).find('.icon').removeClass(_this.iconClass);
					$tabContent.eq(index).stop().slideUp();
				} else {
					$tabContent.eq(index).stop().slideDown(() => {
						$('html, body').animate({
							scrollTop: $(this).offset().top - 90
						}, 400);
					}).addClass(_this.activeClass);
					$(this).find('.icon').addClass(_this.iconClass);
				}
			});
			const windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
			if (windowWidth < 768) {
				$tabContent.eq(0).slideDown();
				$tabContent.eq(0).addClass(_this.activeClass);
			}
			$tabMobile.first().find('.icon').addClass(_this.iconClass);
		});
	}
};
