<?php
    if(!empty($_POST["username"]) && !empty($_POST["password"]) && !empty($_POST["email"]) && !empty($_POST["nome"]) && 
        !empty($_POST["cognome"]) && !empty($_POST["cpassword"])){
        require_once 'dbconfig.php';

        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die("Errore: ".mysqli_connect_error());
        $nome = mysqli_real_escape_string($conn, $_POST["nome"]);
        $cognome = mysqli_real_escape_string($conn, $_POST["cognome"]);
        $email = mysqli_real_escape_string($conn, $_POST["email"]);
        $username = mysqli_real_escape_string($conn, $_POST["username"]);
        $cpassword = mysqli_real_escape_string($conn, $_POST["cpassword"]);
        $password = mysqli_real_escape_string($conn, $_POST["password"]);

        $error = array();

        if(!preg_match('/^[a-zA-Z0-9_]{1,20}$/', $username)) {
            $error[] = "Username non valido";
        } else {
            $username = mysqli_real_escape_string($conn, $username);
            
            $query = "SELECT username FROM provoletta WHERE username = '$username'";
            $res = mysqli_query($conn, $query);
            if (mysqli_num_rows($res) > 0){
                $error[] = "Username già utilizzato";
            }
        }
        if (strlen($password < 8)) {
            $error[] = "Caratteri password insufficienti";
        }
        if (strcmp($password, $cpassword) != 0) {
            $error[] = "Le password non coincidono";
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $error[] = "Email non valida";
        }else {
            $email = mysqli_real_escape_string($conn, strtolower($email));
            $res = mysqli_query($conn, "SELECT email FROM provoletta WHERE email = '$email'");
            if (mysqli_num_rows($res) > 0) {
                $error[] = "Email già utilizzata";
            }
        }

        if(count($error) == 0){
            $password = password_hash($password, PASSWORD_BCRYPT);
            mysqli_query($conn, "INSERT INTO provoletta(nome, cognome, username, email, password) VALUES(\"$nome\", \"$cognome\",\"$username\",\"$email\", \"$password\")");
            mysqli_close($conn);
            header("Location: login.php");
            exit;
        }

    }
?>

<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="register.css"/>
    <script src="register.js" defer="true"></script>
    <title>Registrati</title>
</head>
<body>
    <section class="sectionbox">
        <img src="./immagini/Uther.png" class="uther">
        <div class="box">
            <form name="formaggio" action="register.php" method="post" autocomplete="off">
                <p class="formtitle">
                    Registrati
                </p>
                <p>
                    <div class="riga">
                        Nome: &nbsp; 
                        <div class="input">
                            <input type="text" name="nome" class="camponome" placeholder="Es: Giacomo">
                        </div>
                    </div>
                </p>
                <p>
                    <div class="riga">
                        Cognome: &nbsp; 
                        <div class="input">
                            <input type="text" name="cognome" class="campocognome" placeholder="Es: Parko">
                        </div>
                    </div>
                </p>
                <p>
                    <div class="riga">
                        Username: &nbsp; 
                        <div class="input">
                            <input type="text" name="username" class="campousername" placeholder="Es: giaco_mino33">
                        </div>
                        <?php
                        if (isset($_POST['submit'])) {
                            if(isset($error)){
                                echo "<div class='errore'>
                                    <span>".$error."</span>
                                </div>";
                            }
                           exit;
                        }
                        ?>
                    </div>
                </p>
                <div class="rigap">
                    <div class="riga">
                        Password: &nbsp;
                        <div class="inputp">
                            <input type="password" name="password" class="password" placeholder="Es: caccablu">
                        </div>
                    </div>
                    <img class="showpassword" src="./immagini/eye.png">
                </div>
                <p>
                    <div class="rigap">
                        <div class="riga">
                            Conferma password: &nbsp;
                            <div class="inputcp">
                                <input type="password" name="cpassword" class="cpassword" placeholder="Es: caccablu">
                            </div>
                        </div>
                        <img class="showcpassword" src="./immagini/eye.png">
                    </div>
                </p>
                <div class="riga">Email: &nbsp;
                    <div class="inpute">
                        <input type="text" name="email" class="campoemail" placeholder="Es: blablabla@schifo.com">
                    </div>
                    <?php
                        if (isset($_POST['submit'])) {
                            if(isset($error)){
                                echo "<div class='errore'>
                                    <span>".$error."</span>
                                </div>";
                            }
                           exit;
                        }
                        ?>
                </div>
                <div id="errore"></div>
                <label>&nbsp;<button type='submit' class="Iscriviti">Iscriviti</button></label>
            </form>
            <div class="scritta">
                <a>
                    Hai già un account?
                </a>
                <a class="backtologin" href="./login.php">
                    Torna al login
                </a>
            </div>
        </div>
    </section>
</body>
</html>



