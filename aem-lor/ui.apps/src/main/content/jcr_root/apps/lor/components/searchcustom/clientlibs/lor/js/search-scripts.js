
$(window).on('load', () => {
	setTimeout(() => {
		$('html').addClass('loaded');
	}, 10);
});

$(document).ready(() => {
    searchS.init();
});


const searchS = {
    $searchInputS: $('#search-bar-s'),

	init: function() {
		this.bindSearchEventS();
	},

    searchGet: function(token) {
		$.ajax({
				url : 'http://localhost:4502/wknd/search?searchText=' + token ,
				type : 'GET',
				success : function(result) {
            		console.log("success " + token)
            		console.log(result)
            		$('.search-results-s').empty();
            		for (let i = 0; i < result.results.length; i++) {
            			$('.search-results-s').append(
            						'<div class="search-data__item"><span class="search-data__name text">' + result.results[i].title + '</span><div class="search-data__content"><p class="search-data__text text">' + token + '</p></div></div>'
            			);
        			}
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
            		console.log("fail " + token)
				}
			});
	},

	bindSearchEventS: function() {
        $( "#search-button-s" ).click((e) => {
            e.preventDefault();
        	console.log(this.$searchInputS.val())
        	this.searchGet(this.$searchInputS.val());
		});
		$( "#reset-button-s" ).click((e) => {
            e.preventDefault();
        	console.log(this.$searchInputS.val())
        	$('.search-results-s').empty();
		});
	},
};