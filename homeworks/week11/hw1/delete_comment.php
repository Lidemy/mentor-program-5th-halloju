<?php 
	require_once('conn.php');
  require_once('utils.php');
  session_start();
  $username = $_SESSION['username'];
  $user = getUserFromUsername($username);
  
  $id = $_GET['id'];
  $page = $_GET['page'];
  if($user['role']==0) {
    $sql = "UPDATE halloju_comments SET is_delete=1 WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id);
  } else {
    $sql = "UPDATE halloju_comments SET is_delete=1 WHERE id=? AND username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('is', $id, $username);
  }
  $stmt->execute();
  $result = $stmt->get_result();
  if($result->num_rows === 0) {
    die($conn->error);
  }

  header("Location: index.php?page=$page");
  exit;
?>