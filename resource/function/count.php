<?php
session_start();
include_once("config.php");
$items_per_group = 70;
$_SESSION['items_per_group'] = $items_per_group;
$results = $dbh->query("SELECT COUNT(*) as t_records FROM files");
$total_records = $results->fetchObject();
$total_groups = ceil($total_records->t_records/$items_per_group);

echo json_encode($total_groups);

?>