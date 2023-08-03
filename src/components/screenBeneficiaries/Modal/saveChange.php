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

// Obtener los datos enviados desde el componente React
$id = $_POST['id'];
$name = $_POST['name'];
$birth = $_POST['birth'];
$tel = $_POST['tel'];
$branch = $_POST['branch'];
$personal_file = $_POST['personal_file'];
$medical_file = $_POST['medical_file'];

// Verificar el valor de "mode" para decidir si editar o agregar un nuevo beneficiario
$mode = $_POST['mode'];

if ($mode === 'Editar') {
    // Consulta para editar los datos del beneficiario existente
    $sql = "UPDATE beneficiaries SET name='$name', birth='$birth', tel='$tel', branch='$branch', personal_file='$personal_file', medical_file='$medical_file' WHERE id=$id";
} else if ($mode === 'Añadir') {
    // Consulta para agregar un nuevo beneficiario
    $sql = "INSERT INTO beneficiaries (name, birth, tel, branch, personal_file, medical_file) VALUES ('$name', '$birth', '$tel', '$branch', '$personal_file', '$medical_file')";
} else {
    // Si el valor de "mode" no es válido, mostrar un mensaje de error
    echo "Modo inválido";
    exit;
}

// Ejecutar la consulta
if ($conn->query($sql) === TRUE) {
    echo "Datos actualizados correctamente";
} else {
    echo "Error al actualizar los datos: " . $conn->error;
}

// Cerrar la conexión
$conn->close();
?>
