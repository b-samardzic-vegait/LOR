
$(window).on('load', () => {
	setTimeout(() => {
		$('html').addClass('loaded');
    	//console.log("0")
	}, 10);
});

/*function callCarouselInit() {
    hero.init();
    hero.initFirst();
    hero.automaticSlider();
    hero.loadSlider();
    hero.playSliderOnScroll();
    hero.setMobileImage();
    console.log("pozvalo se")
}        
document.addEventListener("DOMContentLoaded", callCarouselInit);*/

$(document).ready(() => {
	//console.log("1")
    hero.init();
    //hero.initFirst();
    //hero.automaticSlider();
    //hero.loadSlider();
    //hero.playSliderOnScroll();
    //hero.setMobileImage();

});


//(function() {
const hero = {
	$window: $(window),
	$slider: $('.js-slider'),
	$slides: $('.js-slide'),
	$heroImage: $('.js-responsive-image'),
	activeClass: 'animation--started',
    activeItemClass: 'cmp-carousel__item--active',
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
		const $slides = $(item).find('.js-slide');
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
		//const $slides = $(item).find('.js-slide');
        const $slides = $(item).find('.cmp-carousel__item');

		//const $allVideos = $slides.find('video');
        const $currentItemSlide = $slides.eq(ind);
        const $currentSlide = $slides.eq(ind).find('.js-slide');
        console.log($currentSlide)
		//const $currentSlide = $slides.eq(ind);
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
        $slides.not($currentItemSlide).removeClass(this.activeItemClass);
		$currentItemSlide.addClass(this.activeItemClass);
        $slides.not($currentItemSlide).find('.js-slide').removeClass(this.activeItemClass);
        $currentSlide.addClass(this.activeClass);
		//$slides.not($currentSlide).removeClass(this.activeClass);
		//$currentSlide.addClass(this.activeClass);
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

			//console.log(this.$slider);

			// automatic slider
			autoSlide = setInterval(() => {
				if (isPaused) return;
				if (slideIndex === slides.length) {
					slideIndex = 0;
				}
				_this.automaticSlider(this, slideIndex);
				slideIndex++;
            	//console.log(slideIndex)
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
};

//}());