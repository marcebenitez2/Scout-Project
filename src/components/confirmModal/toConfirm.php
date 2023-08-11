<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "scout";
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Error de conexión a la base de datos: " . $conn->connect_error);
}

$id = $_POST['id'];
$active = $_POST['active'];

$sql = "UPDATE notifications SET active ='$active' WHERE id = $id";

if ($conn->query($sql) === TRUE) {
    echo "Datos actualizados correctamente";
} else {
    echo "Error al actualizar los datos: " . $conn->error;
}

$conn->close();

?>