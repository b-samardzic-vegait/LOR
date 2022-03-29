
$(window).on('load', () => {
	setTimeout(() => {
		$('html').addClass('loaded');
	}, 10);
});

$(document).ready(() => {
    video.init();
});


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



