//
$(window).on('load', () => {
	setTimeout(() => {
		$('html').addClass('loaded');
    	//console.log("0")
	}, 10);
});

$(document).ready(() => {
	//console.log("111")
    animations.init();
    expertise.init();
    latestNews.init();
});




const animations = {
	$window: $(window),
	$bgAnimation: $('.js-bg-animation'),
	animationClass: 'animation--started',
	bkgClass: 'latest-news--bkg',
	$sticky: $('.js-sticky'),
	scrollClass: 'sticky__box--fixed',
	absoluteClass: 'sticky__box--absolute',
	$share: $('.js-social-scroll'),

	init: function() {
		this.animationElem();
		this.bkgAnimation();
		this.scrollShare();
		setTimeout(() => {
			this.stickyOnScroll();
		}, 300);
	},

	animation: function() {
		const $animationElem = $('.js-animation');
		if (!$animationElem.length) return;
		$animationElem.each((i, item) => {
			const $item = $(item);
        	console.log("item")
			$item.addClass('animation--started');
		});
	},

	animationElem: function() {
		const $animationElem = $('.js-animation');
		if (!$animationElem.length) return;
		$(window).on('load scroll', () => {
			$animationElem.each((i, item) => {
				const $item = $(item);
				const animationPoint = $(window).scrollTop() + ($(window).height() * 0.8);
				const itemOffset = $item.offset().top;
				if (animationPoint > itemOffset) {
					$item.addClass('animation--started');
				}
			});
		});
	},

	bkgAnimation: function() {
		if (!this.$bgAnimation.length) return;
		this.$window.on('load scroll', () => {
			this.$bgAnimation.each((i, item) => {
				const $item = $(item);
				const animationPoint = this.$window.scrollTop() + (this.$window.height() * 0.6);
				const itemOffset = $item.offset().top;
				if (animationPoint > itemOffset) {
					$item.addClass(this.bkgClass);
				}
			});
		});
	},

	stickyOnScroll: function() {
		/*const windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
		if (!this.$sticky.length || windowWidth < 768) return;
		this.$sticky.each((i, item) => {
			const $i = $(item);
        	const $item = $i;
			const itemOffset = $item.offset().top;
			const elemHeight = $item.outerHeight();
			const parentBottom = $item.parent().offset().top + $item.parent().parent().parent().parent().height();
			const bottomPoint = parentBottom - elemHeight;
        	console.log("================")
            console.log($item)
            console.log($item.parent())
            console.log($item.parent().parent())
            console.log($item.parent().parent().parent())
            console.log($item.parent().parent().parent().parent())
        	console.log(itemOffset)
            console.log(elemHeight)
            console.log(parentBottom)
            console.log(bottomPoint)
            console.log("================")
			this.$window.on('load scroll', () => {
                const stickyPoint = this.$window.scrollTop() + 130;
				if (stickyPoint >= itemOffset && stickyPoint < bottomPoint) {
					$item.addClass(this.scrollClass).removeClass(this.absoluteClass);
				} else if (stickyPoint >= bottomPoint) {
					$item.addClass(this.absoluteClass).removeClass(this.scrollClass);
				} else {
					$item.removeClass(this.scrollClass).removeClass(this.absoluteClass);
				}
			});
		});*/
	},

	scrollShare: function() {
		const windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
		if (!this.$share.length || windowWidth < 1200) return;
		const topPosition = this.$share.next().position().top;
		let top = 0;
		this.$window.on('load scroll', () => {
			const stickyPoint = this.$window.scrollTop();
			top = topPosition - stickyPoint;
			if (top < 120) {
				top = 120;
			} else {
				top = topPosition - stickyPoint;
			}
			this.$share.css('top', top + 'px');
		});
	}
};







