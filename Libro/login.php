<?php 
require_once('cors.php');
$CN=pg_connect("host=localhost port=5432 password=12345678 user=postgres dbname=CEFinal");
 
//$DB=mysqli_select_db($CN,"condu");
$EncodedData=file_get_contents('php://input');
$DecodedData=json_decode($EncodedData,true);

$usuario=$DecodedData['usuario'];
$contrasenia=$DecodedData['contrasenia'];

//echo $usuario;
//echo $contrasenia;

$IQ="SELECT * FROM tusuario where correo='$usuario' and password='$contrasenia' ";
$R=pg_query($CN,$IQ);
if(pg_num_rows($R)==0)
{

//echo json_encode('no');
$Message="no ";

}
else{
	

    //echo json_encode("ok");	
    $Message="ok";

}
$Response[]=array($Message);
   echo json_encode($Response);
?>