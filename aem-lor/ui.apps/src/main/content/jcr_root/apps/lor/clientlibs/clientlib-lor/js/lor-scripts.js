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
    header.init();
    tabs.init();
    accordions.init();
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






const header = {
	$window: $(window),
	$navBtn: $('.js-nav-btn'),
	$header: $('.js-header'),
	$headerAnimated: $('.js-header-loaded'),
	$navItem: $('.js-main-link'),
	$navSecondaryItem: $('.js-nav-secondary'),
	$backBtn: $('.js-back-btn'),
	loadedClass: 'header--loaded',
	scrollClass: 'header--scrolled',
	mainClass: 'header--main-opened',
	secondaryClass: 'header--secondary-opened',
	tertiaryClass: 'header--tertiary-opened',
	navSecondaryClass: 'nav__item--opened',
	navTertiaryClass: 'nav__secondary-item--opened',
	$searchBtn: $('.js-search-btn'),
	$search: $('.js-search'),
	$serchInput: $('.js-search-input'),
	searchClass: 'search-data--opened',
	isLoaded: false,

	init: function() {
		this.loadHeader();
		this.toggleMainNavigation();
		this.scrollHeader();
		this.bindNavEvents();
		this.backToPrevious();
		this.closeMenuEvent();
		this.toggleSearch();
	},

	loadHeader: function() {
		setTimeout(() => {
			this.$headerAnimated.addClass(this.loadedClass);
			this.isLoaded = true;
		}, 2000);
	},

	scrollHeader: function() {
		this.$window.on('load scroll', () => {
			if (!this.isLoaded) return;
			if (this.$window.scrollTop() > 5) {
				this.$header.addClass(this.scrollClass);
			} else {
				this.$header.removeClass(this.scrollClass);
			}
		});
	},

	closeMenu: function() {
		this.$header.removeClass(this.mainClass).removeClass(this.secondaryClass).removeClass(this.tertiaryClass);
		this.$navItem.parent().removeClass(this.navSecondaryClass);
		this.$navSecondaryItem.parent().removeClass(this.navTertiaryClass);
	},

	toggleMainNavigation: function() {
		this.$navBtn.on('click', () => {
			if (this.$header.hasClass(this.mainClass)) {
				this.closeMenu();
				//helpers.enableScroll();
			} else {
				if (this.$search.hasClass(this.searchClass)) {
					this.$search.removeClass(this.searchClass);
				}
				this.$header.addClass(this.mainClass);
				//helpers.disableScroll();
			}
		});
	},

	bindNavEvents: function() {
		const _this = this;
		this.$navItem.on('click', function(e) {
			e.preventDefault();
			_this.openSubmenu(this, _this.$navItem, _this.secondaryClass, _this.navSecondaryClass);
			if (_this.$header.hasClass(_this.tertiaryClass)) {
				_this.$header.removeClass(_this.tertiaryClass);
				_this.$navSecondaryItem.parent().removeClass(_this.navTertiaryClass);
			}
		});

		this.$navSecondaryItem.on('click', function(e) {
			e.preventDefault();
			_this.openSubmenu(this, _this.$navSecondaryItem, _this.tertiaryClass, _this.navTertiaryClass);
		});
	},

	backToPrevious: function() {
		this.$backBtn.on('click', () => {
			if (this.$header.hasClass(this.secondaryClass) && this.$header.hasClass(this.tertiaryClass)) {
				this.$header.removeClass(this.tertiaryClass);
				this.$navSecondaryItem.parent().removeClass(this.navTertiaryClass);
			} else {
				this.$header.removeClass(this.secondaryClass);
				this.$navItem.parent().removeClass(this.navSecondaryClass);
			}
		});
	},

	closeMenuEvent: function() {
		$(document).on('click', (e) => {
			if (!this.$header.hasClass(this.mainClass)) return;
			if ($(e.target).closest('.js-header').length === 0) {
				this.closeMenu();
				//helpers.enableScroll();
			}
		});
	},

	toggleSearch: function() {
        console.log("toggle")
		this.$searchBtn.on('click', () => {
			if (this.$search.hasClass(this.searchClass)) {
            	console.log("toggle111")
				this.$search.removeClass(this.searchClass);
				//helpers.enableScroll();
			} else {
                console.log("toggle222")
				if (this.$header.hasClass(this.mainClass)) {
					this.closeMenu();
				}
				this.$search.addClass(this.searchClass);
				setTimeout(() => {
					$('.js-search-input').focus();
				}, 500);
				//helpers.disableScroll();
			}
		});
	},

	openSubmenu: function(item, items, headerClass, navClass) {
		const $currentItem = $(item).parent();
		$(items).parent().not($currentItem).removeClass(navClass);
		$currentItem.addClass(navClass);
		this.$header.addClass(headerClass);
	}
};





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