<?php 
	require_once("conn.php");
	require_once("utils.php");
	
	if (empty($_POST['content']) or empty($_POST['title'])) {
		header('Location: edit.php?errCode=1');
    die();
	}

  session_start();
	$username = $_SESSION['username'];
	if (empty($username)) {
    header("Location: index.php");
    exit;
  }

  $title = $_POST['title'];
	$content = $_POST['content'];
	$article_id = $_POST['article_id'];
	$page = $_POST['page'];

	if(empty($article_id)) {
		$sql = "INSERT INTO halloju_articles (title, create_at, content) VALUES (?, current_timestamp(), ?)";
		$stmt = $conn->prepare($sql);
		$stmt->bind_param('ss', $title, $content);
	} else {
		$sql = "UPDATE halloju_articles SET title=?, update_at=current_timestamp(), content=? WHERE id=?";
		$stmt = $conn->prepare($sql);
		$stmt->bind_param('ssi', $title, $content, $article_id);
  }
	$stmt->execute();
	$result = $stmt->get_result();
	if ($result->num_rows === 0) {
		die($conn->error);
	}
	header("Location:".$page);
	exit;
?>