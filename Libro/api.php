<?php
 
class Api{

public function getLibros(){
     $vector = array();
     $conexion = new Conexion();
     $db = $conexion->getConexion();
     $sql = "SELECT * FROM tsolicitud";
     $consulta = $db->prepare($sql);
     $consulta->execute();
     while($fila = $consulta->fetch()) {
        $vector[] = array(
          "codsolicitud" => $fila['codsolicitud'],
          "sumilla" => $fila['sumilla'],
          "destinatario" =>  $fila['destinatario'],
"contenido" => $fila['contenido'],
"lugar_fecha" => $fila['lugar_fecha'],
"firma" => $fila['firma'],
"tipo" => $fila['tipo'],
"fecha_creacion" => $fila['fecha_creacion']
        ); }

     return $vector;
}

public function addLibro($sumilla,$date, $destinatario,$fecha_creacion,$tipo,$firma,$contenido){
  
  $conexion = new Conexion();
  $db = $conexion->getConexion();
  $sql = "INSERT INTO tsolicitud (sumilla,fecha_creacion, destinatario,tipo,firma,contenido) VALUES (:sumilla,:datea,:destinatario,:tipo,:firma,:contenido)";
  $consulta = $db->prepare($sql);
  $consulta->bindParam(':sumilla', $sumilla);
  $consulta->bindParam(':destinatario', $destinatario);
    $consulta->bindParam(':datea', $date);
      $consulta->bindParam(':tipo', $tipo);
        $consulta->bindParam(':firma', $firma);
          $consulta->bindParam(':contenido', $contenido);
  
  $consulta->execute(); 

  return '{"msg":"libro agregado"}';
}

public function deleteLibro($id){
  $conexion = new Conexion();
  $db = $conexion->getConexion();
  $sql = "DELETE FROM libro WHERE id=:id";

  $consulta = $db->prepare($sql);
  $consulta->bindParam(':id', $id); 
  $consulta->execute();

  return '{"msg":"solicitud eliminada"}';
}

public function getLibro($id){
  $vector = array();
  $conexion = new Conexion();
  $db = $conexion->getConexion();
  $sql = "SELECT id, nombre, edicion FROM libro WHERE id=:id";
  $consulta = $db->prepare($sql);
  $consulta->bindParam(':id', $id);
  $consulta->execute();
  while($fila = $consulta->fetch()) {
     $vector[] = array(
       "id" => $fila['id'],
       "nombre" => $fila['nombre'],
       "edicion" =>  $fila['edicion']); }

  return $vector[0];
}

public function updateLibro($id, $nombre, $edicion){
  
  $conexion = new Conexion();
  $db = $conexion->getConexion();
  $sql = "UPDATE libro SET nombre=:nombre, edicion=:edicion WHERE id=:id";
  $consulta = $db->prepare($sql);
  $consulta->bindParam(':id', $id);  
  $consulta->bindParam(':nombre', $nombre);
  $consulta->bindParam(':edicion', $edicion);
  $consulta->execute();

  return '{"msg":"solicitud actualizada"}';
}

//////////////////////////////////////
public function getSol($codhorario){
  $vector = array();
  $conexion = new Conexion();
  $db = $conexion->getConexion();
  $sql = "SELECT fechahora, estado,observacion FROM thorariopsicosensometrico WHERE codhorario=:codhorario";
  $consulta = $db->prepare($sql);
  $consulta->bindParam(':codhorario', $codhorario);
  $consulta->execute();
  while($fila = $consulta->fetch()) {
     $vector[] = array(
      
       "fechahora" => $fila['fechahora'],
       "estado" =>  $fila['estado'],
"observacion" => $fila['observacion']
     ); }

  return $vector[0];
}


public function getSols(){
     $vector = array();
     $conexion = new Conexion();
     $db = $conexion->getConexion();
     $sql = "SELECT * FROM thorariopsicosensometrico";
     $consulta = $db->prepare($sql);
     $consulta->execute();
     while($fila = $consulta->fetch()) {
        $vector[] = array(
          "codhorario" => $fila['codhorario'],
          "fechahora" => $fila['fechahora'],
          "estado" =>  $fila['estado'],
"observacion" => $fila['observacion']

        ); }

     return $vector;
}

public function updateSol($codhorario, $estado){
  
  $conexion = new Conexion();
  $db = $conexion->getConexion();
  $sql = "UPDATE thorariopsicosensometrico SET estado=:estado WHERE codhorario=:codhorario";
  $consulta = $db->prepare($sql);
  $consulta->bindParam(':codhorario', $codhorario);  
  $consulta->bindParam(':estado', $estado);
  $consulta->execute();

  return '{"msg":"solicitud actualizada"}';
}

}
?>