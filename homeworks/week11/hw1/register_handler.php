<?php 
	require_once('conn.php');
  
  if (empty($_POST['username']) or empty($_POST['nickname']) or empty($_POST['password'])) {
		header('Location: register.php?errCode=1');
    die();
	}
  $username = $_POST['username'];
  $nickname = $_POST['nickname'];
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
  $sql = "INSERT INTO halloju_users (username, nickname, password) VALUES (? ,? ,?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $username, $nickname, $password);
  $stmt->execute();
  
  $result = $stmt->get_result();
  if($result->num_rows === 0) {
    $code = $conn->errno;
    if($code === 1062) {
      header('Location: register.php?errCode=2');
    }
    die($conn->error);
  }
  
  session_start();
  $_SESSION['username'] = $username;
  header('Location: index.php');
  exit;
?>