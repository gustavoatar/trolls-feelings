
var final_transcript = '';
var recognizing = false;

if ('webkitSpeechRecognition' in window) {

  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = function() {
    recognizing = true;
    jQuery(); 
  };

  recognition.onerror = function(event) {
    console.log(event.error);
  };

  recognition.onend = function() {
    recognizing = false;
  };

  recognition.onresult = function(event) {
    var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {              
        final_transcript += event.results[i][0].transcript;
      } else {    
        interim_transcript += event.results[i][0].transcript;       
      }     
    }           
    final_transcript = linebreak(final_transcript);
    final_span.innerHTML = linebreak(final_transcript);
    interim_span.innerHTML = linebreak(interim_transcript);   
  };
}

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

function capitalize(s) {
  return s.replace(s.substr(0,1), function(m) { return m.toUpperCase(); });
}

function startDictation(event) {
  jQuery('.wave-form').removeClass('hide').addClass('fadeIn');
  jQuery('#start_button').text('listening...');
  if (recognizing) {
    recognition.stop();
    return;
  }
  final_transcript = '';
  recognition.lang = 'en-US';
  recognition.start();
  final_span.innerHTML = '';
  interim_span.innerHTML = '';
}



jQuery(window).scroll(function(){
	var wintop = $(window).scrollTop(), docheight = $(document).height(), winheight = $(window).height();
	var scrolltrigger = 0.95;
	var percentageScrolled= (wintop/(docheight-winheight))*(100);

	console.log('wintop='+wintop);
	console.log('docheight='+docheight);
	console.log('winheight='+winheight);
	console.log(wintop+'=='+(docheight-winheight));
	console.log(wintop==(docheight-winheight));
	console.log(percentageScrolled);

// 	if (percentageScrolled >= 18) {
// 		$(".holder-canvas").addClass('grow');
// 		$("#expand").addClass('hide hidemobile');	
// 		$("#collapse").removeClass('hide hidemobile');
// 	} else if(percentageScrolled < 18){
// 		$(".holder-canvas").removeClass('grow');
// 		$("#expand").removeClass('hide hidemobile');	
// 		$("#collapse").addClass('hide hidemobile');	
// 	}
}); 
jQuery(document).ready(function($){
	jQuery.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function(a) {
	  jQuery('h2.quote').append(a[0].content + "<span>— " + a[0].title + "</span>")
	});
	jQuery('.final').bind("DOMSubtreeModified", function() {
		var voiceInput = interim_span.innerHTML;
			jQuery('.year-entry').val(voiceInput.replace(/[^\d.-]/g, ''));
			jQuery('.year button').removeClass('hide').addClass('fadeIn')
		if (voiceInput.indexOf('mad') !== -1 || voiceInput.indexOf('red') !== -1 || voiceInput.indexOf('reddish') !== -1 || voiceInput.indexOf('frustrated') !== -1) {
			jQuery('body').attr('class','');
			jQuery('body').toggleClass('mad');
			jQuery('.movie').attr('src', 'https://www.youtube.com/embed/msFSzddOkrs?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&playlist=W0LHTWG-UmQ');
		}
		if (voiceInput.indexOf('joy') !== -1) {
			jQuery('body').attr('class','');
			jQuery('body').toggleClass('joy');
			jQuery('.movie').attr('src', 'https://www.youtube.com/embed/IFuFm0m2wj0?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&playlist=W0LHTWG-UmQ');
			
		}
		if (voiceInput.indexOf('great') !== -1 ){
			jQuery('body').attr('class','');
			jQuery('body').toggleClass('great');
			jQuery('.movie').attr('src', 'https://www.youtube.com/embed/bDV88ryJsfs?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&playlist=W0LHTWG-UmQ');
		} 
		if (voiceInput.indexOf('happy') !== -1 ){
			jQuery('body').attr('class','');
			jQuery('body').toggleClass('happy');
			jQuery('.movie').attr('src', 'https://www.youtube.com/embed/oWgTqLCLE8k?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&playlist=W0LHTWG-UmQ');
		} 		 
		if (voiceInput.indexOf('sad') !== -1) {
			jQuery('body').attr('class','');
			jQuery('body').toggleClass('sad');
			jQuery('.movie').attr('src', 'https://www.youtube.com/embed/la0-5QFLr14?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&playlist=W0LHTWG-UmQ');
		} 	
		if (voiceInput.indexOf('f***') !== -1 || voiceInput.indexOf('s***') !== -1 || voiceInput.indexOf('crap') !== -1 ){
			jQuery('body').attr('class','');
			jQuery('body').toggleClass('pink');
			jQuery('.movie').attr('src', 'https://www.youtube.com/embed/6hpVlKMNHpA?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&playlist=W0LHTWG-UmQ');
		} 		 			
			
	});
	var colors = ['#0042b2', '#171387', '#99b3e0', '#149be4'],
		color;

	jQuery('.members').click(function() {
		var randColor;
		do {
		  randColor = colors[Math.floor(Math.random() * colors.length)];
		} while (color == randColor);
		jQuery('.members').css('background-color', randColor);
		color = randColor;
	});

	jQuery('.dropdown').click(function() {
		jQuery(this).toggleClass('open');
	});

});


