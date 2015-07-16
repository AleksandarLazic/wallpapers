<?php
include_once("config.php");

if(isset($_GET['get']) && $_GET['get'] == true) {

	getFromDbFiles($dbh);
}

if(isset($_POST['like']) && $_POST['like'] == true) {
	$name = $_POST['like'];
	$src = str_ireplace("resource/images/", "", $name);
	insertLike($dbh, $src);

} else if (isset($_POST['dislike']) && $_POST['dislike'] == true) {
	$name = $_POST['dislike'];
	$src = str_ireplace("resource/images/", "", $name);
	insertDislike($dbh, $src);
}



function db($dbh) { // make db;
	
	$sql=$dbh->prepare("DROP TABLE IF EXISTS images");
	$sql->execute();
	$sql = "CREATE TABLE images(
		id INT ( 11 ) AUTO_INCREMENT PRIMARY KEY,
		src VARCHAR(100));";
	$dbh->exec($sql);

}

function getFromDbFiles($dbh) {
	
	$stmt = $dbh->prepare("SELECT name FROM files");
	$stmt->execute();
	$data = $stmt->fetchAll();
	echo json_encode($data);
}
function checkIfExsistTable($dbh) {
	
	$queryFiles = "SELECT id FROM files";
	$result = $dbh->execute($queryFiles);
	if(!empty($result)) {
		$sql = "CREATE TABLE files(
			id INT ( 11 ) AUTO_INCREMENT PRIMARY KEY,
			imageId INT ( 11 ),
			name VARCHAR(100));";
		$dbh->exec($sql);
	}
}

function dropTableFiles($dbh) {

	$sql=$dbh->prepare("DROP TABLE IF EXISTS files");
	$sql->execute();
	$sql = "CREATE TABLE files(
		id INT ( 11 ) AUTO_INCREMENT PRIMARY KEY,
		imageId INT ( 11 ),
		name VARCHAR (100 ),
		disliked INT ( 1 ) NOT NULL,
		liked INT ( 1 ) NOT NULL);";
	$dbh->exec($sql);
}

function insertLike($dbh, $src) { // insert liked into files
	$sqlInsert = 'UPDATE files SET liked = liked + 1 WHERE ( name = :name )';
	$sql = $dbh->prepare($sqlInsert);
	$sql->execute(array(':name' => $src));

}

function InsertDislike($dbh, $src) { // insert disliked into files
	$sqlInsert = 'UPDATE files SET disliked = disliked + 1 WHERE ( name = :name )';
	$sql = $dbh->prepare($sqlInsert);
	$sql->execute(array(':name' => $src));
}

?>