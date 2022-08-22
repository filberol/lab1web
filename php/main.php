<?php
$box = $_POST["x"];
$text = $_POST["y"];
$radio = $_POST["r"];
$timezone = $_POST["timezone"];

$cords = "( $box, $text, $radio )";
$time = date('H:i:s', time() - $timezone * 60);
$execution = round(microtime(true) - $_SERVER['REQUEST_TIME_FLOAT'], 7);
$result = checkCords($box, $text, $radio) ? "Попадание" : "Мимо";

$jsonData = "{" .
  "\"cords\":\"$cords\"," .
  "\"time\":\"$time\"," .
  "\"exec\":\"$execution\"," .
  "\"result\":\"$result\"" .
  "}";
echo $jsonData;

function checkCords($x, $y, $r)
{
  if ($x > 0) {
    if ($y >= 0) {
      return checkCircle($x, $y, $r);
    } else {
      return false;
    }
  } else {
    if ($y > 0) {
      return checkRectangle($x, $y, $r);
    } else {
      return checkTriangle($x, $y, $r);
    }
  }
  return false;
}

function checkCircle($x, $y, $r)
{
  if ($x * $x + $y * $y <= ($r * $r) * 0.5) return true;
  return false;
}

function checkRectangle($x, $y, $r)
{
  if ($x > $r * -0.5 && $y < $r) return true;
  return false;
}

function checkTriangle($x, $y, $r)
{
  if ($x + $y >= -$r) return true;
  return false;
}
