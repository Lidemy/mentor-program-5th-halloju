<?php 
	require_once('conn.php');
	require_once('utils.php');

	$sql = "SELECT * ".
				 "FROM halloju_articles ". 
				 "WHERE is_delete IS NULL ".
				 "ORDER BY id DESC";

	$result = $conn->query($sql);
	if(!$result->num_rows === 0) {
		die('Error:'.$conn->error);
	}

  session_start();
	$username = $_SESSION['username'];
  $user = getUserFromUsername($username);
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
          <li><a href="index.php">首頁</a></li>
          <li><a href="#">分類專區</a></li>
          <li><a href="#">關於我</a></li>
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
              <a class="read-more" href="blog.php?id=<?php echo $row['id']; ?>"><?php echo escape($row['title'])?></a>
          </div>
          <div class="admin-post__info">
            <div class="admin-post__created-at">
              <?php echo escape($row['create_at'])?>
            </div>
          </div>
        </div>
      <?php	} ?>

      </div>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>