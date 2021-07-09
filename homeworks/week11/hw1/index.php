<?php 
	require_once('conn.php');
	require_once('utils.php');
	$page = 1;
	if(!empty($_GET['page'])) {
		$page = intval($_GET['page']);
	}
	$num_per_page = 5;
	$offset = ($page - 1)*$num_per_page;

	$sql = "SELECT C.username AS username, C.create_at AS create_at, ". 
				 "C.is_delete AS is_delete, C.comment AS comment, C.id as id, U.nickname AS nickname ".
				 "FROM halloju_comments AS C ". 
				 "LEFT JOIN halloju_users as U ".
				 "ON C.username = U.username ".
				 "WHERE is_delete IS NULL ".
				 "ORDER BY id DESC ". 
				 "LIMIT ? OFFSET ?";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('ii', $num_per_page, $offset);
	$stmt->execute();

	$result = $stmt->get_result();
	if(!$result->num_rows === 0) {
		die('Error:'.$conn->error);
	}

	session_start();
	$username = $_SESSION['username'];
?>

<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">
  <title>留言板</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=1">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css">
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <div class="board">
		<?php if(!$username){?>
		<div>
			<a class="btn" href="login.php">登入</a>
			<a class="btn" href="register.php">註冊</a>
		</div>

		<?php } else {
			$user = getUserFromUsername($username);?> 
			<div class='greeting'>
				<a class="btn" href="logout.php">登出</a>
				<span class="btn update-nickname">編輯暱稱</span>
				<?php if($user['role']==0) {?>
					<a class="btn" href="user_role_manage.php">會員管理</a>
				<?php } ?>

			
				<form class='hide edit-nickname' action="update_nickname_handler.php" method="POST">
						<input type="text" name="nickname"></input>
						<button class="btn">提交</button>
				</form>
			</div>
			<div><h2> Hi! <?php echo htmlspecialchars($user['nickname']); ?></h2></div>
		<?php	} ?>

		<header>Comments</header>
		<form action="add_comments.php" method="POST">
			<?php if($username and ($user['role']!=2)){?>
				<?php 
						if(!empty($_GET['errCode'])) {
							$code =  $_GET['errCode'];
							$msg = 'Error';
							if($code==1) {
								$msg = '請輸入留言';
							}
							echo '<div class="warning">'.$msg.'</div>';
						}
				?>
				<div><textarea class="add-comment" name="comment" cols="30" rows="10"></textarea></div>
				<div><button class="btn">提交</button></div>
				<?php } elseif($user['role']==2) { ?>
					<h1>您已被停權</h1>
				<?php } else {?>
					<h1>請登入留言</h1>
			<?php } ?>
		</form>
		<hr>


		<?php
			while($row = $result->fetch_assoc()) {?>
				<div class="comment">
					<div class="navatar"></div>
					<div class="comments-info">
						<div class="nickname"><?php echo htmlspecialchars($row['nickname'].'(@'.$row['username'].')')?></div>
						<div class="create-at">
							<?php echo htmlspecialchars($row['create_at']) ?>
							<?php if(!empty($username) && ($row['username']==$username || $user['role']==0)) { ?>
								<a href="edit_comment.php?id=<?php echo htmlspecialchars($row['id']) ?>&page=<?php echo htmlspecialchars($page) ?>" class="btn-comment">編輯</a>
								<a href="delete_comment.php?id=<?php echo htmlspecialchars($row['id']) ?>&page=<?php echo htmlspecialchars($page) ?>" class="btn-comment">刪除</a>
							<?php } ?>
						</div>
						
						<div class="comment-text"><?php echo htmlspecialchars($row['comment']) ?></div>
						
					</div>
				</div>
		<?php	} ?>
		<hr>

		<?php
			$result = $conn->query("SELECT count(id) AS count FROM halloju_comments WHERE is_delete IS NULL");
			$row = $result->fetch_assoc();
			$last_page = ceil($row['count']/$num_per_page);
		?>

		
		<div class='greeting'>
			<?php if($page != 1) { ?>
				<a class="btn" href="index.php?page=1">首頁</a>
				<a class="btn" href="index.php?page=<?php echo htmlspecialchars($page-1); ?>">上一頁</a>
			<?php } ?>
			<?php if($page != $last_page) { ?>	
				<a class="btn" href="index.php?page=<?php echo htmlspecialchars($page+1); ?>">下一頁</a>
				<a class="btn" href="index.php?page=<?php echo htmlspecialchars($last_page); ?>">末頁</a>
			<?php } ?>
		</div>
	</div>

	<script>
		document
		.querySelector('.update-nickname')
		.addEventListener('click', function() {
			document.querySelector('.edit-nickname').classList.toggle('hide')
		})
	</script>
	
</body>

</html>