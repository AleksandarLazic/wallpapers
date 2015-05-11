$( document ).ready(function() {

  dispay();

  
})


function dispay() {
 var images  = {};
 var clicked = [];


 $('.images').on('mouseenter','.div-img', function() {
 	$(".img").attr('id', function(i) {
 	  return +(i+0); 
 	});
 		$(this).append('<div class="checkbox"><label for="checkbox"><input type="checkbox">P.F.D</label><a class="like">Like</a><a class="dislike">Dislike</a></div>');
 		var thisImage = $(this).children().attr('src');
 		var thisId	  =	$(this).children().attr('id');
 		$('.div-img .like').on('click', function(e) {
 			e.preventDefault();
 			like(thisImage.replace('imagesmall', 'images'));
 		});
 		$('.div-img .dislike').on('click', function(e) {
 			e.preventDefault();
 			dislike(thisImage.replace('imagesmall', 'images'));
 		});
 		$('.div-img :input:checkbox').on('click', function() {
 			var thisImageSrc =thisImage.replace('imagesmall', 'images');
 			$('.download').append("<p class='readyForDownload' id="+thisId+">"+ thisImageSrc +"</p>");
			$('#download').css("display", "block");
 			
 			var key = thisId;	
			images[key] = {
				src: thisImageSrc
			}
			clicked.push(images);
 		});
 }); 
 $('.images').on('mouseleave','.div-img', function() {
 		$(this).children("div").remove();
 });


 $('.images').on("click", "img", function() { 	


 	currentImage = this.id;

	var sImg 		= $(this).attr("src");	
	var replace 	= sImg.replace("imagesmall", "images"); 
	var bImg 		= $(".img-responsive").attr('id', currentImage);
	var divBig 		= $(".img-big");
	var display 	= divBig.css("display", "block");
	var fullSize	= $("#full-size").css("display", "block");
	var src 		= bImg.attr("src", replace);
	
	if(display.css("display") == "block") {
		$("body").css("overflow", "hidden");
		$('.images').css({
			'opacity': '0.6',
			'filter': 'alpha(opacity=60)',
			'cursor': 'default',
		});
		$('.img').css({'cursor': 'default'});
	}	
 }); 

$(':input:checkbox').on('click', function() {
	var currentSrc = $(".img-responsive").attr('src');
	$('.download').append("<p class='readyForDownload' id="+currentImage+">"+ currentSrc +"</p>");
	$('#download').css("display", "block");
	var key = currentImage;	
	images[key] = {
		src: currentSrc
	}
	clicked.push(images);
 });



$('#download').on('click', function() {
	$('.download p').empty();
	$('#download').css("display", "none");
	
	var string = JSON.stringify(clicked[0]);
	
	var http = new XMLHttpRequest();
	

	http.open("POST", "check.php", true);
	http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	http.responseType = 'blob';

	http.onreadystatechange = function() {//Call a function when the state changes.
    	if(http.readyState == 4 && http.status == 200) {
	       	// check for a filename
	        var filename = "";
	        var disposition = http.getResponseHeader('Content-Disposition');
	        if (disposition && disposition.indexOf('attachment') !== -1) {
	            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
	            var matches = filenameRegex.exec(disposition);
	            if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
	        }

	        var type = http.getResponseHeader('Content-Type');
	        var blob = new Blob([http.response], { type: type });

	        if (typeof window.navigator.msSaveBlob !== 'undefined') {
	            // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
	            window.navigator.msSaveBlob(blob, filename);
	        } else {
	            var URL = window.URL || window.webkitURL;
	            var downloadUrl = URL.createObjectURL(blob);

	            if (filename) {
	                // use HTML5 a[download] attribute to specify filename
	                var a = document.createElement("a");
	                // safari doesn't support this yet
	                if (typeof a.download === 'undefined') {
	                    window.location = downloadUrl;
	                } else {
	                    a.href = downloadUrl;
	                    a.download = filename;
	                    document.body.appendChild(a);
	                    a.click();
	                }
	            } else {
	                window.location = downloadUrl;
	            }

	            setTimeout(function () { URL.revokeObjectURL(downloadUrl); }, 100); // cleanup
	        }
    	}
	}
	http.send("obj=" + string);
	$(':input:checkbox').prop('checked', false);
	clicked = {};
});

$('.img-big').on("click", ".next", function() {
	var allImgs  = $(".img").eq(++currentImage);
	var img 	 = $('.img').attr('src')[currentImage];
	var bImg 	 = $(".img-responsive").attr('id', currentImage)[0];	
	bImg.src 	 = allImgs.attr("src").replace("imagesmall", "images");

	if(clicked[0] != null && clicked[0][currentImage]) {
		$(':input:checkbox').prop('checked', true);
	}else {
		$(':input:checkbox').prop('checked', false);
	}
});
$('.img-big').on("click", ".prev", function() {
	var allImgs = $(".img").eq(--currentImage); 
	var bImg 	= $(".img-responsive").attr('id', currentImage)[0]; 
	bImg.src 	= allImgs.attr("src").replace("imagesmall", "images");

	if(clicked[0] != null && clicked[0][currentImage]) {
		$(':input:checkbox').prop('checked', true);
	}else {
		$(':input:checkbox').prop('checked', false);
	}
});
$(".like").on("click", function(e) {
	e.preventDefault();
	var img = $('.img-responsive').attr('src');
	console.log(img);
	like(img);

});
$(".dislike").on("click", function(e) {
	e.preventDefault();
	var img = $('.img-responsive').attr('src');
	dislike(img);
	
});
$('body').keyup(function(e) {
	if($(".img-big").css("display") == "block") {
		if(e.keyCode == 39) {
			var allImgs  = $(".img").eq(++currentImage);
			var img 	 = $('.img').attr('src')[currentImage];
			var bImg 	 = $(".img-responsive").attr('id', currentImage)[0];	
			bImg.src 	 = allImgs.attr("src").replace("imagesmall", "images");
	
			if(clicked[0] != null && clicked[0][currentImage]) {
				$(':input:checkbox').prop('checked', true);
			}else {
				$(':input:checkbox').prop('checked', false);
			}
		} else if (e.keyCode == 37) {
			var allImgs = $(".img").eq(--currentImage); 
			var bImg 	= $(".img-responsive").attr('id', currentImage)[0]; 
			bImg.src 	= allImgs.attr("src").replace("imagesmall", "images");
	
			if(clicked[0] != null && clicked[0][currentImage]) {
				$(':input:checkbox').prop('checked', true);
			}else {
				$(':input:checkbox').prop('checked', false);
			}
  		} else if (e.keyCode == 27) {
  			$("#full-size").css("display", "none"); 
  			$('.img-big').css('display', 'none');
  			$('.img-responsive').attr('src', "");
  			$('.images').removeAttr('style');
			$('.img').css({'cursor': 'pointer'});
			$("body").css("overflow", "auto");
  		}  
	}
});

}
function like(img) {
	$.ajax({
		type: "POST",
		url: "resource/function/data.php",
		data: {"like": img}

	});
}

function dislike(img) {
	$.ajax({
		type: "POST",
		url: "resource/function/data.php",
		data: {"dislike": img}

	});
}








