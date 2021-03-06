/**
 * Main AngularJS Web Application
 */
var app = angular.module('tutorialWebApp', [ 'ngRoute', 'angulartics',
		'angulartics.google.analytics', 'pascalprecht.translate' ]);

/**
 * Configure the Routes
 */
app.config([ '$routeProvider', function($routeProvider) {
	$routeProvider
	// Home
	.when("/", {
		templateUrl : "partials/introduccion.html",
		controller : "PageCtrl"
	}).when("/capitulo1", {
		templateUrl : "partials/capitulo1.html",
		controller : "MainCtrl"
	}).when("/agradecimientos", {
		templateUrl : "partials/agradecimientos.html",
		controller : "PageCtrl"
	}).when("/descargas", {
		templateUrl : "partials/descargas.html",
		controller : "PageCtrl"
	})
	// else 404
	.otherwise("/404", {
		templateUrl : "partials/404.html",
		controller : "PageCtrl"
	});
} ]);

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function($scope, $http, $translate) {
	window.scrollTo(0, 0);
	$scope.changeLanguage = function(langKey) {
		$translate.use(langKey);
	};
});

/**
 * Main controller used for chapters
 */
app.controller('MainCtrl', function($scope, $http) {
	window.scrollTo(0, 0);
	$('.bio-button').unbind('click');
	$('.contact').hide();

	$('.contact-button').unbind('click');

	$('.bio-button').click(function() {
		$('.bio').slideToggle(500);
		$('.bio-button').slideToggle(200, function() {
			$('.bio-button').slideToggle(200);
		});
		if ($('.more-vids').is(":visible")) {
			$('.more-vids').slideToggle(500);
		}
	});

	// $('.decalogo-button').click(function() {
	// 	$('.decalogo').slideToggle(500);
	// 	$('.decalogo-button').slideToggle(200, function() {
	// 		$('.decalogo-button').slideToggle(200);
	// 	});
	// 	if ($('.bio').is(":visible")) {
	// 		$('.bio').slideToggle(500);
	// 	}
	// });

	$('.more-vids-button').click(function() {
		$('.more-vids').slideToggle(500);
		$('.more-vids-button').slideToggle(200, function() {
			$('.more-vids-button').slideToggle(200);
		});
		if ($('.bio').is(":visible")) {
			$('.bio').slideToggle(500);
		}
	});

	//CONTACT
	$('.contact-button').click(function() {
		$('.contact').slideToggle(200, function() {
			$('html, body').animate({
		        scrollTop:document.body.scrollHeight
		    }, 1000);
		});
	});

	setInterval(cycleImages, 5000);
	loadYTScript();
});

/**
 * Profile pic cycler.
 */
function cycleImages() {
	var $active = $('#cycler .active');
	var $next = ($active.next().length > 0) ? $active.next()
			: $('#cycler img:first');
	$next.css('z-index', 2);
	$active.fadeOut(1500, function() {
		$active.css('z-index', 1).show().removeClass('active');
		$next.css('z-index', 3).addClass('active');
	});
}

/**
 * YouTube API starter
 */
function loadYTScript() {
	var tag = document.createElement('script');

	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

var player;
/**
 * This is the automatic Callback from YouTube API
 */
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height : '390',
		width : '640',
		videoId : '',
		events : {
			'onStateChange' : onPlayerStateChange
		}
	});
	$('#vid1').click(function() {
		loadPlayer('jGHcz_TOvrI');
	});
	$('#vid2').click(function() {
		loadPlayer('oWkA_XJa8D8');
	});
	$('#vid3').click(function() {
		loadPlayer('q-M6coiGBsk');
	});
	$('#vid4').click(function() {
		loadPlayer('BeWUT-8_phU');
	});
	$('#vid5').click(function() {
		loadPlayer('4FdlamhTVlo');
	});
	$('.close-player').click(function() {
		closeVideo();
	});
}

function loadPlayer(path) {
	window.scrollTo(0, 0);
	player.loadVideoById(path);
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
			.test(navigator.userAgent)) {
		player.stopVideo();
	}
	$('.player').show();
	$('.player').animate({
		height : '100%',
		width : '100%',
		top : '0',
		left : '0'
	}, {
		duration : 2000
	// 2 seconds
	});
	$('.close-player').show();
}

function closeVideo() {
	$('.close-player').hide();
	$('.player').animate({
		height : '0',
		width : '0',
		top : '50%',
		left : '50%'
	}, {
		duration : 2000,
		complete : function() {
			player.stopVideo();
			$('.player').hide();
		}
	});
}

function onPlayerStateChange(event) {
	if (event.data === 0) {
		closeVideo();
	}
}
