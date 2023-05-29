<?php
    include 'auth.php';

    if (checkAuth()) {
        header('Location: home.php');
        exit;
    }

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die("Errore: ".mysqli_connect_error()); //"localhost", "root", "", "provola"
    $utenti = array();
    $res = mysqli_query($conn, "SELECT * FROM provoletta");
    while($row = mysqli_fetch_assoc($res)){
        if(isset($_POST['username']) && isset($_POST['password'])){
            if(($_POST['username'] == $row['username']) && (password_verify($_POST['password'], $row['password']))){
                $_SESSION["username"] = $row['username'];
                $_SESSION["id"] = $row['id'];
                header("Location: home.php");
                exit;
            }
            $errore = true;
        }
    }
    if(isset($errore) && $errore == true){
        echo "<h1> BANANE!</h1>";
    }
    mysqli_close($conn);
?>

<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <script src="login.js" defer="true"></script>
    <link rel="stylesheet" href="login.css"/>
</head>
<body>
    <section class="sectionbox">
        <div class="box">
            <form name="formaggio" action="login.php" method="post">
                <p class="username">
                    <label>Username: <input type="text" name="username"></label>
                </p>
                <div class="password">
                    <div>
                        <span>Password: </span>
                    </div>
                    <div class="campopassword">
                        <input type="password" name="password">
                        <img class="showpassword" src="./immagini/eye.png">
                    </div>
                </div>
                <label>&nbsp;<button type='submit' class="accedi">Accedi</button></label>
            </form>
            <div id="errore"></div>
            <div class="scritta">
                <a>Non hai un account?</a>
                <a href="./register.php" class="registrati">Registrati</a>
            </div>
        </div>
        <img src="./immagini/LichKing.png" class="lich">
    </section>
</body>
</html>
