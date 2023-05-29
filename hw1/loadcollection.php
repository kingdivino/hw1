<?php
    require_once 'auth.php';
    if (!checkAuth()) {
      header('Location: login.php');
      exit;
    }

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die("Errore: ".mysqli_connect_error());

    $utente = $_SESSION['username'];
    $count = 0;
    $carte = array();
    $res = mysqli_query($conn, "SELECT * FROM collection WHERE utente = \"$utente\"");
    while($row = mysqli_fetch_assoc($res)){
        $carte[$count] = $row;
        $count++;
    }
    echo json_encode(array(
        "carte" => $carte
    ));
    mysqli_close($conn);

?>