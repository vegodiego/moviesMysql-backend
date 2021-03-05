CREATE DATABASE movies;

USE movies;

CREATE TABLE User(
	id INT(6) NOT NULL AUTO_INCREMENT,
	email VARCHAR(100) NOT NULL UNIQUE,  
	password VARCHAR(1000) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE Movie(
	id INT(6) NOT NULL AUTO_INCREMENT,
	title VARCHAR(1000),
	poster_path VARCHAR(1000),
	release_date VARCHAR(1000),
	vote_average INT(255),
	userId VARCHAR(1000),
	PRIMARY KEY (id)
);

SHOW TABLES;

DESCRIBE User;

DESCRIBE Movie;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Ensiferum93+'; 