<?php
  require_once('conn.php');

  function getNicknameFromUser($username) {
    global $conn;
    $user_sql = sprintf(
      'select nickname from halloju_users where username="%s"',
      $username
    );
    $result = $conn->query($user_sql);
    if (!$result) {
      die($conn->error);
    }
    $row = $result->fetch_assoc();
    $nickname = $row['nickname'];
    return $nickname;
  }
  
?>