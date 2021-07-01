<?php 
	require_once('conn.php');
	require_once('utils.php');
  session_start();
	$username = $_SESSION['username'];
  if (empty($username)) {
    header("Location: index.php");
    exit;
  }
  $id = $_GET['id'];
  if(!empty($id)) {
    $sql = "SELECT * ".
				 "FROM halloju_articles ". 
				 "WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();
    if(!$result) {
      die('Error:'.$conn->error);
    }
    $row = $result->fetch_assoc();
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
          <li><a href="#">文章列表</a></li>
          <li><a href="#">分類專區</a></li>
          <li><a href="#">關於我</a></li>
        </div>
        <div>
          <li><a href="admin.php">管理後台</a></li>
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
			<?php 
        if(!empty($_GET['errCode'])) {
          $code =  $_GET['errCode'];
          $msg = 'Error';
          if($code==1) {
            $msg = '請輸入標題或內容';
          }
          echo '<div class="warning">'.$msg.'</div>';
        }
			?>

      <div class="edit-post">
        <form action="add_article.php" method="POST">
          <div class="edit-post__title">
            發表文章：
          </div>
          <div class="edit-post__input-wrapper">
            <?php if(empty($id)) { ?>
              <input class="edit-post__input" name="title" placeholder="請輸入文章標題" />
            <?php } else {?>
              <input class="edit-post__input" name="title" value="<?php echo $row['title']; ?>" />
              <input type="hidden" name="article_id" value="<?php echo $id; ?>">
            <?php } ?>
          </div>
          <div class="edit-post__input-wrapper">
            <?php if(empty($id)) { ?>
              <textarea rows="20" name="content" class="edit-post__content"></textarea>
            <?php } else {?>
              <textarea rows="20" name="content" class="edit-post__content"><?php echo $row['content']; ?></textarea>
            <?php } ?>
            <input type="hidden" name="page" value="<?php echo $_SERVER['HTTP_REFERER']; ?>">
          </div>
          <div class="edit-post__btn-wrapper">
              <button class="edit-post__btn">送出</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>
