<?php

$servername = "localhost";
$username = "root";
$password = "";
$bdname = "scout";

$conn = new mysqli($servername, $username, $password, $bdname);

if ($conn->connect_error) {
    die("error de conexión: " . $conn->connect_error);
}

$sql = "SELECT id, name, birth, tel, personal_file, medical_file, branch FROM beneficiaries";

$results = $conn->query($sql);

if ($results->num_rows > 0) {
    $data = array();
    while ($row = $results->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
} else {
    echo "0 results"; // Agrega un punto y coma aquí
}

$conn->close();
?>
