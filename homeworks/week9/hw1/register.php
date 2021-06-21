<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">

  <title>註冊</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=1">
  <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css">
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <div class="board">
    <div>
      <a class="btn" href="index.php">回看板</a>
      <a class="btn" href="login.php">登入</a>
    </div>
      <header>註冊</header>
      <?php if(!empty($_GET['errCode'])) {
              $code = $_GET['errCode'];
              $msg = 'Error';
              if($code == 1) {
                $msg = '資料不齊全';
              } else if($code == 2) {
                $msg = '帳號已被註冊';
              }
              echo '<div class="warning">'.$msg.'</div>';
            } ?>
      <form action="register_handler.php" method="POST">
          <div class="register_input">暱稱: <input type="text" name="nickname"></div>
          <div class="register_input">帳號: <input type="text" name="username"></div>
          <div class="register_input">密碼: <input type="password" name="password"></div>
        <div><button class="btn">提交</button></div>
      </form>
  </div>
</body>
</html>