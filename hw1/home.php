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
    <script src="home.js" defer="true"></script>

    </head>
    <header>
        <nav id='navbar'>
            <a class="navitem" href="./collection.php">Collection</a>
            <a class="navitem" href="./deckbuilder.php">Deck Building</a>
            <a class="navitem" href="./logout.php">Logout</a>
        </nav>
    </header>

  <body>
  <section id="modal-view" class="hidden"></section>
    <div id="intestazione">
      <img src="./immagini/LogoHs.png">
      <h1 class="title">HearthStone Deck Builder</h1>
    </div>
    <div class="sfondobox">
      <div class="sfondo">
        <div class="divform">
          <div class="leftform"></div>
          <form id="form">
            <input type='text' id='carta' placeholder="Inserisci il nome di una carta">
            <input type='submit' id='submit' value='Cerca'>
          </form>
          <div class="rightform"></div>
        </div>
        <section id="center-view"></section>
      </div>
    </div>
  </body>
</html>

