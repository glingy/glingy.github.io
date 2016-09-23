<?php
	//echo "0000"
	//echo "You submitted" . ($_POST["message"] ? (": " . htmlspecialchars($_POST["message"])) : " nothing.") . "";

$host="fdb12.biz.nf";
$username="1749048_2881";
$password="M35sages";
$db_name="1749048_2881"; // Database name 
//$tbl_name="members"; // Table name 
if ($_POST["message"]) {
	$acc = mysqli_connect($host, $username, $password, $db_name) or die("Database could not connect.");
	if ($prepsql = mysqli_prepare($acc, "INSERT INTO `messages`(`message`) VALUES (?)")) {
		mysqli_stmt_bind_param($prepsql, "s", (htmlspecialchars($_POST['message'])));
		if (mysqli_stmt_execute($prepsql)) {
			echo "You submitted: " . htmlspecialchars($_POST["message"]) . "";
		} else {
			echo "There was an error in your submission of: " . htmlspecialchars($_POST["message"]) . "";
		}
	}
} else {
	echo "You submitted nothing.";
}
?>