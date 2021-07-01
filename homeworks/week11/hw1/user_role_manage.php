<?php 
	require_once('conn.php');
	require_once('utils.php');
  
  session_start();
	$username = $_SESSION['username'];
  $user = getUserFromUsername($username);
  
	if(!empty($_GET['page'])) {
		$page = intval($_GET['page']);
	}
  if($user === NULL || $user['role']!=0) {
    header("Location: index.php");
    exit;
  }

	$page = 1;
	$num_per_page = 10;
	$offset = ($page - 1)*$num_per_page;

	$sql = "SELECT * ".
				 "FROM halloju_users ". 
				 "LIMIT ? OFFSET ?";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('ii', $num_per_page, $offset);
	$stmt->execute();

	$result = $stmt->get_result();
	if(!$result->num_rows === 0) {
		die('Error:'.$conn->error);
	}
?>

<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">
  <title>會員管理</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=1">
  <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css">
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <div class="board">
    <a class="btn" href="index.php">回看板</a>
    <header>Users</header>
		<?php if($user['role']==0){
        while($row = $result->fetch_assoc()) {?>
          <div class="comment">
            <div class="comments-info">
              <div class="nickname"><?php echo escape($row['nickname'].'(@'.$row['username'].')')?></div>
              <div class="create-at">會員權限：<?php echo $row['role'] ?>
                <span class="btn update-nickname">編輯權限</span> 
              </div>
              <div class="hide">
                <form class='edit-nickname' action="update_role_handler.php" method="POST">
                  <input type="text" name="role"></input>
                  <input type="hidden" name="username" value="<?php echo $row['username']; ?>">
                  <button class="btn">提交</button>
                </form>
              </div>
            </div>
          </div>
      <?php	} ?>
    <?php } ?>

    <?php
      $result = $conn->query("SELECT count(username) AS count FROM halloju_users");
      $row = $result->fetch_assoc();
      $last_page = ceil($row['count']/$num_per_page);
    ?>

		
    <div class='greeting'>
      <?php if($page != 1) { ?>
        <a class="btn" href="user_role_manage.php?page=1">首頁</a>
        <a class="btn" href="user_role_manage.php?page=<?php echo $page-1; ?>">上一頁</a>
      <?php } ?>
      <?php if($page != $last_page) { ?>	
        <a class="btn" href="user_role_manage.php?page=<?php echo $page+1; ?>">下一頁</a>
        <a class="btn" href="user_role_manage.php?page=<?php echo $last_page; ?>">末頁</a>
      <?php } ?>
    </div>
	</div>

  <script>
		document
		.querySelector('.board')
		.addEventListener('click', function(e) {
      if(e.target.classList.contains('update-nickname')) {
        e.target.parentNode.nextElementSibling.classList.toggle('hide')
      }
		})
	</script>
</body>

</html>