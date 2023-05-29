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
    <link rel="stylesheet" href="deckbuilder.css"/>
    <script src="deckbuilder.js" defer="true"></script>

    </head>
    <header>
        <nav id='navbar'>
            <a class="navitem" href="./collection.php">Collection</a>
            <a class="navitem" href="./home.php">Home</a>
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
        <section id="center-view">
            <div class='archetipo'>
                <img src="./immagini/deathknight.png"><img class='hilight'src='./immagini/hilight.png'>
                <span class='nomearc'>Cavaliere della Morte</span>
            </div>
            <div class='archetipo'>
                <img src="./immagini/demonhunter.png"><img class='hilight'src='./immagini/hilight.png'>
                <span class='nomearc'>Cacciatore di Demoni</span>
            </div>
            <div class='archetipo'>
                <img src="./immagini/druid.png"><img class='hilight'src='./immagini/hilight.png'>
                <span class='nomearc'>Druido</span>
            </div>
            <div class='archetipo'>
                <img src="./immagini/hunter.png"><img class='hilight'src='./immagini/hilight.png'>
                <span class='nomearc'>Cacciatore</span>
            </div>
            <div class='archetipo'>
                <img src="./immagini/mage.png"><img class='hilight'src='./immagini/hilight.png'>
                <span class='nomearc'>Mago</span>
            </div>
            <div class='archetipo'>
                <img src="./immagini/paladin.png"><img class='hilight'src='./immagini/hilight.png'>
                <span class='nomearc'>Paladino</span>
            </div>
            <div class='archetipo'>
                <img src="./immagini/priest.png"><img class='hilight'src='./immagini/hilight.png'>
                <span class='nomearc'>Sacerdote</span>
            </div>
            <div class='archetipo'>
                <img src="./immagini/rogue.png"><img class='hilight'src='./immagini/hilight.png'>
                <span class='nomearc'>Ladro</span>
            </div>
            <div class='archetipo'>
                <img src="./immagini/shaman.png"><img class='hilight'src='./immagini/hilight.png'>
                <span class='nomearc'>Sciamano</span>
            </div>
            <div class='archetipo'>
                <img src="./immagini/warlock.png"><img class='hilight'src='./immagini/hilight.png'>
                <span class='nomearc'>Stregone</span>
            </div>
            <div class='archetipo'>
                <img src="./immagini/warrior.png"><img class='hilight'src='./immagini/hilight.png'>
                <span class='nomearc'>Guerriero</span>
            </div>
        </section>
      </div>
    </div>
  </body>
</html>