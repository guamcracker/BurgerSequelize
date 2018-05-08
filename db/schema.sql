CREATE DATABASE burgers_db

use burgers_db; 

CREATE TABLE burgers (
 id int NOT NULL AUTO_INCREMENT,
 burger_name varchar(225) NOT NULL,
 devoured boolean,
 PRIMARY KEY (id)
 );
  