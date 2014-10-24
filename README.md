Open Cloud School
=================

Vismay Studios
----------------

_________________________________________________________________________________________________

[![Build Status](https://magnum.travis-ci.com/kanwarujjaval/ocs.svg?token=hakLiwqu3NEgygsmisxf&branch=master)](https://magnum.travis-ci.com/kanwarujjaval/ocs)

##Version info

Current Version in Production - `NA`

Current Version in Development - `0.0.1-dev`

MongoDB version - `2.4 / 2.6`

Dependencies
------------

ExpressJS Version - `4.x`

Socket.io Version - `1.x`

Mongoose Version - `3.8.x`

AngularJS Version - `1.2.x`

_________________________________________________________________________________________________

##Project Structure


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