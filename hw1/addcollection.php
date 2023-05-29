<?php
    require_once 'auth.php';
    if (!checkAuth()) {
      header('Location: login.php');
      exit;
    }

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die("Errore: ".mysqli_connect_error());
    $id = $_GET["codice"];
    $nome = $_GET["nome"];
    $img = $_GET["img"];
    $utente = $_SESSION['username'];
    $res = mysqli_query($conn, "SELECT * FROM collection");
    while($row = mysqli_fetch_assoc($res)){
        if($_SESSION['username'] == $row['utente'] && $id == $row['idcarta']){
            echo json_encode(array(
                'errore' => 'carta attualmente nei preferiti'
            ));
            mysqli_close($conn);
            exit;
        }
    }
    $query = mysqli_query($conn, "INSERT INTO collection(utente, idcarta, nomecarta, img) VALUES(\"$utente\", \"$id\",\"$nome\",\"$img\")");
    echo json_encode(array(
        'id' => "$id",
        'nome' => "$nome",
        'img' => "$img",
        'ok' => true)
    );
    mysqli_close($conn);
?>