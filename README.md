# BurgerSequelize

Overview

A Node, Express, and MySQL burger app that lets users input the names of burgers they'd like to eat... and then devour them!

Please try out the deployed app in Heroku, found here.

Functionality

Using the Sequelize ORM, the app has 3 basic CRUD functions...

1. READ all entries from the MySQL database and display them to the DOM using Handlebars.

    note that at a SQL join is used to match each devoured burger to its respective customer.
    
2. UPDATE a selected burger by clicking "Devour It", which...

    hits an /burger/eat/:id route in Express to change its "devoured" status in the MySQL database (via Sequelize ORM)
    re-routes the webpage back to the index, where the burger is now in the devoured column

3. CREATE a new burger using the text area, which...

    hits a /burger/create route in Express to insert a new burger into the MySQL database (via Sequelize ORM)
    re-routes the webpage back to /burger, where the burger is now ready to be eaten column

[Demo Here](https://guamcracker-sequelize-burger.herokuapp.com)


