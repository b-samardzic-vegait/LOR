
$(window).on('load', () => {
	setTimeout(() => {
		$('html').addClass('loaded');
	}, 10);
});

$(document).ready(() => {
    map.init();
});


const map = {

	init: function() {
		this.initFloatingMap();
	},

	initFloatingMap: function() {
		const $floatingMapItems = $('.js-map-location');
		if (!$floatingMapItems.length) return;
		$floatingMapItems.each((i, elem) => this.buildFloatingMap(elem));
	},

	buildFloatingMap: function(item) {
		const mapLat = $(item).data('lat');
		const mapLng = $(item).data('lng');
		const waterColor = '#bebebe';
		const landColor = '#d7d7d7';
		const roadColor = '#ffffff';
		const parkColor = '#c4c4c4';
		const parkColorDark = '#6f6f6f';
		const mapStyles = [
			{
				'featureType': 'administrative.country',
				'elementType': 'all',
				'stylers': [
					{
						'visibility': 'off'
					}
				]
			},
			{
				'featureType': 'administrative.locality',
				'elementType': 'labels.text.fill',
				'stylers': [
					{
						'visibility': 'on'
					},
					{
						'color': 'townColor'
					}
				]
			},
			{
				'featureType': 'landscape',
				'elementType': 'all',
				'stylers': [
					{
						'visibility': 'on'
					},
					{
						'color': landColor
					}
				]
			},
			{
				'featureType': 'poi.park',
				'elementType': 'geometry',
				'stylers': [
					{
						'visibility': 'on'
					},
					{
						'color': parkColor
					}
				]
			},
			{
				'featureType': 'poi.park',
				'elementType': 'labels.text.fill',
				'stylers': [
					{
						'visibility': 'on'
					},
					{
						'color': parkColorDark
					}
				]
			},
			{
				'featureType': 'poi.park',
				'elementType': 'labels.text.stroke',
				'stylers': [
					{
						'visibility': 'on'
					},
					{
						'color': roadColor
					}
				]
			},
			{
				'featureType': 'road.highway',
				'elementType': 'geometry',
				'stylers': [
					{
						'visibility': 'on'
					},
					{
						'color': roadColor
					}
				]
			},
			{
				'featureType': 'water',
				'elementType': 'all',
				'stylers': [
					{
						'visibility': 'on'
					},
					{
						'color': waterColor
					}
				]
			}
		];
		let pin;
		const pinBig = {
			url: '/assets/images/content/pin.svg',
			size: new google.maps.Size(42, 51),
			scaledSize: new google.maps.Size(42, 51)
		};
		const pinSmall = {
			url: '/assets/images/content/pin.svg',
			size: new google.maps.Size(23, 33),
			scaledSize: new google.maps.Size(23, 33)
		};
		if ($(item).data('icon') === true) {
			pin = pinBig;
		} else {
			pin = pinSmall;
		}
		const map = new google.maps.Map(item, {
			center: { lat: mapLat, lng: mapLng },
			zoom: 8,
			minZoom: 2,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			disableDefaultUI: true,
			styles: mapStyles,
			restriction: {
				latLngBounds: {
					east: 179,
					north: 70,
					south: -59,
					west: -179
				},
				strictBounds: false
			}
		});

		const marker = new google.maps.Marker({ // eslint-disable-line
			position: new google.maps.LatLng(mapLat, mapLng),
			draggable: false,
			icon: pin,
			map: map,
		});
	}
};   