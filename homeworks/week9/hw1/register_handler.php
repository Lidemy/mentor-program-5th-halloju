<?php 
	require_once('conn.php');
  if (empty($_POST['username']) or empty($_POST['nickname']) or empty($_POST['password'])) {
		header('Location: register.php?errCode=1');
    die();
	}
  $username = $_POST['username'];
  $nickname = $_POST['nickname'];
  $password = $_POST['password'];
  $sql = sprintf(
    'INSERT INTO halloju_users (username, nickname, password) VALUES ("%s", "%s", "%s")',
    $username, 
    $nickname, 
    $password
  );
  
  $result = $conn->query($sql);
  if(!$result) {
    $code = $conn->errno;
    if($code === 1062) {
      header('Location: register.php?errCode=2');
    }
    die($conn->error);
  }
  header('Location: index.php');
?>