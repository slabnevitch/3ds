$(function() {

	// popups
	$(document).ready(function() {
		$('.popup-youtube').magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,

			fixedContentPos: false
		});
	
	});

	$('.course-register-form').submit(function(e) {
		$.magnificPopup.open({
			items: {
				src: $('.email-popup')
			},
			type: 'inline',
			mainClass: 'email-modal',
			callbacks: {
				beforeOpen: function() {
					if($(window).width() < 700) {
						this.st.focus = false;
					} else {
						this.st.focus = '#name';
					}
					
				},

				open: function(){
					$('body').css('overflow-x', 'visible');
				},

				close: function(){
					$('body').css('overflow-x', 'hidden');
					
				}
			}
		});
		return false;
	});

	// end of popups

	// Date
	function getTime(){
	  var date1 = new Date(); //текущая дата
		var date2 = new Date(2018, 3, 6, 15, 0, 0, 0); //дата окончания
		var timeDiff = date2.getTime() - date1.getTime();//разница м/у датами в ms
		var seconds = Math.floor((timeDiff / 1000 ) % 60);
		var minutes = Math.floor( (timeDiff /1000/60) % 60 );
		var hours = Math.floor( (timeDiff/(1000*60*60)) % 24);
		var days = Math.floor( timeDiff/(1000*60*60*24) );

		return {
			remaining: timeDiff,
			days: days,
			hours: hours,
			minutes: minutes,
			seconds: seconds

		}
	}
	
	function render(){
	  var hourField = document.querySelector('#hours .promo-date__val'),
	      minField = document.querySelector('#minutes .promo-date__val'),
	        secField = document.querySelector('#seconds .promo-date__val'),
	      daysField = document.querySelector('#days .promo-date__val'),
	      
	      hour = getTime().hours,
	      minutes = getTime().minutes,
	      seconds = getTime().seconds,
	      days = getTime().days;
  
  
  
	// добавление нулей, если одгозначная цифра в поле
	  if(hour < 10) hour = '0' + hour;
	  if(minutes < 10) minutes= '0' + minutes; 
   	if(seconds < 10) seconds= '0' + seconds;
   	if(days < 10) days= '0' + seconds;
	  
	  hourField.innerHTML = hour;
	  minField.innerHTML= minutes;
	  secField.innerHTML= seconds;
	   daysField.innerHTML= days;
	  
	  if(getTime().remaining < 0 ){
	    clearInterval(interval);
	   
	    hourField.innerHTML = '00';
	  minField.innerHTML= '00';
	  secField.innerHTML= '00';
	  daysField.innerHTML= '00';
	  } 
	}

	if($('.promo-date').length > 0){

		var interval = setInterval(render, 1000);
	}
	// end of Date

	// conttents numbering
		$('.course-list__chapter-list ul li').each(function(index, elem) {
			$(this).find('.chapter-number').text('1.' + ($(this).index() + 1));
		});
		// $('.course-list__chapter-list ul li').click(function(e) {

		// 	console.log($(this).index());
		// 	var $number = $(this).find('.chapter-number').text('1.' + ($(this).index() + 1));
		// });
	// end of conttents numbering

	// chapters toggle
		$('.course-list__chapter-title').click(function(e) {
			var $chapTitParent = $(this).parent();

			$chapTitParent.find('.course-list__chapter-list').slideToggle(200);
		});
	// end of chapters toggle

	// ikSelect
	$('.form--new select').ikSelect({
		autoWidth: false,
		dynamicWidth: true,
		extraWidth: 50,
		ddCustomClass: 'form--new__dd'
	});

	// end of ikSelect

	// scroll
	if($('.scroller').length > 0){
		var $tabsElem = $('.course-info').eq(0),
			$sidebar = $('.course-contents-wrap'),
			sidebarHeight =  $tabsElem.height();
  		$sidebar.css('max-height', sidebarHeight);

		var sidebarScroll = $('.scroller').customScroll({
				horizontal: false
			});

		var $cherryTrack = sidebarScroll.$container;

			function cherryScroll(delta) {
				var $inner = cherryCS.$inner;

				$inner.animate({'scrollTop': $inner.scrollTop() + delta + 'px'}, 100);
			}


			$cherryTrack
			.on('click', function(e) {
				var yPos = e.pageY - $(this).offset().top;
				var barTop = sidebarScroll.$bar.position().top;
				var h = myCS.$container.height() - 20;
				cherryScroll(yPos < barTop ? -h : h);
			});
		
	}
	// end of scroll

	


	// tabs
		var $reviewSlider = $('.course-review-slider').slick();
			$reviewSlider.slick('unslick');
		
		var $tabs = $('.tabs__link');

		$tabs.on('click', function(e) {
			e.preventDefault();
			var $th = $(this),
				$href = $th.attr('href'),
				$parent = $th.parent();
			$parent.addClass('tabs__item--active')
					.siblings()
					.removeClass('tabs__item--active');
							
			$($href).removeClass('hidden')
					.siblings()
					.addClass('hidden');
			
			if($($href).hasClass('tabs__item--reviews')){
				$reviewSlider.slick({
					infinite:true
				});
			}else{
				$reviewSlider.slick('unslick');
			}
		});
	// end of tabs

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });
	
});

$(window).load(function() {

	$(".loader_inner").fadeOut();
	$(".loader").delay(400).fadeOut("slow");

});
