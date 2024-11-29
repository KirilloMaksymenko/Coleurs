<?php


header('Content-Type: text/html; charset=utf-8');
//echo "Résultats";

// $handle = fopen("color.txt", "r+");
// if ($handle) {
//     //echo "OK";
// } else {
//     //echo "NOK";
// }
// //echo "<br>";

$type_input = $_GET["type_input"];
$color_catalog = $_GET["color_catalog"];
$red = $_GET["color_red"];
$green = $_GET["color_green"];
$blue = $_GET["color_blue"];
$quantite = $_GET["quantite"];
$nom = $_GET["nom"];
$prenom = $_GET["prenom"];
$address = $_GET["address"];


$cyan=0;
$magenta=0;
$yellow=0;
$black=0;
$blanc=0;

$Rr=$red/255;
$Gg=$green/255;
$Bb=$blue/255;


$black = 1-max($Rr,$Gg,$Bb);
$cyan = (1-$Rr-$black)/(1-$black);
$yellow = (1-$Bb-$black)/(1-$black);
$magenta = (1-$Gg-$black)/(1-$black);
$blanc = (100-$cyan)+(100-$magenta)+(100-$yellow)+(100-$black);


$pc = round($cyan/4*100,2);
$pm = round($magenta/4*100,2);
$py = round($yellow/4*100,2);
$pn = round($black/4*100,2);
$pb = round((100-($blanc/4))*100,2);


$data = array($pc,$pm,$py,$pn,$pb,$nom,$prenom,$address,$quantite);


$servername = "10.187.52.4";
$username = "maksymenkok";  // Default MySQL username
$password = "maksymenkok";      // Default MySQL password
$dbname = "maksymenkok_b";


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die(json_encode('{"error":"ERROR CONNECTION"}'));
}

$sql = "SELECT `id_client` FROM `client` WHERE nom ='$nom' and prenom='$prenom' and adresse='$address'";
 

$resultat=$conn->query($sql); // requête sur le stock
if($resultat==TRUE){
        $ligne = $resultat->fetch_assoc(); 
        $id_client = $ligne['id_client'];
        if($id_client!=""){
                $get = "SELECT * FROM `stock` WHERE id_stock= 1";
                $resultat=$conn->query($get);
                if($resultat==TRUE){
                        $ligne = $resultat->fetch_assoc();
                        $sql = "UPDATE stock SET quantite_noir=".($ligne["quantite_noir"]-($black*$pb)).", quantite_blanc=".($ligne["quantite_blanc"]-($blanc)).",quantite_cyan=".($ligne["quantite_cyan"]-($cyan*$pc)).", quantite_magenta=".($ligne["quantite_magenta"]-($magenta*$pm)).",quantite_yellow=".($ligne["quantite_yellow"]-($yellow*$py))."";
                        $resultat = $conn->query($sql);
                        if($resultat == TRUE) {
                                $sql = "INSERT INTO commande (`id_client`, `id_stock`, `nb_blanc`, `nb_noir`, `nb_cyan`, `nb_magenta`, `nb_yellow`, `prep`)
                                        VALUES ($id_client,1,".$blanc*$pb.",". $black*$pn.",". $cyan*$pc.", ".$magenta*$pm.", ".$yellow*$py.",0)";
                                $resultat=$conn->query($sql); 
                                if($resultat==FALSE) die(json_encode('{"error":"ERROR COMMANDE"}'));
                        }else die(json_encode('{"error":"ERROR UPDATA"}')); 
                }
                
        }else {
                $sql = "INSERT INTO client (nom, prenom, adresse) 
                VALUES ('$nom', '$prenom', '$address')";
                $resultat=$conn->query($sql); 
                $sql = "SELECT `id_client` FROM `client` WHERE nom ='$nom' and prenom='$prenom'";
                $resultat=$conn->query($sql); 
                if($resultat==TRUE){
                        $ligne = $resultat->fetch_assoc(); 
                        $id_client = $ligne['id_client']; 
                        $get = "SELECT * FROM `stock` WHERE id_stock= 1";
                        $resultat=$conn->query($get);
                        if($resultat==TRUE){
                                $ligne = $resultat->fetch_assoc(); 
                                $sql = "UPDATE stock SET quantite_noir=".($ligne["quantite_noir"]-($black*$pb)).", quantite_blanc=".($ligne["quantite_blanc"]-($blanc)).",quantite_cyan=".($ligne["quantite_cyan"]-($cyan*$pc)).", quantite_magenta=".($ligne["quantite_magenta"]-($magenta*$pm)).",quantite_yellow=".($ligne["quantite_yellow"]-($yellow*$py))."";
                                $resultat = $conn->query($sql);
                                if($resultat == TRUE) {
                                        $sql = "INSERT INTO commande (`id_client`, `id_stock`, `nb_blanc`, `nb_noir`, `nb_cyan`, `nb_magenta`, `nb_yellow`, `prep`)
                                                VALUES ($id_client,1,".$blanc*$pb.",". $black*$pn.",". $cyan*$pc.", ".$magenta*$pm.", ".$yellow*$py.",0)";
                                        $resultat=$conn->query($sql); 
                                        if($resultat==FALSE) die(json_encode('{"error":"ERROR COMMANDE "} '));
                                }else die(json_encode('{"error":"ERROR QUANTITE"}')); 
                        }
                }
        }      
} 



echo json_encode($data);

?>