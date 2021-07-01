<?php 
	require_once('conn.php');
	require_once('utils.php');
  session_start();
  $username = $_SESSION['username'];
  $id = $_GET['id'];
  $page = $_GET['page'];
	$sql = "SELECT C.comment AS comment, C.id AS id, C.username AS username ".
				 "FROM halloju_comments AS C ". 
				 "WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
  $stmt->execute();
	$result = $stmt->get_result();
  
	if(!$result) {
		die('Error:'.$conn->error);
	}
  $row = $result->fetch_assoc();
?>

<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">
  <title>編輯留言</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=1">
  <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css">
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <div class="board">
  <header>Edit Comments</header>
  <form action="edit_comment_handler.php" method="POST">
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
    <div>
      <textarea class="add-comment" name="comment" cols="30" rows="10"><?php echo escape($row['comment']); ?></textarea>
      <input type="hidden" name="comment_id" value="<?php echo escape($id); ?>">
      <input type="hidden" name="page" value="<?php echo escape($page); ?>">
    </div>
    <div><button class="btn">提交</button></div>
	</form>
  </div>
</body>

</html>