const expertise = {
	$html: $('html'),
	$expertiseBkg: $('.js-expertise-bkg-image'),
	$expertiseBoxes: $('.js-expertise-boxes'),
	$expertiseBox: $('.js-expertise-box'),
	$expertiseImage: $('.js-expertise-image'),
	$expertiseText: $('.js-expertise-bkg-text'),
	bkgClass: 'expertise__bkg-image--hover',
	trackClass: 'expertise__track--animation',
	boxHoverClass: 'expertise__box-link--hover',

	init: function() {
        //console.log("TO")
		//this.masonryLayout();
		this.setBoxImages();
		this.boxHover();
	},

	masonryLayout: function() {
		const windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
		if (!this.$expertiseBoxes.length || windowWidth < 768) return;
		this.$expertiseBoxes.each((i, elem) => {
			const $expertiseBox = $(elem).find('.js-expertise-box');
			const divFirst = document.createElement('div');
			divFirst.className = 'expertise__box-col';
			const divSecond = document.createElement('div');
			divSecond.className = 'expertise__box-col';
			$expertiseBox.each((ind, item) => {
				if (ind % 2 === 0) {
					divSecond.appendChild(item);
				} else {
					divFirst.appendChild(item);
				}
			});
			$(elem).append(divSecond);
			$(elem).append(divFirst);
		});
	},

	setBoxImages: function() {
        console.log("USLOOO")
		if (!this.$expertiseImage.length) return;
		this.$expertiseImage.each(function() {
			const imageUrl = $(this).data('image');
			$(this).css('background-image', 'url("' + imageUrl + '")');
		});
	},

	desktopHover: function() {
		const _this = this;
		this.$expertiseBox.on({
			mouseenter: function() {
				if (!$(this).hasClass('animation--started')) return;
                console.log("ENTER")
				const imageUrl = $(this).find('.js-expertise-image').data('image');
				const tagText = $(this).find('.js-expertise-tag').text();
				const tagLongText = ' ' + tagText + ' ' + tagText + ' ' + tagText + ' ' + tagText;
				const $bkgImage = $(this).closest('.js-expertise').find('.js-expertise-bkg-image');
				$bkgImage.css({
					'background-image': 'url("' + imageUrl + '")'
				});
				$bkgImage.addClass(_this.bkgClass);
				$(this).closest('.js-expertise').find('.js-expertise-bkg-text').html(tagLongText).addClass(_this.trackClass);

			},
			mouseleave: () => {
				_this.$expertiseBkg.removeAttr('style');
				_this.$expertiseBkg.removeClass(_this.bkgClass);
				_this.$expertiseText.empty().removeClass(_this.trackClass);
			}
		});
	},

	mobileHover: function() {
		let timeout = null;
		const _this = this;
		this.$expertiseBox.on('touchstart', function(e) {
			timeout = setTimeout(() => {
				e.preventDefault();
				$(this).addClass(_this.boxHoverClass);
			}, 500);
		}).on('touchend', () => {
			_this.$expertiseBox.removeClass(_this.boxHoverClass);
			clearTimeout(timeout);
		});
	},

	boxHover: function() {
		if (!this.$expertiseBox.length) return;
		const windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
		if (this.$html.hasClass('touch') && windowWidth < 1200) {
			this.mobileHover();
		} else {
			this.desktopHover();
		}
	}
};

const latestNews = {
	$articleBtn: $('.js-article-button'),
	$bannerBg: $('.js-article-bg-img'),
	bgClass: 'article__bg-image--zoom',

	init: function() {
		this.bgZoom();
	},

	bgZoom: function() {
		if (!this.$articleBtn.length) return;
		const windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
		if (windowWidth > 1200) {
			const _this = this;
			this.$articleBtn.on({
				mouseenter: function() {
					const $bkgImage = $(this).closest('.js-article-row').find('.js-article-bg-img');
					$bkgImage.addClass(_this.bgClass);
				},
				mouseleave: () => {
					_this.$bannerBg.removeClass(_this.bgClass);
				}
			});
		}
	}

};

















