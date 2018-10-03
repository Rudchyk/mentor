<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$mysqli = new mysqli(__data__);
$mysqlTable = 'mentors';
$data = json_decode( file_get_contents('php://input'),true );
$response = array();

/* check connection */
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}

for($i = 0; $i < count($data); ++$i) {
    $item = $data[$i];
    $itemStatus = $item['status'];
    $itemID =  $item['id'];
    $itemName =  $item['name'];
    $itemOccupation =  $item['occupation'];
    
    switch ($itemStatus) {
        case 1:
            $sql = "UPDATE ".$mysqlTable." SET name='".$itemName."', occupation='".$itemOccupation."'  WHERE id=".$itemID;
            $action = "updat";
            break;
        case 2:
            $sql = "INSERT INTO ".$mysqlTable."(id,name,occupation) values('','".$itemName."','".$itemOccupation."')";
            $action = "add";
            break;
        case 3:
            $sql = "DELETE FROM ".$mysqlTable." WHERE id=".$itemID;
            $action = "remov";
            break;
    }
        
    $result = $mysqli->query($sql);
    
    if ($result === true) {
        $message = $itemName." was ".$action."ed successfully";
    } else {
        $message = "Error with ".$action."ing ".$itemName." ".$mysqli->error;
    }
    
    array_push($response, $message);
}


echo json_encode($response);

/* close connection */
$mysqli->close();

?>