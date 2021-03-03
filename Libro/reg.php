<?php 
require_once('cors.php');
$CN=pg_connect("host=localhost port=5432 password=12345678 user=postgres dbname=CEFinal");
 
//$DB=mysqli_select_db($CN,"condu");
$EncodedData=file_get_contents('php://input');
$DecodedData=json_decode($EncodedData,true);

$correo=$DecodedData['correo'];
$cedula=$DecodedData['cedula'];
$usuario=$DecodedData['nombre'];
$apellido=$DecodedData['apellido'];
$telefono=$DecodedData['celular'];
$direccion=$DecodedData['direccion'];
$contrasenia=$DecodedData['contrasenia'];

//echo $usuario;
//echo $contrasenia;
$AN="SELECT  *  FROM  tusuario";
   $RAN=pg_query($CN,$AN);
   
   $ant=echo pg_num_rows($RAN);

//$IQ="SELECT * FROM tusuario where correo='$usuario' and password='$contrasenia' ";
$IQ="INSERT INTO tusuario (correo,cedula,usuario, apellido,celular, direccion, password) VALUES (
'$correo','$cedula','$usuario','$apellido','$telefono','$direccion','$contrasenia' )";
//$IQ="INSERT INTO tusuario (correo,cedula,usuario, apellido,celular, direccion, password) VALUES (
//						'wilmer','123412','dfg','sdfsd','234345','dfgdf','1234' )";
//$R=pg_query($CN,$IQ);
//if(pg_num_rows($R)==0)
//{
$DES="SELECT  *  FROM  tusuario";
   $RDES=pg_query($CN,$DES);
   
   $desp=echo pg_num_rows($RDES);

   if($RDES>$RAN)
   {

echo json_encode('ok');

   }
   else
   	{
echo json_encode('no');
   	}
//echo json_encode('no');
	
?>