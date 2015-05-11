<?php
session_start();
$items_per_group = $_SESSION['items_per_group'];
include_once("config.php"); //include config file
//include_once("count.php");

//sanitize post value
$group_number = filter_var($_POST["group_no"], FILTER_SANITIZE_NUMBER_INT, FILTER_FLAG_STRIP_HIGH);

//throw HTTP error if group number is not valid
if(!is_numeric($group_number)){
    header('HTTP/1.1 500 Invalid number!');
    exit();
}

//get current starting point of records
$position = ($group_number * $items_per_group);

//Limit our results within a specified range. 
$results = $dbh->query("SELECT name FROM files WHERE disliked <= 10 ORDER BY id ASC LIMIT $position, $items_per_group");

if ($results) { 
    //output results from database
    
    while($obj = $results->fetchObject())
    {
    		
    	echo "<div class='div-img'><img class='img' src='resource/imagesmall/".$obj->name."'></img></div>";    
    }

}
unset($obj);

?>
