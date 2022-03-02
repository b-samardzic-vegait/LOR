import helpers from './helpers';
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

	hideEmptySection() {
		if (this.$searchInput.val().length === 0) {
			this.$searchContent.hide();
		}
	},

	inputOnchange: function() {
		const _this = this;
		this.$searchInput.on('keyup', function() {
			_this.$searchContent.show();
			const value = $(this).val();
			_this.$searchTextField.html(value);
			if (_this.$searchInput.val().length === 0) {
				_this.$searchContent.hide();
			}
		});
	},

	bindSearchEvent: function() {
		const _this = this;
		if (this.$noResults.length > 0) {
			this.$searchDataBottom.empty();
		}
		this.$searchInput.on('input', helpers.delay(() => {
			this.$form.submit();
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

export default search;
