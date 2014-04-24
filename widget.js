widget = {
	config: {
		key: 'key'
		,defaults: {
			urls: {
				css: []
				,js: []
			}
		}
	},
	$: {},
	init: function(jcont, opts){
		var z = this, css = [], js = [];        
		if (z._inited) return false;
		z._inited = true;
		z.$.cont = jcont;
		z.opts = $.extend(z.config.defaults,opts);  
		for(var i=0,c=z.opts.urls.css.length;i<c;i++) {
			css.push($('<link>').appendTo($('head')).attr({type:'text/css',rel:'stylesheet'}).attr('href',z.opts.urls.css[i]))
		}
		for(var i=0,c=z.opts.urls.js.length;i<c;i++) {
			js.push($.ajax({
				url: z.opts.urls.js[i]
				,dataType: 'script'
				,cache: true
			}));
		}
		$.when.apply(css,js).done(next);        
		function next() {
			z._build();
			z._intialize();
		}
		return true;
	}
	_build: function() {
		var z = this;
		var myhtml = "";
		z.$.cont.addClass(z.config.key);
		z.$.cont.html(myhtml);
	}
	_intialize: function() {
		var z = this;
	}
);