
$(window).on('load', () => {
	setTimeout(() => {
		$('html').addClass('loaded');
	}, 10);
});

$(document).ready(() => {
	slider.init();
});


    const slider = {
	$mobileSlider: $('.js-mobile-slider'),
	$tabletSlider: $('.js-tablet-slider'),
	$slider: $('.js-slider-desktop'),
	$popupSection: $('.js-popup-section'),
	$popupOverlay: $('.js-img-overlay'),
	$closePopupBtn: $('.js-close-popup'),
	$sectionContent: $('.js-popup-content'),
	$imageSlider: $('.js-image-slider'),
	$bannerSlider: $('.js-banner-slider'),
	activeClass: 'animation--slide',
	playingClass: 'slider__media--playing',
	popupClass: 'popup--opened',
	overlayActive: 'overlay--active',
	textActive: 'image-slider__caption--active',
	verticalTextActive: 'banner-slider__vertical--active',
	popupContent: [],
    $win: $(window),
	$body: $('body'),

	init: function() {
		this.savePopupContent();
		this.mobileSlide();
		this.tabletSlide();
		this.desktopSlider();
		this.imageSlider();
		this.bannerSlider();
		this.openPopup();
		this.closePopup();
	},

	savePopupContent: function() {
		if (!this.$sectionContent.length) return;
		this.$sectionContent.each((i, item) => {
			const clonedItem = $(item).clone();
			this.popupContent.push(clonedItem);
		});
	},

    disableScroll: function() {
		if (!this.isScrollDisabled) {
			this.topScroll = this.$win.scrollTop();
			this.$body.css('top', -this.topScroll + 'px').addClass(this.disabledScrollClass);
			this.isScrollDisabled = true;
		}
	},

	// Enable back window scroll when closing the opened overlays
	enableScroll: function() {
		this.$body.removeAttr('style').removeClass(this.disabledScrollClass);
		this.$win.scrollTop(this.topScroll);
		this.isScrollDisabled = false;
	},

	openPopup: function() {
		if (!this.$popupSection.length) return;
		const _this = this;
		this.$popupSection.each((i, item) => {
			const $popupBtn = $(item).find('.js-open-popup');
			const $popupOverlay = $(item).find('.js-img-overlay');
			$popupBtn.on('click', function() {
				const currentSlide = parseInt($(this).closest('.slick-slide').data('slick-index'));
				const $popup = $(this).closest('.js-popup-section').find('.js-popup');
				$popup.append(_this.popupContent[i]);
				const $slider = $popup.find('.js-slider-popup');
				if ($slider.hasClass('slick-slider')) {
					$slider.slick('unslick');
				}
				setTimeout(() => {
					$popupOverlay.addClass(_this.overlayActive);
					_this.responsiveSlider($slider);
					$slider.slick('slickGoTo', currentSlide);
					$popup.addClass(_this.popupClass);
					helpers.disableScroll();
				}, 100);
			});
		});
	},

	closePopup: function() {
		const _this = this;
		this.$closePopupBtn.on('click', function() {
			const $popup = $(this).closest('.js-popup');
			$popup.removeClass(_this.popupClass);
			helpers.enableScroll();
			setTimeout(() => {
				_this.$popupOverlay.removeClass(_this.overlayActive);
				$popup.find('.js-popup-content').remove();
			}, 0);
		});
		this.$popupOverlay.on('click', (e) => {
			const clicked = $(e.target);
			if (clicked.is('.js-popup') || clicked.parents().is('.js-popup')) {
				return;
			} else {
				const $popup = $(this).closest('.js-popup');
				$popup.removeClass(_this.popupClass);
				helpers.enableScroll();
				setTimeout(() => {
					_this.$popupOverlay.removeClass(_this.overlayActive);
					$popup.find('.js-popup-content').remove();
				}, 0);
			}
		});
	},

	responsiveSlider: function(item) {
		const _this = this;
		item.each((i, item) => {
			const totalSlides = $(item).find('.js-sc-slide').length;
			if (totalSlides === 1) {
				$(item).parent().addClass('slider-single');
				return;
			}
			let infiniteSlide = true;
			if ($(item).data('infinite') === false) {
				infiniteSlide = false;
			}
			const $total = $(item).parent().find('.js-sc-total');
			const $current = $(item).parent().find('.js-sc-current');
			const $prevBtn = $(item).parent().find('.js-sc-prev');
			const $nextBtn = $(item).parent().find('.js-sc-next');
			const $progressLine = $(item).parent().find('.js-sc-line');
			const progress = Math.ceil(100 / totalSlides);
			$progressLine.css('width', progress + '%');
			$total.html(totalSlides);
			$(item).slick({
				dots: false,
				infinite: infiniteSlide,
				prevArrow: $prevBtn,
				nextArrow: $nextBtn,
				responsive: [
					{
						breakpoint: 1199,
						settings: {
							slidesToShow: 2,
						}
					},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 1,
						}
					}
				]
			});
			$(item).on('afterChange', (event, slick, currentSlide) => {
				const slideIndex = currentSlide + 1;
				const newProgress = progress * currentSlide;
				$current.html(slideIndex);
				$progressLine.css('left', newProgress + '%');
				const $slideVideo = $('.slick-slide').not('.slick-active').find('.js-video');
				if ($slideVideo.length && $slideVideo.hasClass(_this.playingClass)) {
					$slideVideo.find('video')[0].pause();
					$slideVideo.removeClass(_this.playingClass);
				}
			});
		});
	},

	mobileSlide: function() {
		const windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
		if (!this.$mobileSlider.length || windowWidth > 767) return;
		this.responsiveSlider(this.$mobileSlider);
	},

	tabletSlide: function() {
		const windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
		if (!this.$tabletSlider.length || windowWidth > 1199) return;
		this.responsiveSlider(this.$tabletSlider);
	},

	desktopSlider: function() {
		if (!this.$slider.length) return;
		this.responsiveSlider(this.$slider);
	},

	imageSlider: function() {
		if (!this.$imageSlider) return;
		this.$imageSlider.each((i, item) => {
			const totalSlides = $(item).find('.js-sc-slide').length;
			if (totalSlides < 2) {
				$(item).addClass('image-slider--single');
				return;
			}
			const $total = $(item).parent().find('.js-sc-total');
			const $current = $(item).parent().find('.js-sc-current');
			const $prevBtn = $(item).parent().find('.js-sc-prev');
			const $nextBtn = $(item).parent().find('.js-sc-next');
			const $progressLine = $(item).parent().find('.js-sc-line');
			const progress = Math.ceil(100 / totalSlides);
			$progressLine.css('width', progress + '%');
			$total.html(totalSlides);
			$(item).slick({
				dots: false,
				infinite: true,
				prevArrow: $prevBtn,
				nextArrow: $nextBtn,
				slidesToShow: 4,
				slidesToScroll: 1,
				responsive: [
					{
						breakpoint: 1199,
						settings: {
							slidesToShow: 2,
						}
					},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 1,
						}
					}
				]
			});
			$(item).on('afterChange', (event, slick, currentSlide) => {
				const slideIndex = currentSlide + 1;
				$current.html(slideIndex);
			});
			$(item).on('beforeChange', (event, slick, currentSlide, nextSlide) => {
				let newProgress = progress * nextSlide;
				if (slick.$slides.length === nextSlide + slick.options.slidesToScroll) {
					newProgress = 91;
				}
				$progressLine.css('left', newProgress + '%');
			});
		});
	},

	bannerSlider: function() {
		const _this = this;
		if (!this.$bannerSlider) return;
		this.$bannerSlider.each((i, item) => {
			const totalSlides = $(item).find('.js-sc-slide').length;
			if (totalSlides < 2) {
				$(item).addClass('banner-slider--single');
				return;
			}
			const $total = $(item).closest('.js-banner-slider-holder').find('.js-sc-total');
			const $current = $(item).closest('.js-banner-slider-holder').find('.js-sc-current');
			const $prevBtn = $(item).closest('.js-banner-slider-holder').find('.js-sc-prev');
			const $nextBtn = $(item).closest('.js-banner-slider-holder').find('.js-sc-next');
			const $infoText = $(item).closest('.js-banner-slider-holder').find('.js-banner-info');
			$total.html(totalSlides);
			$('.js-banner-text').hide();
			$('.js-banner-btn').hide();
			$('.js-banner-text[data-id=' + 1 + ']').show();
			$('.js-banner-btn[data-id=' + 1 + ']').show();
			$(item).slick({
				dots: false,
				infinite: false,
				prevArrow: $prevBtn,
				nextArrow: $nextBtn,
				slidesToScroll: 1,
				slidesToShow: 1,
				centerMode: true,
				focusOnSelect: true
			});
			const $verticalText = $(item).closest('.js-banner-slider-holder').find('.slick-current');
			$(item).on('afterChange', (event, slick, currentSlide) => {
				$('.js-banner-text').hide();
				$('.js-banner-btn').hide();
				$('.js-banner-text[data-id=' + (currentSlide + 1) + ']').show();
				$('.js-banner-btn[data-id=' + (currentSlide + 1) + ']').show();
				const slideIndex = currentSlide + 1;
				$current.html(slideIndex);
				if (currentSlide !== 0) {
					$verticalText.first().find('.js-banner-vertical').removeClass(_this.verticalTextActive);
				} else if (currentSlide === 0) {
					$verticalText.first().find('.js-banner-vertical').addClass(_this.verticalTextActive);
				}
			});
			const slideWidth = $(item).closest('.js-banner-slider-holder').find('.slick-slide').width();
			$verticalText.first().find('.js-banner-vertical').addClass(_this.verticalTextActive);
			$infoText.width(slideWidth - 2);
		});
	}
};







