<?php
    require_once 'auth.php';
    if (!checkAuth()) {
      header('Location: login.php');
      exit;
    }
    
    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die("Errore: ".mysqli_connect_error());
    $utente = $_SESSION['username'];
    $id = $_GET['codice'];
    mysqli_query($conn, "DELETE FROM collection WHERE utente = \"$utente\" AND idcarta = \"$id\"");
    echo json_encode(array(
        'errore' => 'Carta rimossa dai preferiti'
    ));
    mysqli_close($conn);

?>