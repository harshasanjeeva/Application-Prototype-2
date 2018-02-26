// $('.welcome-message h1').fitText(1,{
//   minFontSize: '30px',
//   maxFontSize: '63px'
// });
// $('.welcome-message h2').fitText(1.2,{
//   minFontSize: '20px',
//   maxFontSize: '34px'
// });


// var menuTrigger = $('#menu-trigger');
// console.log($('.site-header').outerHeight());

// var isToggled = false;

// menuTrigger.click(function(e){
//   e.preventDefault();  
//   if(!isToggled){
//    $(this).find('.fa').addClass('rotate-clockwise').removeClass('rotate-counter');
//     console.log("rotate clockwise");
//     isToggled = true;
//     $('#responsive-menu').slideToggle();
//   }else{
//     $(this).find('.fa').addClass('rotate-counter').removeClass('rotate-clockwise');
//     console.log("rotate counterclockwise");
//     $('#responsive-menu').slideToggle();
//     isToggled = false;
//   }
  
// });

var map, infoWindow;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 16
  });
  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      //if (status == google.maps.GeocoderStatus.OK) {

      //}
      console.log(pos)
      setTimeout(function() {
      //your code to be executed after 1 second
        var marker = new google.maps.Marker({
         position: pos,
         map: map,
        title: 'Hello World!' 
      });
      }, 1000);

      //  infoWindow.setPosition(pos);
      //  infoWindow.setContent('Location found.');
      //  infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}


function changeBackground() {
  document.body.style.background = 'url(./image.jpg) no-repeat';
}


$(document).ready(function() {

	function enableSearchBar(){
		$('.sb_validate').attr('id', 'searchit');
		$('.sb').animate({
			width: '250px'
		}, 500, function(){
			if(!$('.sb_validate').hasClass('pointable'))
				$('.sb_validate').toggleClass('pointable');
			$('.sb_cancel').animate({
				right: '-50px',
				top: '3px',
			}, 200);
			$('.sb_input').css({
				'width': 'calc(100% - 40px)',
				'padding-right': '40px'
			});
		});
	}

	function disableSearchBar(){
		$('.result').empty();
		$('.sb_validate').prop('disabled', true);
		setTimeout(function(){
			$('.sb_input').val('');
			$('.sb_cancel').animate({
				right: '11px',
				top: '3px'
			}, 200, function(){
				if($('.sb_validate').hasClass('pointable'))
					$('.sb_validate').toggleClass('pointable');
				$('.sb').animate({
					width: '30px'
				}, 500);
				$('.sb_input').css({
					'width': '100%',
					'padding-right': '0'
				});
				$('.sb_validate').prop('disabled', false);
			});
		},100);
	}

	$('.sb_validate').click(function(){
		enableSearchBar();
	});
	$('.sb_cancel').click(function(){
		disableSearchBar();
	});

	$(document).on('click', '#searchit', function(){
		$('.result').empty();
		var text = $('.sb_input').val();
		$('.result').append(text);
	});

	$('.sb_input').keydown(function(e) {
		if(e.keyCode == 13){
			$('.result').empty();
			var text = $('.sb_input').val();
			$('.result').append(text);
		}
		if(e.keyCode == 27){
			disableSearchBar();
			$(this).blur();
		}
	});
});