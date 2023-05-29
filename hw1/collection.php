<?php
    require_once 'auth.php';
    if (!checkAuth()) {
      header('Location: login.php');
      exit;
    }
?>

<html>
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>HearthStone Deck Builder</title>
    <link rel="stylesheet" href="home.css"/>
    <script src="collection.js" defer="true"></script>

    </head>
    <header>
        <nav id='navbar'>
            <a class="navitem">Patch Notes</a>
            <a class="navitem" href="./home.php">Home</a>
            <a class="navitem">Deck Building</a>
            <a class="navitem" href="./logout.php">Logout</a>
        </nav>
    </header>

  <body>
  <section id="modal-view" class="hidden"></section>
    <div id="intestazione">
      <img src="./immagini/LogoHs.png">
      <h1 class="title">Collection</h1>
    </div>
    <div class="sfondobox">
      <div class="sfondo">
        <section id="center-view"></section>
      </div>
    </div>
  </body>
</html>

