# school-course-app
This program couples a server-side REST API together with a client-side React frontend as its counterpart. Together they let a user perform basic CRUD-operations on a kind of "school"-database which contains several courses on different topics. A (short) documentation for the API-part can be found at https://github.com/Develooper-Dan/rest-api. Here I will focus on the React frontend. The general layout and style of this app were provided by Team Treehouse.

### Getting started
In the project directory, both of the following commands must be run in each of the api- and in the client-folder:

#### `npm install`

This will download all the projects dependencies listed in the respective package.json files and install them locally. If you're unfamiliar with npm, you might want to visit
https://docs.npmjs.com/about-npm/
for further reference.

#### `npm start`

Runs the api-part of the app on the server http://localhost:5000 via `nodemon ./app.js`. The client-part runs on http://localhost:3000 via `react-scripts start`.

### Main mechanics and functionality

#### General routes
Initially, the user will see the main Courses route where all courses contained in the school database are displayed. Without signing in, he then has access to the following routes and actions:

- **Course detail**
Clicking on a course brings up detailed information about the respective course. If the user is authenticated (see "Sign in") and also the registered owner of this course he will also have the possibility to update or delete the courses.

- **Sign in**
If the user is already registered he can use his credentials to log in and gain access to additional functions. If not, he can follow the link and sign up. After successfully signing in, the user will be redirected to the page he visited before.

- **Sign up**
Creates a new user with the form input. If the validation is successful, the user will also be signed in and redirected to the page he visited before

#### Private routes
These routes can only be visited if the user is logged in. If he tries to access these sites anyway he will be redirected to the sign in-screen.

- **Create new course**
The "+new course" button will lead the user to a route with a blank form. If the submission is successful the user will be redirected to the main page where the new course should be displayed. This course will be associated with the user and can only be manipulated by him.

- **Update course**
Shows detailed info on the selected course and lets the user change any course data. If the user who tries to access (e. g. via typing the URL) this route is not the registered owner of this course he will be redirected to a "forbidden" route and not be able to change any data.

#### Context
This app uses the Context API to persist the users data and log in status. Most of the relevant methods used for handling the API requests are also handed down to the specific components by a Provider and thus can be found here.

#### Cookies
The authenticated user is stored in a session cookie which also gets removed if the user signs out.

### Credits
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
It also uses the React Router library(https://reacttraining.com/react-router/) for setting up the different routes, axios (https://github.com/axios/axios) for handling the fetch requests and js-cookie (https://github.com/js-cookie/js-cookie) to easily manage cookies.
