<?php 
require_once('cors.php');
$CN=pg_connect("host=localhost port=5432 password=12345678 user=postgres dbname=CEFinal");
 
//$DB=mysqli_select_db($CN,"condu");
$EncodedData=file_get_contents('php://input');
$DecodedData=json_decode($EncodedData,true);

$chosenDate=$DecodedData['chosenDate'];
//$contrasenia=$DecodedData['contrasenia'];

//echo $usuario;
//echo $contrasenia;

//$IQ="SELECT * FROM tusuario where correo='$usuario' and password='$contrasenia' ";
$IQ="INSERT INTO thorariopsicosensometrico (fechahora,estado) VALUES ($chosenDate,'NO AUTORIZADO') ";
$R=pg_query($CN,$IQ);
if(pg_num_rows($R)==0)
{

//echo json_encode('no');
$Message="hola ";

}
else{
	

    //echo json_encode("ok");	
    $Message="hola";

}
$Response[]=array($Message);
   echo json_encode($Response);
?>