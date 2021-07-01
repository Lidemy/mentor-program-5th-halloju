<?php 
	require_once('conn.php');
  require_once('utils.php');
  session_start();
  $username = $_SESSION['username'];
  if (empty($username)) {
    header("Location: index.php");
    exit;
  }
  
  $id = $_GET['id'];
  if (empty($id)) {
    header("Location: index.php");
    exit;
  }
  $sql = "UPDATE halloju_articles SET is_delete=1 WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
  $stmt->execute();
  $result = $stmt->get_result();
  if($result->num_rows === 0) {
    die($conn->error);
  }

  header("Location: admin.php");
  exit;
?>