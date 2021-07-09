<?php 
	require_once('conn.php');
  if (empty($_POST['nickname'])) {
		header('Location: index.php');
    die();
	}

  $nickname = $_POST['nickname'];
	session_start();
	$username = $_SESSION['username'];
  $sql = "UPDATE halloju_users SET nickname=? WHERE username=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $nickname, $username);
  $stmt->execute();
 
  $result = $stmt->get_result();
  if($result->num_rows === 0) {
    die($conn->error);
  }

  header('Location: index.php');
  exit;
?>