<?php
ini_set('max_execution_time', 10000);
define("BASE_URL", "http://boards.4chan.org/wg/");
define("DB_USER", "root");
define("DB_PASSWORD", '');
$dbh = new PDO('mysql:host=localhost;dbname=wp', DB_USER, DB_PASSWORD);
$dbh->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );



?>