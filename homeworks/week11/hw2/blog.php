<?php 
	require_once('conn.php');
	require_once('utils.php');
  $id = 1;
  if (!empty($_GET['id'])) {
		$id = $_GET['id'];
	}

	$sql = "SELECT * ".
				 "FROM halloju_articles ". 
				 "WHERE is_delete IS NULL AND id=?";

	$stmt = $conn->prepare($sql);
	$stmt->bind_param('i', $id);
  $stmt->execute();
  $result = $stmt->get_result();
	if(!$result->num_rows === 0) {
		die('Error:'.$conn->error);
	}
  $row = $result->fetch_assoc();
	session_start();
	$username = $_SESSION['username'];
?>

<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">

  <title>部落格</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="normalize.css" />
  <link rel="stylesheet" href="style.css" />
</head>

<body>
  <nav class="navbar">
    <div class="wrapper navbar__wrapper">
      <div class="navbar__site-name">
        <a href='index.html'>Who's Blog</a>
      </div>
      <ul class="navbar__list">
        <div>
          <li><a href="#">文章列表</a></li>
          <li><a href="#">分類專區</a></li>
          <li><a href="#">關於我</a></li>
        </div>
        <div>
          <?php if(!$username) { ?>
            <li><a href="login.php">登入</a></li>
          <?php } else { ?>
						<li><a href="logout.php">登出</a></li>
						<li><a href="admin.php">管理後台</a></li>
					<?php } ?>
        </div>
      </ul>
    </div>
  </nav>
  <section class="banner">
    <div class="banner__wrapper">
      <h1>存放技術之地</h1>
      <div>Welcome to my blog</div>
    </div>
  </section>
  <div class="container-wrapper">
    <div class="posts">
      <article class="post">
        <div class="post__header">
          <div><?php echo escape($row['title']); ?></div>
          <div class="post__actions">
            <?php if(!empty($username)) { ?>
              <a class="post__action" href="edit.php?id=<?php echo $row['id']; ?>">編輯</a>
            <?php } ?>
          </div>
        </div>
        <div class="post__info">
          <?php echo escape($row['create_at']); ?>
        </div>
          <div class="post__content"><?php echo escape($row['content']); ?></div>
        </div>
      </article>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>

