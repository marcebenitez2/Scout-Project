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

$name = isset($_POST['name']) ? $conn->real_escape_string($_POST['name']) : "";
$tel = isset($_POST['tel']) ? $conn->real_escape_string($_POST['tel']) : "";
$mail = isset($_POST['mail']) ? $conn->real_escape_string($_POST['mail']) : "";
$message = isset($_POST['message']) ? $conn->real_escape_string($_POST['message']) : "";


// Prepara la consulta SQL utilizando una sentencia preparada
$sql = "INSERT INTO notifications (name, tel, mail, message,active) VALUES (?, ?, ?, ?, 1)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $name, $tel, $mail, $message);

// Ejecuta la consulta preparada
if ($stmt->execute()) {
    echo "Datos guardados correctamente";
} else {
    echo "Error al guardar los datos: " . $conn->error;
}

// Cierra la conexión a la base de datos y libera los recursos
$stmt->close();
$conn->close();
?>
