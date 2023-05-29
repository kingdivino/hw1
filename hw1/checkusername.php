<?php
    require_once 'dbconfig.php';
    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die("Errore: ".mysqli_connect_error());
    $utente = $_GET['username'];
    $res = mysqli_query($conn, "SELECT * FROM provoletta WHERE username = \"$utente\"");
    if(mysqli_num_rows($res) > 0){
        echo json_encode(array(
            'disponibile' => false
        ));
        mysqli_close($conn);
    }
    else{
        echo json_encode(array(
            'disponibile' => true
        ));
        mysqli_close($conn);
    }
?>