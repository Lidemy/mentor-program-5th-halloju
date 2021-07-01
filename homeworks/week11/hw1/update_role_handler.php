<?php 
	require_once('conn.php');
  require_once('utils.php');
  if (empty($_POST['role'])) {
		header('Location: user_role_manage.php');
    die();
	}
  session_start();
	$username = $_SESSION['username'];
  $user = getUserFromUsername($username);

  if($user === NULL || $user['role']!=0) {
    header("Location: index.php");
    exit;
  }

  $changed_username = $_POST['username'];
	$role = intval($_POST['role']);
  $sql = "UPDATE halloju_users SET role=? WHERE username=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('is', $role, $changed_username);
  $stmt->execute();
 
  
 
  $result = $stmt->get_result();
  if($result->num_rows === 0) {
    die($conn->error);
  }

  header('Location: user_role_manage.php');
  exit;
?>