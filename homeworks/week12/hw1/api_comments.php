<?php 
	require_once("conn.php");
	header("Content-type: application/json; charset=utf-8");
	header("Access-Control-Allow-Origin: *");

	if(empty($_GET['site_key'])) {
		$json = array(
			"ok" => false,
			"message" => "Missing site_key"
		);
		$response = json_encode($json);
		echo $response;
		die();
	}

	$max_length = 6;
	$site_key = $_GET['site_key'];
	if(!empty($_GET['id'])) {
		$id = intval($_GET['id']);
		$sql = "SELECT nickname, comment, id FROM halloju_discussions WHERE site_key=? AND id < ? ORDER BY id DESC LIMIT ?";
		$stmt = $conn->prepare($sql);
		$stmt->bind_param('sii', $site_key, $id, $max_length);
	} else {
		$sql = "SELECT nickname, comment, id FROM halloju_discussions WHERE site_key=? ORDER BY id DESC LIMIT ?";
		$stmt = $conn->prepare($sql);
		$stmt->bind_param('si', $site_key, $max_length);
	}
	
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

	$result = $stmt->get_result();
	$data = array();
	while($row=$result->fetch_assoc()) {
		array_push($data, array(
			"nickname" => $row['nickname'],
			"comment" => $row['comment'],
			"id" => $row['id']
		));
	}

	$json = array(
		"ok" => true,
		"data" => $data
	);

	$response = json_encode($json);
	echo $response;
?>
