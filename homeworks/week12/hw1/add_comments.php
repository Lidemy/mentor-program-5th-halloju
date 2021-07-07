<?php 
	require_once("conn.php");
	header("Content-type: application/json; charset=utf-8");
	header("Access-Control-Allow-Origin: *");
	
	if (empty($_POST['comment']) ||
			empty($_POST['nickname']) ||
			empty($_POST['site_key'])) 
	{
		$json = array(
			"ok" => false,
			"message" => "Please input missing Fields"
		);

		$response = json_encode($json);
		echo $response;
		die();
	}

	$comment = $_POST['comment'];
	$nickname = $_POST['nickname'];
	$site_key = $_POST['site_key'];

	$sql = "INSERT INTO halloju_discussions (site_key, nickname, comment) VALUES (?, ?, ?)";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('sss', $site_key, $nickname, $comment);
	$result = $stmt->execute();

	if (!$result) {
		$json = array(
			"ok" => false,
			"message" => $conn->error
		);

		$response = json_encode($json);
		echo $response;
		die();
	}

	$json = array(
		"ok" => true,
		"message" => "success"
	);

	$response = json_encode($json);
	echo $response;
?>
