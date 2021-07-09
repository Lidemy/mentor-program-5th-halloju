<?php 
	require_once('conn.php');
  if (empty($_POST['username']) or empty($_POST['password'])) {
		header('Location: login.php?errCode=1');
    die();
	}
  $username = $_POST['username'];
  $password = $_POST['password'];
  $sql = "SELECT * FROM halloju_users WHERE username= ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $username);
  $stmt->execute();
 
  $result = $stmt->get_result();
  if($result->num_rows === 0) {
    header('Location: login.php?errCode=2');
    die();
  }

  $row = $result->fetch_assoc();
  if(!password_verify($password, $row['password'])) {
    header('Location: login.php?errCode=2');
    die();
  }

  session_start();
  $_SESSION['username'] = $username;
  header('Location: index.php');
  exit;
?>