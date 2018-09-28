<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");
getData();
function getData(){
    $conn = new mysqli(__data__);
    $result = $conn->query("SELECT * FROM mentors");
    $mentors = array();
    while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
        array_push($mentors,array(
        'id'=>$rs["id"],
        'name'=>$rs["name"],
        'occupation'=>$rs["occupation"]));
    }
    $conn->close();
    $json = json_encode($mentors);
    if ($json === false) {
        // Avoid echo of empty string (which is invalid JSON), and
        // JSONify the error message instead:
        $json = json_encode(array("jsonError", json_last_error_msg()));
        if ($json === false) {
            // This should not happen, but we go all the way now:
            $json = '{"jsonError": "unknown"}';
        }
        // Set HTTP response status code to: 500 - Internal Server Error
        http_response_code(500);
    }
    echo $json;
}
?>