# AirBnb-Clone

Ground BNB
(https://groundbnb.onrender.com)
Welcome to GroundBnb, The Airbnb clone all about saving you money with underground deals. Caves and little known hole in the wall, ...err ground.

This is an Airbnb clone designed to allow similar options to the original. It currently feature 2 major crud for rental Spots and Reviews for those spots.

![image](https://user-images.githubusercontent.com/111261195/232141810-3d3b3a86-0615-4304-98fa-1aa71bc0a8c9.png)

On this application you can:
-Sign up and sign in a user,
-Create a property,
-Create a review for other users properties.
-Update your property,
-Delete your property or review
-See all existing properties and reviews.

Built With:
Sequelize https://sequelize.org/,
SQL,
JAVASCRIPT,
React https://react.dev/,
Redux https://redux.js.org/,
CSS,
HTML,
Express,
SQLIITE3,
POSTGRES

Set Up:
While we recommend using the live version hosted on render, (https://groundbnb.onrender.com)
If you really want to get started and using this locally you will want to run
GitHub:
git clone https://github.com/Alugibihl/AirBnb-Clone.git

cd into the containing folder, and run
NPM:
npm install to install related dependencies.
cd into the backend file and create a .env file with a port.
PORT=<your port>
DB_FILE=(db file) we recommend db/dev.db
JWT_SECRET=(generate a secret)
JWT_EXPIRES_IN=(assign an expiration)
SCHEMA=(give it a schema).
then run npm install followed by,
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all.
Then run npm start,

CD into your front end folder and run
npm install
and then NPM start.
If you see something similar to the image at the top, you are ready to go.

Contact

I want to grow along with this project, if you have any suggestions, or want to contribute..

Reach out to me at:

alexandermlugibihl@gmail.com

Aknowledgements:

These are some of the great resources that made this possible.

-Font Awesome
-Helmet
-BCrypt
-Morgan
