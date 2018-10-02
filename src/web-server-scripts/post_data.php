<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$mysqli = new mysqli('localhost','rudchyk','adY02E5j3i','rudchyk_mentors');
$dataObj = json_decode( file_get_contents('php://input'),true );
$data = $dataObj['data'];
$response = array();

$deletedRows = $dataObj['deleted'];
$updatedRows = $dataObj['updated'];
$addedRows = $dataObj['added'];

/* check connection */
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}

for($i = 0; $i < count($updatedRows); ++$i) {
    $updatedRow = $updatedRows[$i];
    $updatedRowID =  $updatedRow['id'];
    $updatedRowName =  $updatedRow['name'];
    $updatedRowOccupation =  $updatedRow['occupation'];
    $updatedRowSql = "UPDATE mentors SET name='".$updatedRowName."', occupation='".$updatedRowOccupation."'  WHERE id=".$updatedRowID;
    $updatedRowResult = $mysqli->query($updatedRowSql);
    
    if ($updatedRowResult === true) {
        $updatedRowMessage = $updatedRowName." was updated successfully";
    } else {
        $updatedRowMessage = "Error with updating ".$updatedRowName." ".$mysqli->error;
    }
    
    array_push($response, $updatedRowMessage);
}

for($i = 0; $i < count($addedRows); ++$i) {
    $addedRow = $addedRows[$i];
    $addedRowID =  '';
    $addedRowName =  $addedRow['name'];
    $addedRowOccupation =  $addedRow['occupation'];
    $addedRowSql = "INSERT INTO mentors(id,name,occupation) values('.$addedRowID.','".$addedRowName."','".$addedRowOccupation."')";
    $addedRowResult = $mysqli->query($addedRowSql);
    
    if ($addedRowResult === true) {
        $addedRowMessage = $addedRowName." was added successfully";
    } else {
        $addedRowMessage = "Error with adding ".$addedRowName." ".$mysqli->error;
    }
    
    array_push($response, $addedRowMessage);
}

for($i = 0; $i < count($deletedRows); ++$i) {
    $deletedRow = $deletedRows[$i];
    $deletedRowID =  $deletedRow['id'];
    $deletedRowName =  $deletedRow['name'];
    $deletedRowSql = "DELETE FROM mentors WHERE id=".$deletedRowID;
    $deletedRowResult = $mysqli->query($deletedRowSql);
    
    if ($deletedRowResult === true) {
        $deletedRowMessage = $deletedRowName." was deleted successfully";
    } else {
        $deletedRowMessage = "Error with deleting ".$deletedRowName." ".$mysqli->error;
    }
    
    array_push($response, $deletedRowMessage);
}

echo json_encode($response);

/* close connection */
$mysqli->close();

?>