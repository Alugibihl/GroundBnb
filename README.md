# GroundBnb

# Live Link
https://groundbnb.onrender.com

Welcome to GroundBnb, The Airbnb clone all about saving you money with underground deals. Caves and little known hole in the wall, ...err ground.

This is an Airbnb clone designed to allow similar options to the original. It currently feature 2 major crud for rental Spots and Reviews for those spots.

## Home Page

![image](https://github.com/Alugibihl/GroundBnb/assets/111261195/1063d69e-8284-416d-8f8d-13dbd94dc058)


## Single Spot Reviews

![image](https://github.com/Alugibihl/GroundBnb/assets/111261195/a71eefcd-4fe9-407c-9ffb-97a499956b02)


## Search Bar

![image](https://github.com/Alugibihl/GroundBnb/assets/111261195/718525fb-8331-46d9-bdb9-0e239c33c1e2)


## All User Spots

![image](https://github.com/Alugibihl/GroundBnb/assets/111261195/4453ffa2-a7d2-4405-8ffe-ccc9bd385298)


# Navigating The New Fork Dines

Groundbnb is currently in development and does not have is does not include all the functionality the contributors intend to add. The functions that Groundbnb currently has:

1. `LogIn` using any of the included demo user accounts

2. `SignUp` from the signup modal and create your own account

3. Create a `Spot` that you would like to post to Groundbnb for other users to see and leave a `Review` on

4. Navigate to any `Spot` posted to Groundbnb to see that spot's details

5. Edit any `Spot` the logged in user has created 

6. Delete any `Spot` the logged in user created

7. See all `Spots` created by the current user

8. See all `Reviews` created by the current user

9. Create an `Review` for a `Spot` created by another user

10. Delete any `Review` posted by the logged in user


# Built With:

### :hammer_and_wrench: Languages and Tools :

<div align="center">
  <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original-wordmark.svg" title="React" alt="React" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/redux/redux-original.svg" title="Redux" alt="Redux " width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-plain-wordmark.svg"  title="CSS3" alt="CSS" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original.svg" title="HTML5" alt="HTML" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" title="JavaScript" alt="JavaScript" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/sqlite/sqlite-original-wordmark.svg" title="SQLite3"  alt="SQLite3" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original-wordmark.svg" title="NodeJS" alt="NodeJS" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" title="AWS" alt="AWS" width="40" height="40"/>&nbsp;
    <img src="https://github.com/devicons/devicon/blob/master/icons/postgresql/postgresql-original-wordmark.svg" title="postgresql" alt="postgresql" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/sequelize/sequelize-original.svg" title="Sequelize" alt="sequelize" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/express/express-original-wordmark.svg" title="Express" alt="express" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/python/python-original.svg" title="Python" alt="python" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/sqlalchemy/sqlalchemy-original.svg" title="SQLA" alt="sqla" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/git/git-original-wordmark.svg" title="Git" **alt="Git" width="40" height="40"/>
</div>

#Set Up:

While we recommend using the live version hosted on render, (https://groundbnb.onrender.com)

If you really want to get started and using this locally you will want to run

## GitHub:

git clone https://github.com/Alugibihl/AirBnb-Clone.git

cd into the containing folder, and run

## NPM:

npm install to install related dependencies.

cd into the backend file and create a .env file with a port.

PORT=(your port)
  
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

### API Endpoints
| HTTP Verbs | Endpoints | Action | Return Value |
| --- | --- | --- | --- |
| POST | /api/user/signup | To sign up a new user account | { id: #, username: '...', email: '...', password: '...' } as JSON |
| POST | /api/user/login | To login an existing user account | { id: #, username: '...', email: '...', password: '...' } as JSON |
| POST | /api/spots | To create a new spot | { Spots: [ {id: #, ownerId: #, address: "...", city: "...", state: "...",  country: "...", lat: "...", lng: "...", name: "...", description: "...", price: #, createdAt: "...", updatedAt: "...", avgRating: "...", previewImage: "..."}, {}] } as JSON |
| POST | /api/spots/:spotId/images | To create a new spot image | id: #, url: "...", preview: bool} |
| POST | /api/spots/:spotId/reviews | To create a new review for a spot |  { id: #, spotId: #, userId: #, review: "...", stars: #, "createdAt": "...", "updatedAt": "...", User: { id: #, firstName: "...", lastName: "..." } as JSON |
| POST | /api/spots/:spotId/bookings | To create a new booking for a spot |  { id: #, spotId: #, userId: #, startDate: "...", endDate: "...", "createdAt": "...", "updatedAt": "..." } as JSON |
| POST | /api/reviews/:reviewId/images| To create a new image for a review | {"id": #, "url": "..."} as JSON |
| GET | /api/spots/:spotId | To retrieve spots by id | {id: #, ownerId: #, address: "...", city: "...", state: "...",  country: "...", lat: "...", lng: "...", name: "...", description: "...", price: #, createdAt: "...", updatedAt: "...", numReviews: #, Owner: {}, avgStarRating: "...", spotImages:[] } as JSON |
| GET | /api/user/session | Gets the current User |{ id: #, username: '...', email: '...', password: '...' } as JSON |
| GET | /api/spots | To retrieve all spots |  { Spots: [ {id: #, ownerId: #, address: "...", city: "...", state: "...",  country: "...", lat: "...", lng: "...", name: "...", description: "...", price: #, createdAt: "...", updatedAt: "...", avgRating: "...", previewImage: "..."}, {}] } as JSON |
| GET | /api/spots/current | To retrieve all spots of current user |  { Spots: [ {id: #, ownerId: #, address: "...", city: "...", state: "...",  country: "...", lat: "...", lng: "...", name: "...", description: "...", price: #, createdAt: "...", updatedAt: "...", avgRating: "...", previewImage: "..."}, {}] } as JSON |
| GET | /api/reviews/current | To retrieve all reviews of current user | Reviews: [ { id: #, spotId: #, userId: #, review: "...", stars: #, "createdAt": "...", "updatedAt": "...", User: { id: #, firstName: "...", lastName: "..." }, Spot: id: #, ownerId: #, address: "...", city: "...", state: "...", country: "...", lat: "...", lng "...", name: "...", price: #, previewImage: "..."}, ReviewImages: [] }, {}] }, as JSON|
| GET | /api/bookings/current | To retrieve all bookings of current user | Bookings: [ { id: #, spotId: #, userId: #, startDate: "...", endDate: "...", "createdAt": "...", "updatedAt": "...", Spot: id: #, ownerId: #, address: "...", city: "...", state: "...", country: "...", lat: "...", lng "...", name: "...", price: #, previewImage: "..."} }, {}] }, as JSON|
| GET | /api/spots/:spotId/reviews | To retrieve all reviews of a spot | Reviews: [ { id: #, spotId: #, userId: #, review: "...", stars: #, "createdAt": "...", "updatedAt": "...", User: { id: #, firstName: "...", lastName: "..." }, Spot: id: #, ownerId: #, address: "...", city: "...", state: "...", country: "...", lat: "...", lng "...", name: "...", price: #, previewImage: "..."}, ReviewImages: [] }, {}] }, as JSON|
| GET | /api//:spotId/bookings | To retrieve all bookings of a spot |  Bookings: [ { id: #, spotId: #, userId: #, startDate: "...", endDate: "...", "createdAt": "...", "updatedAt": "...", Spot: id: #, ownerId: #, address: "...", city: "...", state: "...", country: "...", lat: "...", lng "...", name: "...", price: #, previewImage: "..."} }, {}] }, as JSON|
| PUT | /api/spots/:spotId | To edit the details of a single spot | {id: #, ownerId: #, address: "...", city: "...", state: "...",  country: "...", lat: "...", lng: "...", name: "...", description: "...", price: #, createdAt: "...", updatedAt: "...", numReviews: #, Owner: {}, avgStarRating: "...", spotImages:[] } as JSON |
| PUT | /api/reviews/:reviewId | To edit the details of a single review |  { id: #, spotId: #, userId: #, review: "...", stars: #, "createdAt": "...", "updatedAt": "...", User: { id: #, firstName: "...", lastName: "..." } as JSON |
| PUT | /api/bookings/:bookingId | To edit the details of a single booking |  { id: #, spotId: #, userId: #, startDate: "...", endDate: "...", "createdAt": "...", "updatedAt": "..." } as JSON |
| DELETE | /api/spots/:spotId  | To delete a single spot | None |
| DELETE | /api/spot-images/:imageId | To delete a single spot image | None |
| DELETE | /api/reviews/:reviewId | To delete a single review | None |
| DELETE | /api/review-images/:imageId | To delete a single review's image | None |
  
## Contact

I want to grow along with this project, if you have any suggestions, or want to contribute..

Reach out to me at:

alexandermlugibihl@gmail.com
  
GitHub: https://github.com/Alugibihl

LinkedIn: https://www.linkedin.com/in/alexander-lugibihl-2abb70169

## Aknowledgements:

These are some of the great resources that made this possible.

-Font Awesome
  
-Helmet
  
-BCrypt
  
-Morgan
