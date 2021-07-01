<?php 
	require_once('conn.php');
  require_once('utils.php');
  if (empty($_POST['comment'])) {
		header('Location: edit_comment.php?errCode=1');
    die();
	}
  session_start();
  $username = $_SESSION['username'];
  $user = getUserFromUsername($username);

  $comment = $_POST['comment'];
  $id = $_POST['comment_id'];
  $page = $_POST['page'];
  if($user['role']==0) {
    $sql = "UPDATE halloju_comments SET comment=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('si', $comment, $id);
  } else {
    $sql = "UPDATE halloju_comments SET comment=? WHERE id=? AND username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sis', $comment, $id, $username);
  }
  
  $stmt->execute();
  $result = $stmt->get_result();
  if($result->num_rows === 0) {
    die($conn->error);
  }

  header("Location: index.php?page=$page");
  exit;
?>