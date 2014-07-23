Open Cloud School {{yellow}}
=================

`{{Team.name}}`
----------------

* School and course management along with student and classes management and examinations.
* Online open to all course sharing application

_________________________________________________________________________________________________

#Version info

Current Version in Production - `NA`

Current Version in Development - `0.0.0-dev`

MongoDB version - `2.4 / 2.6`

Dependencies
------------

ExpressJS Version - `4.x`

Socket.io Version - `1.x`

Mongoose Version - `3.8.x`

AngularJS Version - `1.2.x`

_________________________________________________________________________________________________


#Setting up

* To run the application install NodeJs `http://nodejs.org`

* Install MongoDB and run the Mongo Daemon

* Setup Environment Variable `NODE_ENV` with value `development`
(For Windows - MyComputer > Properties > Advanced System Settings > Environemnt Variables In system Variables Create a new Variable named as `NODE_ENV` with value `development`)

* Install npm Dependencies by running the command `npm install` in the project directory.

* Run command `node server.js` to start the server.

`Access the server at localhost on port 8080`
----------------------------------------------
_________________________________________________________________________________________________

#Project Structure


* `/views/`
    - contains the frontend HTML as partials to be included in the angular single page application


* `/public/` {all subdirectories are accessible by applications as hostname/directory and not as hostname/public/directory}
    - `assets` - contains images and other media
    - `lib` - contains javascript and css libraries
    - `style` - contains the custom css style file
    - `yellow` - contains the angularjs app
        - `controllers` - contains the controllers for the angularjs app. All the script files in the folder will be combined as a single file and subfolders will be compiled as separate javascript files.
        - `directives` - contains directives (follow same structure as controllers)
        - `services` - contains services (follow same structure as controllers)


* `core/`
    - `api` - contains the api functions
    - `auth` - contains the authorization functions
    - `config` - contains the framework configuration files
    - `models` - contains the database models
    - `routes` - contains the api routes
    - `services` - contains the api services

_________________________________________________________________________________________________

#API

Status codes
    0 - Not setup
    1 - Setup
    2 - Incomplete Working
    3 - All features working
    4 - Completed
    5 - Stable

Basic API
----------

* `/invite`  -  Create new Invite Token
    - Type - POST
    - Data 
        - email as request body
    - Status - 3


* `/login`  -  Create a session
    - Type - POST
    - Data 
        - email as request body
        - password as request body
    - Status - 3


* `/signup/:invitation_token`  -  Get a signup page
    - Type - GET
    - Status - 2
    - Cannot be styled as a form is returned


* `/signup`  -  Create a new user
    - Type - POST
    - Data 
        - email as request body which should be same as invitation email
        - password as request body
        - username as request body
    - Status - 3


* `/logout`  -  Destroy session
    - Type - GET
    - Status - 3
    - Redirects  to `/`


Course API
----------

* `/api/course`  -  Create new Course
    - Type - POST
    - Data - na
    - Status - 1


* `/api/course/all`  -  Get all courses
    - Type - GET
    - Status - 2

_________________________________________________________________________________________________