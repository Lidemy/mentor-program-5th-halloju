<?php 
	require_once('conn.php');
  if (empty($_POST['username']) or empty($_POST['password'])) {
		header('Location: login.php?errCode=1');
    die();
	}
  $username = $_POST['username'];
  $password = $_POST['password'];
  $sql = sprintf(
    "SELECT * FROM halloju_users WHERE username='%s' and password='%s'",
    $username, 
    $password
  );
  $result = $conn->query($sql);
  if(!$result->num_rows) {
    header('Location: login.php?errCode=2');
    die();
  }
  session_start();
  $_SESSION['username'] = $username;
  header('Location: index.php');
?>