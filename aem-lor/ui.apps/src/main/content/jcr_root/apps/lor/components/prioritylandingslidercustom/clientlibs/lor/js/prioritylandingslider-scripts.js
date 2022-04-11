
$(window).on('load', () => {
	setTimeout(() => {
		$('html').addClass('loaded');
	}, 10);
});

$(document).ready(() => {
    bannerSlider.init();
});
const bannerSlider = {
	$bannerBox: $('.js-banner-box'),
	$bannerBg: $('.js-banner-bg'),
	$overlay: $('.js-bg-overlay'),
	$next: $('.js-sc-next'),
	$prev: $('.js-sc-prev'),
	$currentSlide: $('.slick-current'),
	$bannerSlideshow: $('.js-banner-slideshow'),
	$bannerButton: $('.js-banner-btn'),
	$bannerImage: $('.js-banner-img'),
	bgZoom: 'banner-slider__cover-img--zoom',
	bgClass: 'banner-slider__cover-img--hover',
	slideFade: 'banner-slider__slides--fade',

	init: function() {
		this.boxHover();
		this.readMoreHover();
	},

	boxHover: function() {
		if (!this.$bannerBox.length) return;
		const windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
		if (windowWidth > 1200) {
			const _this = this;
			this.$bannerBox.on({
				mouseenter: function() {
					if (!$(this).closest('.js-banner-slideshow').hasClass('animation--started')) return;
					const imageUrl = $(this).find('.js-banner-img').data('img');
					const $bkgImage = $(this).closest('.js-banner-slider-holder').find('.js-banner-bg');
					$bkgImage.css({
						'background-image': 'url("' + imageUrl + '")',
					});
					$bkgImage.addClass(_this.bgClass);
				},
				mouseleave: () => {
					_this.$bannerBg.removeAttr('style');
					_this.$bannerBg.removeClass(_this.bgClass);
				}
			});
		}
	},

	readMoreHover: function() {
		if (!this.$bannerButton.length) return;
		const windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
		if (windowWidth > 1200) {
			const _this = this;
			this.$bannerButton.on({
				mouseenter: function() {
					if (!$(this).closest('.js-banner-slideshow').hasClass('animation--started')) return;
					const $image = $(this).closest('.js-banner-slider-holder').find('.js-banner-img');
					const imageUrl = $image.data('img');
					const $bkgImage = $(this).closest('.js-banner-slider-holder').find('.js-banner-bg');
					$bkgImage.css({
						'background-image': 'url("' + imageUrl + '")',
					});
					$image.addClass(_this.bgZoom);
					$bkgImage.addClass(_this.bgClass);
				},
				mouseleave: () => {
					_this.$bannerBg.removeAttr('style');
					_this.$bannerImage.removeClass(_this.bgZoom);
					_this.$bannerBg.removeClass(_this.bgClass);
				}
			});
		}
	}
};