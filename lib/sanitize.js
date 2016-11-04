var sanitizer 		= require('sanitize-html');
var underscore		= require('underscore');

exports.sanitize = function(req, res, next) {
	var sanar = [req.body, req.params, req.query];
	sanar.some(function(sana) {
		if (sana) {
			underscore.each(sana, function(value, key) {
				if (!parseInt(value,10) && value !== null) {
					if(typeof value === 'string') {
						value = value.replace(/&gt;/gi, '>');
						value = value.replace(/&lt;/gi, '<');
						value = value.replace(/(&copy;|&quot;|&amp;)/gi, '');
						sana[key] = sanitizer(value, {
							allowedTags: []
						});
					}
				}
			});
		}
	});
	next();
}
