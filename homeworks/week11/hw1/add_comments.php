<?php 
	require_once("conn.php");
	require_once("utils.php");
	
	if (empty($_POST['comment'])) {
		header('Location: index.php?errCode=1');
    die();
	}

	$comment = $_POST['comment'];

	session_start();
	$username = $_SESSION['username'];
	$user = getUserFromUsername($username);

	if($user['role']==2) {
		header('Location: index.php');
		exit;
	}

	$sql = "INSERT INTO halloju_comments (username, create_at, comment) VALUES (?, current_timestamp(), ?)";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('ss', $username, $comment);
	$stmt->execute();

	$result = $stmt->get_result();
	if ($result->num_rows === 0) {
		die($conn->error);
	}
	header('Location: index.php');
	exit;
?>
