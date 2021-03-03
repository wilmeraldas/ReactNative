<?php 
require_once('conexion.php');

 $conexion = new Conexion();
  $db = $conexion->getConexion();
  	$json = file_get_contents('php://input'); 	
	$obj = json_decode($json,true);

//$EncodedData=file_get_contents('php://input');
//$DecodedData=json_decode($EncodedData,true);


	$email = $obj['email'];
	
	$password = $obj['password'];
	
	if($obj['email']!=""){	
  $sql= "SELECT * FROM tusuario where correo='$email' and password='$password'";
 
  //$sql = "INSERT INTO tusuario (correo, password) VALUES (:correo,:password)";
  $result=pg_query($db,$sql);
 // $consulta->bindParam(':correo', $nombre);
  //$consulta->bindParam(':password', $edicion);


		if(pg_num_rows($result)==0){
			echo json_encode('Wrong Details');				
		}
		else{		
		echo json_encode('ok');				
		}
	}	
	else{
	  echo json_encode('try again');
	}

?>


