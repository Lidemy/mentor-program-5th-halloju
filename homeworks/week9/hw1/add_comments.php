<?php 
	require_once("conn.php");
	require_once("utils.php");
	
	if (empty($_POST['comment'])) {
		die("enter comment");
	}
	$comment = $_POST['comment'];

	session_start();
	$username = $_SESSION['username'];
	$nickname = getNicknameFromUser($username);

	$sql = sprintf(
		'INSERT INTO halloju_comments (nickname, create_at, comment) VALUES ("%s", current_timestamp(), "%s")',
		$nickname,
		$comment
	);

	$result = $conn->query($sql);
	if (!$result) {
		die($conn->error);
	}
	header('Location: index.php');
?>
