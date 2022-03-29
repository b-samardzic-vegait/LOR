
$(window).on('load', () => {
	setTimeout(() => {
		$('html').addClass('loaded');
	}, 10);
});

$(document).ready(() => {
    header.init();
});

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




