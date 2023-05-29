create database provola;
use provola;

create table provoletta(
	id integer primary key auto_increment,
    nome varchar(32),
    cognome varchar(32),
    username varchar(32),
    email varchar(255),
    password varchar(255)
);

create table collection(
    utente varchar(32),
    idcarta varchar(32),
    nomecarta varchar(255),
    img varchar(255),
    primary key(utente, idcarta)
);