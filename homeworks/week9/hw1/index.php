<?php 
	require_once('conn.php');
	require_once('utils.php');
	$result = $conn->query("SELECT * FROM halloju_comments order by id desc");
	if(!$result) {
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
			$nickname = getNicknameFromUser($username)?> 
			<div class='greeting'><a class="btn" href="logout.php">登出</a></div>
			<?php echo '<h2 class = > Hi! '.$nickname.'</h2>';
			 }?>
	
		<header>Comments</header>
		<form action="add_comments.php" method="POST">
		<?php if($username){?>
			<div><textarea class="add-comment" name="comment" cols="30" rows="10"></textarea></div>
			<div><button class="btn">提交</button></div>
		<?php } else { ?>
				<h1>請登入留言</h1>
		<?php } ?>
		</form>
		<hr>
		<?php
			while($row = $result->fetch_assoc()) {?>
				<div class="comment">
					<div class="navatar"></div>
					<div class="comments-info">
						<div class="nickname"><?php echo $row['nickname'] ?></div>
						<div class="create-at"><?php echo $row['create_at'] ?></div>
						<div class="comment-text"><?php echo $row['comment'] ?></div>
					</div>
				</div>
		<?php	} ?>
		
	</div>
</body>
</html>