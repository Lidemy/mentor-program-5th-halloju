<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">

  <title>登入</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=1">
  <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css">
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <div class="board">
    <div>
      <a class="btn" href="index.php">回看板</a>
      <a class="btn" href="register.php">註冊</a>
    </div>
      <header>登入</header>
      <?php 
          if(!empty($_GET['errCode'])) {
            $code =  $_GET['errCode'];
            $msg = 'Error';
            if($code==1) {
              $msg = '資料不齊全';
            } else if ($code==2) {
              $msg = '帳號或密碼有誤';
            }
            echo '<div class="warning">'.$msg.'</div>';
          }
      ?>
      <form action="login_handler.php" method="POST">
          <div class="register_input">帳號: <input type="text" name="username"></div>
          <div class="register_input">密碼: <input type="password" name="password"></div>
        <div><button class="btn">提交</button></div>
      </form>
  </div>
</body>
</html>
