$(window).on('load', () => {
	setTimeout(() => {
		$('html').addClass('carouselcustom__loaded');
	}, 10);
});

$(document).ready(() => {
    carouselcustom.init();
});

const carouselcustom = {
	$carouselcustomwindow: $(window),
	$carouselcustomslider: $('.js-carouselcustom-slider'),
	$carouselcustomslides: $('.js-carouselcustom-slide'),
	$carouselcustomheroImage: $('.js-carouselcustom-responsive-image'),
	activeClass: 'carouselcustom__animation--started',
	pauseClass: 'carouselcustom__animation--paused',
	interval: 8000,
	autoplayIframe: '?background=1&loop=1&byline=0&title=0&controls=0&muted=1&autoplay=1',

    rte: function() {
        let contents = $('.js-carouselcustom-full-width');
		contents.each(function() {
            const tag = $(this).find('pre').html();
            const title = $(this).find('h2').html();
            const text = $(this).find('p').html();
            const linkText = $(this).find('a').html();
            const linkTarget = $(this).find('a').attr('href');
            $(this).html('<span class="carouselcustom__tag carouselcustom__animation-fade-down">' + tag + '</span><div class="carouselcustom__title-wrap"><h2 class="carouselcustom__title carouselcustom__header carouselcustom__animation-text-rises">' + title + '</h2></div><p class="carouselcustom__text carouselcustom__paragraph">' + text + '</p><a href="' + linkTarget + '" class="carouselcustom__btn carouselcustom__link"><span class="carouselcustom__btn-outline carouselcustom__color-black">' + linkText + '</span><span class="carouselcustom__color-black"><img src="/content/dam/lor/resources/ico-arrow.svg" class="carouselcustom__arrow-icon"></img></span></a><span class="carouselcustom__progress carouselcustom__animation-progress js-carouselcustom-progress"></span>');
        })
    },

	init: function() {
		if (!this.$carouselcustomslider.length) return;
		this.setMobileImage();
		this.loadSlider();
		this.playSliderOnScroll();
        this.rte();
	},

	initFirst: function(item) {
		const $slides = $(item).find('.js-carouselcustom-slide');
		const $currentSlide = $(item).find('.js-carouselcustom-slider-current');
		const $totalSlide = $(item).find('.js-carouselcustom-slider-total');
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
        const $slides = $(item).find('.js-carouselcustom-slide');
        const $currentSlide = $slides.eq(ind);
        const $currnetVideo = $currentSlide.find('video');
        const $currentIframe = $currentSlide.find('iframe');
        const currentSlideNum = $(item).find('.js-carouselcustom-slider-current');
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
		this.$carouselcustomslider.each(function() {
			_this.initFirst(this);
			const slides = $(this).find('.js-carouselcustom-slide');
			const $slidePlayBtn = $(this).find('.js-carouselcustom-slider-btn');
			const progressFullWidt = $(this).find('.js-carouselcustom-full-width').outerWidth();
			const $slideNextBtn = $(this).find('.js-carouselcustom-slider-next');
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
    			$pauseImg = $('.carouselcustom__pause-img');
				if (isPaused) {
					// play
					isPaused = false;
    				$pauseImg.attr('src', '/content/dam/lor/resources/ico-pause.svg'); 
					time = Math.round((100 - (progressLineWidth * 100 / progressFullWidt)) * 80);
					$(this).find('.carouselcustom__animation--started').removeClass(_this.pauseClass);
					timeOutSlide = setTimeout(() => {
						$slideNextBtn.trigger('click');
					}, time);

				} else {
					// pause
					isPaused = true;
    				$pauseImg.attr('src', '/content/dam/lor/resources/ico-play.svg'); 
					clearInterval(autoSlide);
					clearTimeout(timeOutSlide);
					$(this).find('.carouselcustom__animation--started').addClass(_this.pauseClass);
					progressLineWidth = $(this).find('.js-carouselcustom-progress').width();
				}
			});
			if (isSection) {
				$slidePlayBtn.trigger('click');
			}
		});
	},

	playSliderOnScroll: function() {
		let isLoaded = false;
		this.$carouselcustomwindow.on('load scroll', () => {
			if (isLoaded) return;
			this.$carouselcustomslider.each((i, item) => {
				const $item = $(item);
				const isSection = $(item).data('section');
				const $slidePlayBtn = $(item).find('.js-carouselcustom-slider-btn');
				const animationPoint = this.$carouselcustomwindow.scrollTop() + (this.$carouselcustomwindow.height() * 0.6);
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
		if (!this.$carouselcustomheroImage.length || windowWidth > 767) return;
		this.$carouselcustomheroImage.each((i, item) => {
			const itemImage = $(item).data('mobile-image');
			$(item).css('background-image', 'url("' + itemImage + '")');
		});
		this.$carouselcustomslider.find('.js-video').remove();
		this.$carouselcustomslider.find('.js-iframe').remove();
	}
};






