<?php 
	require_once('conn.php');
	require_once('utils.php');
  session_start();
	$username = $_SESSION['username'];
  if (empty($username)) {
    header("Location: index.php");
    exit;
  }

	$sql = "SELECT * ".
				 "FROM halloju_articles ". 
				 "WHERE is_delete IS NULL ".
				 "ORDER BY id DESC";

	$result = $conn->query($sql);
	if(!$result->num_rows === 0) {
		die('Error:'.$conn->error);
	}
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
        <a href='index.php'>Who's Blog</a>
      </div>
      <ul class="navbar__list">
        <div>
          <li><a href="article_list.php">文章列表</a></li>
          <li><a href="#">分類專區</a></li>
          <li><a href="#">關於我</a></li>
        </div>
        <div>
          <li><a href="edit.php">新增文章</a></li>
          <li><a href="logout.php">登出</a></li>
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
    <div class="container">
      <div class="admin-posts">

      <?php while($row = $result->fetch_assoc()) {?>
          <div class="admin-post">
            <div class="admin-post__title">
                <?php echo escape($row['title'])?>
            </div>
            <div class="admin-post__info">
              <div class="admin-post__created-at">
                <?php echo escape($row['create_at'])?>
              </div>
              <a class="admin-post__btn" href="edit.php?id=<?php echo $row['id']; ?>">
                編輯
              </a>
              <a class="admin-post__btn" href="delete.php?id=<?php echo $row['id']; ?>">
                刪除
              </a>
            </div>
          </div>
        <?php	} ?>

      </div>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>