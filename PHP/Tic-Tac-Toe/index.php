<?php

require 'vendor/autoload.php';
include_once 'template.phtml';

const GAME_START = 0, GAME_PLAY = 1, GAME_WIN = 2, GAME_OVER = 3;
const X_IMAGE = 'img/image-x.png', Y_IMAGE = 'img/image-o.png';

global $gGameState, $gBoard, $gDifficulty;

function Render() {
  global $gGameState, $gBoard, $gDifficulty;

  switch ($gGameState) {
    case GAME_PLAY:
      if($_POST['btnMove'] != "") {
        $gBoard[$_POST['btnMove']] = "x";
        $_SESSION['gBoard'] = $gBoard;
      }

      if (CheckWin() == "X") {
        $gGameState = GAME_WIN;
        Render();
        return;
      }

      if (CheckFull() == 1) {
        $gGameState = GAME_OVER;
        Render();
        return;
      }

      if ($gGameState == GAME_PLAY && $_POST['btnMove'] ! "") {
        if ($gDifficulty == 1) {
          ComputerRandomMove();
        } elseif ($gDifficulty == 2) {
          $computerMove = ComputerMove();
          if ($computerMove == "") {
            ComputerRandomMove();
          } else {
            $gBoard[$computerMove] = "o";
            $_SESSION['gBoard'] = $gBoard;
          }
        } elseif ($gDifficulty == 3) {
          $computerMove = ComputerMove();
          if ($computerMove == '') {
              if ($gBoard[4] == '') {
                $computerMove = 4;
              } elseif ($gBoard[0] == '') {
                $computerMove = 0;
              } elseif ($gBoard[2] == '') {
                $computerMove = 2;
              } elseif ($gBoard[6] == '') {
                $computerMove = 6;
              } elseif ($gBoard[8] == '') {
                $computerMove = 8;
              }
              if ($computerMove == '') {
                ComputerRandomMove();
              }
            }
          }
        }

        if (CheckWin() == "O") {
          $gGameState = GAME_WIN;
          Render();
          return;
        }

        if (CheckFull() == 1) {
          $gGameState = GAME_OVER;
          Render();
          return;
        }

        DrawBoard();
        break;

    case GAME_WIN:
      EndGame();
      printf("<br><br><br><img src='img/youWin.jpg'>");
      break;

    case GAME_OVER:
      EndGame();
      printf("<br><br><br><img src='img/gameOver.jpg'>");
      break;
    }
  $_SESSION['gGameState'] = $gGameState;
}

if ($_POST['dlDifficulty'] != "") {
  $gDifficulty = $_POST['dlDifficulty'];

  EndGame();

  $gGameState = GAME_START;
  StartGame();
}

if ($gGameState == GAME_START) {
  StartGame();
}

if ($_POST['btnNewGame'] != "") {
  EndGame();

  $gGameState = GAME_START;

  StartGame();
}

function StartGame() {
  global $gGameState, $gBoard;

  if ($gGameState == GAME_START) {
    $gGameState = GAME_PLAY;
  }

  session_start();
  $turn = $_SESSION['turn'];
  if (!isset($turn)) {
    $turn = 1;
    $gBoard = array("","","","","","","","","");
    $_SESSION['gGameState'] = $gGameState;
    $_SESSION['gBoard'] = $gBoard;
    $_SESSION['gDifficulty'] = $gDifficulty;
    $_SESSION['turn'] = $turn;
  }

  $gBoard = $_SESSION['gBoard'];

  $gDifficulty = $_SESSION['gDifficulty'];
}

function EndGame() {
  global $gGameState, $gBoard;

  $gGameState = GAME_OVER;

  unset($gBoard);
  unset($gGameState);
  unset($turn);
  session_destroy();
}

function DrawBoard() {
  global $gBoard;

  printf("<table style='border: none; cellpadding : none; cellspacing: none;'>");

  $iLoop = 0;
  for ($iRow = 0; $iRow < 5; $iRow++) {
    printf("<tr>\n");
    for ($iCol=0; $iCol < 5; $iCol++) {
      if (condition) {
        // code...
      }
    }
  }
}
