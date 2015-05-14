$(document).ready(function() {
  	dispay();
  	addId();
  	mouseLeave();
  	ifIsClcikedLike();
  	ifIsClcikedDislike();
  	download();
})


function dispay() {

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
$('.img-big').on('click', '.back', function() {
	$("#full-size").css("display", "none"); 
	$('.img-big').css('display', 'none');
	$('.img-responsive').attr('src', "");
	$('.images').removeAttr('style');
	$('.img').css({'cursor': 'pointer'});
	$("body").css("overflow", "auto");
});
$(".like").on("click", function(e) {
	e.preventDefault();
	var img = $('.img-responsive').attr('src');
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

function addId() {
	$('.images').on('mouseover', '.div-img', function() {
 		$(".img").attr('id', function(i) {
 	  	return +(i+0); 
 	});
 	$('.div-img').attr('id', function(i) {
 	  return +(i+0);
 	});
 		
 		$(this).children('.checkboxes').css('visibility', 'visible'); //if mouseover div-img show checkbox like and dislike
 	
 	});
}

function mouseLeave() {
	$('.images').on('mouseleave', '.div-img', function() {
 		$(this).children('.checkboxes').css('visibility', 'hidden');
 	});
}

function checkIfCheckboxIsClicked() {
	if(clicked[0] != null && clicked[0][thisImage]) {
		$(':input:checkbox').prop('checked', true);
	}else {
		$(':input:checkbox').prop('checked', false);
	}
}

function ifIsClcikedLike() {
	$('.images').on('click', '.like', function() {
		var parentCheckbox 	= $(this).parent();
		var parentDivImg   	= parentCheckbox.parent();
		var thisImage 	   	= parentDivImg.children().attr('src');	
 		like(thisImage.replace('imagesmall', 'images'));
	});
}

function ifIsClcikedDislike() {
	$('.images').on('click', '.dislike', function() {
		var parentCheckbox 	= $(this).parent();
		var parentDivImg   	= parentCheckbox.parent();
		var thisImage 	   	= parentDivImg.children().attr('src');	 
		dislike(thisImage.replace('imagesmall', 'images')); 
	});
}

function download() {
	var images  = {};
 	var clicked = [];

	$('.images').on('click', ':input:checkbox', function() {
		var parentCheckbox 	= $(this).parent();
		var parentDivImg   	= parentCheckbox.parent();
		var parentImg 		= parentDivImg.parent();
		var thisImage 	   	= parentImg.children().attr('src');
		var thisImageSrc 	= thisImage.replace('imagesmall', 'images');
		var thisId 			= parentImg.children().attr('id');
		
		$('.download').append("<div class='warehouse'><img class='img-thumbnail' id="+thisId+" src="+thisImage+"></img><a class='remove'>Remove</a></div>");
		$('#download').css("display", "block");
		var key = thisId;	
		
		images[key] = {
			src: thisImageSrc
		}
		clicked.push(images);
	});

	$(':input:checkbox').on('click', function() {
	var currentSrc = $(".img-responsive").attr('src');
	$('.download').append("<div class='warehouse'><img class='img-thumbnail' id="+currentImage+" src="+ currentSrc +"></img><a class='remove'>Remove</a></div>");
	$('#download').css("display", "block");
	if($('#download').data('clicked')) {
		clicked = [];
	}
	var key = currentImage;	
	images[key] = {
		src: currentSrc
	}
	clicked.push(images);
	console.log(clicked[0]);

	});

	removeImgFromWerehouse(clicked); //caling function to remove image form array and form div Werehouse

	$('#download').on('click', function() {
		$('.warehouse').remove();
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
		$(this).data('clicked', true);
		clicked = [];
		
	});
}

function removeImgFromWerehouse(clicked) {
	$('.download').on('click', '.remove', function(){
		var warehouse  	= $(this).parent();
		var imageForRemove = warehouse.children().attr('id');
		var removeDiv  	= $(this).parent().remove();
		delete clicked[0][imageForRemove];
	});
	if($('.download > .warehouse') == null) {
		$('#download').css("display", "none");
	}
}






