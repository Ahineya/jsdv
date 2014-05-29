<?php
$s = $_POST['validate-data'];
echo ($s == date("Y")) ? "true" : "false";