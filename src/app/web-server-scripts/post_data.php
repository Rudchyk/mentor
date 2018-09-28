<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$data = json_decode( file_get_contents('php://input'),true );
// var_dump($data);

$mysqli = new mysqli('localhost','rudchyk','adY02E5j3i','rudchyk_mentors');

/* check connection */
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}

for($i = 0; $i < count($data); ++$i) {
    
    $fid =  $data[$i]['id'];
    $fname =  $data[$i]['name'];
    $foccupation =  $data[$i]['occupation'];
    
    if ($fid === '') {
        $sql = "INSERT INTO mentors(id,name,occupation) values('999','".$fname."','".$foccupation."') ";
    } else {
        $sql = "UPDATE mentors SET name='".$fname."', occupation='".$foccupation."'  WHERE id=".$fid;
    }

    $result = $mysqli->query($sql);
    
    if ($result === TRUE) {
        echo "Record updated successfully\n";
    } else {
        echo "Error updating record: ".$mysqli->error."\n";
    }
}


/* close connection */
$mysqli->close();

?>