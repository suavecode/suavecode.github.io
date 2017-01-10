(function () {
	'use strict';
	/*globals moment*/

	window.onload = function () {
		if (document.readyState === 'complete') {
			init();
		}
	};

	function init() {
		// Do something awesome here...
		var datesElement = document.querySelectorAll('.post-date');

		for (var i = 0, l = datesElement.length; i < l; i ++) {
			var de = datesElement[i];
			var date = de.getAttribute('post-date');

			de.textContent = moment(date).fromNow();
		}
	}

})();
