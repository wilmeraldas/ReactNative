<?php
require_once('conexion.php');
require_once('api.php');
require_once('cors.php');
//obteniedo el metodo http
$method = $_SERVER['REQUEST_METHOD'];

if($method == "GET") {
    if(!empty($_GET['codsolicitud'])){
       $codsolicitud = $_GET['codsolicitud'];
       $json = null;
       $api = new Api();
       $vector = $api->getLibro($codsolicitud);
       $json = json_encode($vector);
       echo $json; 
    }else{
       $vector = array();
       $api = new Api();
       $vector = $api->getLibros();
       $json = json_encode($vector);
       echo $json;
    }
   
}

if($method == "POST"){
    $json = null;
    $data = json_decode(file_get_contents("php://input"), true);
    $sumilla = $data['sumilla'];
    $destinatario = $data['destinatario'];
    $fecha_creacion = $data['date'];
    $tipo = $data['tipo'];
    $firma = $data['firma'];
    $contenido = $data['contenido'];
    $api = new Api();
    $json = $api->addLibro($sumilla, $destinatario,$date,$tipo,$firma,$contenido);
    echo $json;
}

if($method == "DELETE"){
    $json = null;
    $id = $_REQUEST['id'];
    $api = new Api();
    $json = $api->deleteLibro($id);
    echo $json;
}

if($method == "PUT"){
    $json = null;
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'];
    $nombre = $data['nombre'];
    $edicion = $data['edicion'];
    $api = new Api();
    $json = $api->updateLibro($id, $nombre, $edicion);
    echo $json;
}



?>