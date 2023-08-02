<?php
// Configuración de la conexión a la base de datos
header("Access-Control-Allow-Origin: *");

// Permitir los métodos que se utilizan en la solicitud (por ejemplo, POST)
header("Access-Control-Allow-Methods: POST");

// Permitir los encabezados específicos que se utilizan en la solicitud
header("Access-Control-Allow-Headers: Content-Type");

// Si la solicitud es del tipo OPTIONS, finaliza aquí para la respuesta de preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

$servername = "localhost";
$username = "root";
$port = 3306;
$password = "";
$dbname = "scout";

// Recuperar los datos del formulario de inicio de sesión
$data = json_decode(file_get_contents('php://input'), true);
$usernameInput = $data['username'];
$passwordInput = $data['password'];

// Crear una conexión a la base de datos
$conn = new mysqli($servername, $username, $password, $dbname,$port);

// Verificar si hay errores en la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Escapar los valores de los campos de inicio de sesión para prevenir ataques de inyección de SQL
$usernameInput = mysqli_real_escape_string($conn, $usernameInput);
$passwordInput = mysqli_real_escape_string($conn, $passwordInput);

// Crear una consulta para verificar los datos de inicio de sesión
$sql = "SELECT * FROM account WHERE username = '$usernameInput' AND password = '$passwordInput'";

// Ejecutar la consulta
$result = $conn->query($sql);

// Verificar si se encontró un usuario con los datos ingresados
if ($result->num_rows > 0) {
    // Inicio de sesión exitoso
    $user = $result->fetch_assoc();
    $iduser = $user['iduser'];
    $username = $user['username'];
    $rol = $user['rol'];
    echo "Success|{$iduser}|{$username}|{$rol}";
} else {
    // Inicio de sesión fallido
    echo "Invalid credentials";
}


// Cerrar la conexión a la base de datos
$conn->close();
?>
