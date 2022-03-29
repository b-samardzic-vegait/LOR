
$(window).on('load', () => {
	setTimeout(() => {
		$('html').addClass('loaded');
    	//console.log("0")
	}, 10);
});

$(document).ready(() => {
	slider.init();
    video.init();
    //projectsSlider.init();
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







const video = {
	$iframe: $('.js-iframe'),
	$video: $('.js-video'),
	$videoBtn: $('.js-play-video'),
	playingClass: 'slider__media--playing',
	$dfma: $('.js-dfma'),

	init: function() {
		//this.loadIframe();
		this.loadVideo();
		//this.playVideo();
	},

	createIframe: function(src, item, isAutoplay) {
		if (isAutoplay) {
			src = src + '?background=1&loop=1&byline=0&title=0&controls=0&muted=1';
		}
		const iframe = '<iframe class="video video--iframe"  src="' + src + '" width="640" height="320" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="Video title"></iframe>';
		$(item).append(iframe);
	},

	loadIframe: function() {
		if (!this.$iframe.length) return;
		const _this = this;
		this.$iframe.each(function() {
			const url = $(this).data('iframe');
			const autoplay = $(this).data('auto');
			_this.createIframe(url, $(this), autoplay);
		});
	},

	createVideo: function(videoUrl, item, isAutoplay) {
		let video = '<video loop playsinline class="video video--video"><source src="' + videoUrl + '" type="video/mp4"></video>';
		if (isAutoplay) {
			video = '<video muted autoplay loop playsinline class="video video--video"><source src="' + videoUrl + '" type="video/mp4"></video>';
		}
		$(item).append(video);
	},

	loadVideo: function() {
		//if (!this.$video.length) return;
		const windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
		const _this = this;
		this.$video.each(function() {
			/*const url = $(this).data('video');
			const autoplay = $(this).data('auto');
			_this.createVideo(url, $(this), autoplay);*/
		});
		this.$dfma.each(function() {
			const $video = $(this).find('.js-dfma-video');
			const $progress = $(this).find('.js-dfma-bar');
			const $iconInner = $(this).find('.js-dfma-icon-inner');
			const $iconOutter = $(this).find('.js-dfma-icon-outter');
			const $box = $(this).find('.js-dfma-box');
			const $videoPlayer = $(this).find('video');
			$videoPlayer.on('timeupdate', () => {
				const perc = 100 * $video.find('video')[0].currentTime / $video.find('video')[0].duration;
				$progress.css('width', perc + '%');
				$iconInner.css({ 'left': perc + '%', 'margin-left': '5px' });
				if (windowWidth <= 1200 && windowWidth >= 768) {
					$iconInner.css({ 'left': perc + '%', 'margin-left': '10px' });
				}
				$iconOutter.css('left', perc + '%');
				$box.css('left', perc - 12 + '%');
			});
		});
	},

	playVideo: function() {
		//if (!this.$video.length) return;
		const _this = this;
		$(document).on('click', '.js-video', function() {
			const $videoWrap = $(this).closest('.js-video');
			if ($videoWrap.hasClass(_this.playingClass)) {
				$videoWrap.removeClass(_this.playingClass);
				$videoWrap.find('video')[0].pause();
			} else {
				$videoWrap.addClass(_this.playingClass);
				$videoWrap.find('video')[0].play();
				$videoWrap.find('video')[0].volume = 0.5;
			}
		});
	},

	injectApi: function(type) {
		let src = 'https://player.vimeo.com/api/player.js';
		if (type === 'youtube') {
			src = 'https://www.youtube.com/iframe_api';
		}
		const tag = document.createElement('script');
		tag.src = src;
		const firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}
};






















/*const projectsSlider = {
	$window: $(window),
	$slider: $('.js-projects-slider'),
	$slides: $('.js-projects-slide'),
	$heroImage: $('.js-responsive-image'),
	activeClass: 'animation--started',
	pauseClass: 'animation--paused',
	btnClass: 'controls__btn--paused',
	interval: 8000,
	autoplayIframe: '?background=1&loop=1&byline=0&title=0&controls=0&muted=1&autoplay=1',

	init: function() {
		if (!this.$slider.length) return;
		this.setMobileImage();
		this.loadSlider();
		this.playSliderOnScroll();
	},

	initFirst: function(item) {
		const $slides = $(item).find('.js-projects-slide');
		const $currentSlide = $(item).find('.js-slider-current');
		const $totalSlide = $(item).find('.js-slider-total');
		const $iframe = $slides.eq(0).find('iframe');
		$slides.eq(0).addClass(this.activeClass);
		$currentSlide.html('1');
		$totalSlide.html($slides.length);
		if ($iframe.length) {
			const url = $iframe.parent().data('iframe') + this.autoplayIframe;
			$iframe[0].src = url;
		}
	},

	automaticSlider: function(item, ind) {
		const $slides = $(item).find('.js-slide');
		//const $allVideos = $slides.find('video');
		const $currentSlide = $slides.eq(ind);
		const $currnetVideo = $currentSlide.find('video');
		const $currentIframe = $currentSlide.find('iframe');
		const currentSlideNum = $(item).find('.js-slider-current');
		if ($currnetVideo.length) {
			$currnetVideo[0].currentTime = 0;
		}
		if ($currentIframe.length) {
			const url = $currentIframe.parent().data('iframe') + this.autoplayIframe;
			$currentIframe[0].src = url;
		}
		$slides.not($currentSlide).removeClass(this.activeClass);
		$currentSlide.addClass(this.activeClass);
		currentSlideNum.html(ind + 1);
	},

	loadSlider: function() {
		const _this = this;
		this.$slider.each(function() {
			_this.initFirst(this);
			const slides = $(this).find('.js-slide');
			const $slidePlayBtn = $(this).find('.js-slider-btn');
			const progressFullWidt = $(this).find('.js-full-width').outerWidth();
			const $slideNextBtn = $(this).find('.js-slider-next');
			const isSection = $(this).data('section');

			let autoSlide = null;
			let timeOutSlide = null;
			let isPaused = false;
			let slideIndex = 1;

			let time = 0;
			let progressLineWidth = 0;

			// automatic slider
			autoSlide = setInterval(() => {
				if (isPaused) return;
				if (slideIndex === slides.length) {
					slideIndex = 0;
				}
				_this.automaticSlider(this, slideIndex);
				slideIndex++;
			}, _this.interval);

			// next slide
			$slideNextBtn.on('click', () => {
				clearInterval(autoSlide);
				clearTimeout(timeOutSlide);
				slides.removeClass(_this.activeClass).removeClass(_this.pauseClass);
				$slidePlayBtn.removeClass(_this.btnClass);
				if (slideIndex === slides.length) {
					slideIndex = 0;
				}
				_this.automaticSlider(this, slideIndex);
				slideIndex += 1;
				autoSlide = setInterval(() => {
					if (isPaused) return;
					if (slideIndex === slides.length) {
						slideIndex = 0;
					}
					_this.automaticSlider(this, slideIndex);
					slideIndex++;
				}, _this.interval);
			});
			// play-pause slider
			$slidePlayBtn.on('click', () => {
				if (isPaused) {
					// play
					isPaused = false;
					time = Math.round((100 - (progressLineWidth * 100 / progressFullWidt)) * 80);
					$(this).find('.animation--started').removeClass(_this.pauseClass);
					$slidePlayBtn.removeClass(_this.btnClass);
					timeOutSlide = setTimeout(() => {
						$slideNextBtn.trigger('click');
					}, time);

				} else {
					// pause
					isPaused = true;
					clearInterval(autoSlide);
					clearTimeout(timeOutSlide);
					$(this).find('.animation--started').addClass(_this.pauseClass);
					$slidePlayBtn.addClass(_this.btnClass);
					progressLineWidth = $(this).find('.js-progress').width();
				}
			});
			if (isSection) {
				$slidePlayBtn.trigger('click');
			}
		});
	},

	playSliderOnScroll: function() {
		let isLoaded = false;
		this.$window.on('load scroll', () => {
			if (isLoaded) return;
			this.$slider.each((i, item) => {
				const $item = $(item);
				const isSection = $(item).data('section');
				const $slidePlayBtn = $(item).find('.js-slider-btn');
				const animationPoint = this.$window.scrollTop() + (this.$window.height() * 0.6);
				const itemOffset = $item.offset().top;
				if (animationPoint > itemOffset && isSection) {
					$slidePlayBtn.trigger('click');
					$(item).removeAttr('data-section');
					isLoaded = true;
				}
			});
		});
	},

	setMobileImage: function() {
		const windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
		if (!this.$heroImage.length || windowWidth > 767) return;
		this.$heroImage.each((i, item) => {
			const itemImage = $(item).data('mobile-image');
			$(item).css('background-image', 'url("' + itemImage + '")');
		});
		this.$slider.find('.js-video').remove();
		this.$slider.find('.js-iframe').remove();
	}
};*/