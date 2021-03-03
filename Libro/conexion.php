<?php
class Conexion {
	
 public function getConexion(){
   $host = "localhost"; //127.0.0.1 0 localhost
$puerto="5432";
   $db = "CEFinal"; //base de datos de mysql
   $user = "postgres"; // usuario de mysql
   $password = "12345678";       //contraseÃ±a de mysql

//conexion a la base datos utilizando pdo
 $db = new PDO("pgsql:port=$puerto;host=$host;dbname=$db; user=$user;password= $password");

 return $db;

}
}//fin de la clase Conexion

?>