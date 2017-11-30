<?php

$name = $_POST['user-name'];
$phone = $_POST['user-phone'];
$email = $_POST['user-email'];
$message = $_POST['user-message'];
echo "$name";

// Параметры для подключения
$db_host = "localhost"; 
$db_user = "root"; // Логин БД
$db_password = ""; // Пароль БД
$db_table = "user-massage"; // Имя Таблицы БД

// Подключение к базе данных
$db = mysql_connect($db_host,$db_user,$db_password) OR DIE("Не могу создать соединение ");

// Выборка базы
mysql_select_db("dec_education");

// Установка кодировки соединения
mysql_query("SET NAMES 'utf8'",$db);

//запрос для записи в базу данных
$result = mysql_query ("INSERT INTO `user-massage`(`name`, `phone`, `email`, `message`) VALUES ('$name','$phone','$email','$message')");

//проверка
if ($result = 'true'){
	echo "Информация занесена в базу данных";
}else{
	echo "Информация не занесена в базу данных";
}


?>