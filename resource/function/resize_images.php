<?php
ini_set('max_execution_time', 1200);
ini_set('memory_limit', '256M');

$folder = "../images/";
$folder_one = "../imagesmall/";
$images = array_slice(scandir($folder), 2);
foreach ($images as $image) {
	
	$info = pathinfo($image);
	$name = $info["filename"].".".$info["extension"];

	// Set a maximum height and width
	$width = 200;
	$height = 200;

	// Get new dimensions
	list($width_orig, $height_orig) = getimagesize($folder.$name);

	$ratio_orig = $width_orig/$height_orig;

	if ($width/$height > $ratio_orig) {
	   $width = $height*$ratio_orig;
	} else {
	   $height = $width/$ratio_orig;
	}

	// Resample
	$image_p = imagecreatetruecolor($width, $height);


	// Output
	if($info["extension"] == "jpg") {
		$image = imagecreatefromjpeg($folder.$name);
		imagecopyresampled($image_p, $image, 0, 0, 0, 0, $width, $height, $width_orig, $height_orig);
		imagejpeg($image_p, $folder_one.$name, 100);
	} else {
		$image = imagecreatefrompng($folder.$name);
		imagecopyresampled($image_p, $image, 0, 0, 0, 0, $width, $height, $width_orig, $height_orig);
		imagepng($image_p, $folder_one.$name, 9);
	}
	
}
?>