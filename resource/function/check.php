<?php

if(isset($_POST['obj']) && $_POST['obj']) {
	$obj = $_POST['obj'];
	readyForDownload($obj);
}

function readyForDownload($obj) {
	$filepath = dirname(__DIR__);
	
	if (!file_exists("{$filepath}/download")) { //cheking if folder Download exsist
    	mkdir("{$filepath}/download", 0777, true);
	}
	$array = json_decode(stripslashes($obj)); // maiking from js object array
	$result = array();
	foreach ($array as $key => $value) { // converting stdClass object to php array
    	$result[] = $value->src;
	}

	$order = "resource/images/";
	$replace = "";

	$dirName = mt_rand(); // making random intiger name for zipArchive
	
	
	$zip = new ZipArchive;
	if($zip->open("{$filepath}/download/{$dirName}.zip", ZipArchive::CREATE) === TRUE) {

		foreach ($result as $src) {
				$name = str_ireplace($order, $replace, $src);
				$zip->addFile($src, $name);
		}
		$zip->close();
	}
	
$fileName = $dirName.".zip";
$file ='../download/'.$fileName;


 // http headers for zip downloads
header("Pragma: public");
header("Expires: 0");
header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
header("Cache-Control: public");
header("Content-Description: File Transfer");
header("Content-type: application/octet-stream");
header("Content-Disposition: attachment; filename=\"".basename($file)."\"");
header("Content-Transfer-Encoding: binary");
header("Content-Length: ".filesize($file));
ob_end_flush();
readfile($file);
exit();

}

?>

