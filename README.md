# sei-project2 / amarino1979.workoutxpress

# WorkoutXpress

## Overview

Going to the gym, home-workouts, bootcamps and the like all take planning.  I have found that it is a good practice to write things down when I lead bootcamps...but no more!  I created this app to help me when leading F3 bootcamps at Falcon and South Parks.  My hope is that others that lead with me can use this tool as well to help them plan.

## Links
The live site can be visited at:

https://workoutxpress.herokuapp.com/workoutxpress

## Technologies Utilized
- HTML5
- CSS
- Bootstrap
- Javascript
- MongoDB
- Mongoose
- Hosted on Heroku

## Features
- WorkoutXpress is a full CRUD app utilizing all 7 restful routes.
- File structure is broken up into Models, Views, and Controllers.
- It has user authentication by using Bcrypt which includes protected passwords.
- Once signed in the user can log out to end their session.
- You have the ability to create, update, or delete workouts.

## Wireframe - none available at this time
- Flow of the website
    - Enter on homepage
    - Login or sign-up
        - if password and user name aren't taken user can continue/ if not try another
    - Enter past workouts/index page and you have options to choose from create, delete, and update.
    - When finished log out.

## Future Development and Issues to Fix
- Tried to use framer.com for wire frames this time but it was too time consuming to learn and play around with under the circumstances...
- Further Styling to finish out the site.
- Need to develop out the homepage and about section in the footer to be formatted correctly.
- Create a second model just for users as for now each new workout will show up in everyone's account!
- Add some drop downs to spice things up in the update/new pages.
- Use google maps to show popular workout locations near the user.
- Modify the user schema to support this and more functionality.
