
$(window).on('load', () => {
	setTimeout(() => {
		$('html').addClass('loaded');
	}, 10);
});

$(document).ready(() => {
    header.init();
    search.init();
});

const helpers = {
	delay: function(callback, ms) {
		let timer = 0;
		const _this = this;
		return function() {
			const context = _this;
			const args = arguments;
			clearTimeout(timer);
			timer = setTimeout(() => {
				callback.apply(context, args);
			}, ms || 0);
		};
	},

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




const search = {
	$searchInput: $('.js-search-input'),
	$searchInputResults: $('.js-search-input-items'),
	$searchTextField: $('.js-search-text'),
	$resultsWrapper: $('#js-search-results'),
	$searchResultsWrapper: $('.js-search-results-items'),
	$form: $('#js-predictive-form'),
	$formResults: $('.js-search-items'),
	$searchButton: $('.js-submit-form'),
	$resultFilters: $('.js-result-filters'),
	$resultsSearchBtn: $('.js-filter-btn'),
	$reset: $('.js-reset-search-results'),
	$allResults: $('.js-all-results'),
	$searchContent: $('.js-search-content'),
	$filterWrap: $('.js-filter-wrap'),
	$searchResultsFor: $('.js-search-results-for'),
	$noResults: $('.documents__no-results-holder'),
	$searchDataBottom: $('.search-data__bottom'),


	init: function() {
		this.hideEmptySection();
		this.inputOnchange();
		this.bindFormSubmit();
		this.bindFormSubmitSearchResults();
		this.bindSearchEvent();
		this.reset();
	},

    searchGet: function(token) {
		$.ajax({
				url : 'http://localhost:4502/wknd/search?searchText=' + token ,
				type : 'GET',
				success : function(result) {
            		console.log("success " + token)
            		console.log(result)
            		$('.search-results').empty();
            		for (let i = 0; i < result.results.length; i++) {
            			$('.search-results').append(
            						'<div class="search-data__item"><span class="search-data__name text">' + result.results[i].title + '</span><div class="search-data__content"><p class="search-data__text text">' + token + '</p></div></div>'
            			);
        			}
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
            		console.log("fail " + token)
				}
			});
	},

	hideEmptySection() {
		if (this.$searchInput.val() && this.$searchInput.val().length === 0) {
			this.$searchContent.hide();
    		//let searchImg = $('.search-icon')
    		//searchImg.attr('src', '/content/dam/lor/ico-close.svg');
    		//console.log($searchImg)
		}
	},

	inputOnchange: function() {
        console.log("A")
		const _this = this;
		this.$searchInput.on('keyup', function() {
			_this.$searchContent.show();
			const value = $(this).val();
			_this.$searchTextField.html(value);
			if (_this.$searchInput.val().length === 0) {
				_this.$searchContent.hide();
			}
            console.log("B")
		});
	},

	bindSearchEvent: function() {
        console.log("C")
		const _this = this;
		if (this.$noResults.length > 0) {
			this.$searchDataBottom.empty();
		}
		this.$searchInput.on('input', helpers.delay(() => {                                       
			this.$form.submit();
            console.log("D")
        	console.log(this.$searchInput.val())
        	this.searchGet(this.$searchInput.val());
		}, 200));

		this.$searchButton.on('click', (e) => {
			e.preventDefault();
			const fo = $('#js-predictive-form')[0].action;
			window.location.href = fo + '?q=' + this.$searchInput.val();
		});

		this.$allResults.on('click', (e) => {
			e.preventDefault();
			const fo = $('#js-predictive-form')[0].action;
			window.location.href = fo + '?q=' + this.$searchInput.val();
		});

		this.$searchInput.on('keypress', (e) => {
			if (e.which === 13) {
				e.preventDefault();
				const fo = $('#js-predictive-form')[0].action;
				window.location.href = fo + '?q=' + this.$searchInput.val();
			}
		});

		this.$searchInputResults.on('input', helpers.delay(() => {
			this.$filterWrap.show();
			this.$formResults.submit();
			this.bindFilters();
			const fo = this.$formResults[0].action;
			window.history.pushState('', '', fo + '?q=' + this.$searchInputResults.val());
			_this.$searchResultsFor.text(this.$searchInputResults.val());
		}, 200));

		$(document).on('click', '#js-filter-keys', function(e) {
			const $this = $(this);
			e.preventDefault();
			let buttonVal = $this.val();
			if (buttonVal === 'All results') {
				buttonVal = '';
			}
			const data = {
				query: _this.$searchInputResults.val(),
				page: 1,
				filter: buttonVal
			};
			$.get({
				url: '/umbraco/surface/SearchListing/SearchResultItems',
				data: data
			}).then(response => {
				_this.$searchResultsWrapper.html(response);
			});
		});
	},

	bindFormSubmit: function() {
		this.$form.on('submit', (e) => {
			e.preventDefault();
			const data = {
				query: this.$searchInput.val(),
				page: 1
			};
			$.get({
				url: '/umbraco/surface/SearchListing/Search',
				data: data
			}).then(response => {
				this.$resultsWrapper.html(response);
			});
		});
	},

	bindFormSubmitSearchResults: function() {
		this.$formResults.on('submit', (e) => {
			e.preventDefault();
			const data = {
				query: this.$searchInputResults.val(),
				page: 1
			};
			$.get({
				url: '/umbraco/surface/SearchListing/SearchResultItems',
				data: data
			}).then(response => {
				this.$searchResultsWrapper.html(response);
				this.bindFilters();
			});
		});
	},

	bindFilters: function() {
		const data = {
			query: this.$searchInputResults.val()
		};
		$.get({
			url: '/umbraco/surface/SearchListing/FilterList',
			data: data
		}).then(response => {
			this.$resultFilters.html(response);
		});
	},

	reset: function() {
		const _this = this;
		_this.$reset.on('click', (e) => {
			e.preventDefault();
			$('button.filter__button').removeClass('filter__button--active');
			this.$searchResultsWrapper.empty();
			this.$filterWrap.hide();
			this.$searchResultsFor.text('');
			this.$resultFilters.empty();
		});
	},

};