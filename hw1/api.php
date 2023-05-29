<?php
$query = urlencode($_GET["q"]);
$curl = curl_init();

curl_setopt_array($curl, [
	CURLOPT_URL => "https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/search/".$query,
	CURLOPT_RETURNTRANSFER => true,
	CURLOPT_ENCODING => "",
	CURLOPT_MAXREDIRS => 10,
	CURLOPT_TIMEOUT => 30,
	CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	CURLOPT_CUSTOMREQUEST => "GET",
	CURLOPT_HTTPHEADER => [
		"X-RapidAPI-Host: omgvamp-hearthstone-v1.p.rapidapi.com",
		"X-RapidAPI-Key: dda1f9bccbmsh8c8820554fbf86fp10731ajsn66af763c6bf0"
	],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
	echo "cURL Error #:" . $err;
} else {
	echo $response;
}