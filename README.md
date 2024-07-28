![Logo](/documentationfiles/logo2.webp)
# Thrill Seeker Readme

ThrillSeeker is a website that publishes articles about theme parks. Each park is rated and tips and recommendations are given for which target group the park is best suited.

At ThrillSeeker, a passionate team of adrenaline junkies and theme park lovers use their extensive park hopping experience to provide insight and accurate details about each park reviewed. Their unwavering enthusiasm for thrills and dedication to accuracy make ThrillSeeker the ultimate source for in-depth theme park reviews.
Users can create a bucket list, rate parks themselves and send a message to the operators via the contact form. Thrill Seeker - The Ultimate Guide to Adventure!


All other relevant files can be found here: <br>
[Live website](https://thrill-seekers-af06984a9bdb.herokuapp.com/) <br>
[Repository](https://github.com/SureDeveloping/thrill-seekers) <br>
[APi](https://thrill-seekers-api-5fd87044d4ac.herokuapp.com/) <br>
[API Repository](https://github.com/SureDeveloping/thrill-seeker-drf-api) <br>


## Content
- [UX - User Experience](#ux---user-experience)
    * [Project goles](#project-goles)
    * [Target audience](#target-audience)
    * [User requirements and expectations](#user-requirements-and-expectations)

- [Agile approach](#agile-approach)

- [Design](#design)
  * [Colour Scheme](#colour-scheme)
  * [Typography](#typography)
  * [Imagery and Icons](#imagery-and-icons)


  

  


  * [Wireframes](#wireframes)
 
 
- [All Existing Features with Screenshots](#all-existing-features-with-screenshots)
- [Future Features](#future-features)



- [Technology Used](#technology-used)
  * [Languages](#languages)
  * [Frameworks and Database](#frameworks-and-database)
  * [Libraries and Packages](#libraries-and-packages)
  * [Software and Tools](#software-and-tools)

 

- [Testing](#testing)
- [Deployment](#deployment)
- [Cloning and Forking](#cloning-and-forking)
- [Credits](#credits)



## UX - User Experience

### Project goles
Thrill Seeker: The Ultimate Guide to Adventure
The name is both the program and the motto. Thrill Seeker is all about offering thrill seekers a platform to discover theme parks, make a note of them for future visits, exchange reviews, and find out which park they might like to visit next. The website features intuitive navigation, ensuring users can easily find the information they need with minimal effort. With its responsive design, the site provides an optimal viewing experience across a wide range of devices, from desktop computers to mobile phones. The platform offers engaging content that is crafted to be informative and keep users interested, encouraging them to explore more. Personalization is a key aspect, allowing users to create profiles, put favorite parks an a bucketlist, and write reviews, tailoring their experience to their preferences.

The gole is it to provide a comprehensive platform for thrill seekers to discover, review, and plan visits to theme parks.
- Enhance user engagement through interactive features and personalized content.
- Ensure accessibility by making the platform user-friendly and responsive.
- Foster a community of thrill seekers who can share their experiences and recommendations.

### Target audience
- People looking for exciting experiences in theme parks.
- people who want to share, rate and exchange experiences about their park visits
- people who are planning future trips to theme parks and want to discover new attractions and roller coasters.

### User requirements and expectations
As a first time user of the Thrill Seeker website I want to:
- Understand what the website is about and its purpose
- Register, login and logout
- Browse and read theme parks articels and ratings
- Save theme parks to my bucketlist
- Fill my personal user profile, which was created automatically with the registration, with personal data
- A message to the operator via the contact field

As a frequent user of the Thrill Seeker website, I want to:
- Login and logout easily
- Update my user profile
- Write and edit my ratings of theme parks
- View my favorite parks pages which are on my bucketlist
- Discover new theme parks
- Send another message to the operator via the contact field

As operator of the Thrill Seeker website I want to:
- Provide an easy to navigate and intuitive website
- Ensure responsive design for various devices
- Offer real-time updates on theme park information
- Implement a robust search system
- Maintain user data privacy and security
- Provide the ability to create, read, update, and delete user-generated content
- Continuously improve the platform based on user feedback
- Keep the articles up to date and provide reliable information
- Test more parks and add more reviews to the website


## Agile approach
This application was developed by using an Agile apporoch. At the beginning, a list was created in which epics userstory and task were collected. These were evaluated using the Moscow Method, into three levels of importance: 'Must Have', 'Should Have', 'Cloud have#, and 'Will not have (wish to have)'.The Wish to have user story are elements that can be implemented in future releases. <br>
All others and the user stories for the backend can be found on this [project board](https://github.com/users/SureDeveloping/projects/6/views/1). 

| Epic                  | User Story                                                                                                                                                                      | Acceptance Cretary                                                                                                                                                                                                                                                                                                                 | Tasks                                                                                                                                              | Moscow        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Navigation            | As a user I can view the navbar from every page so that I can navigate easily between pages                                                                                     | AC1: The nagiation bar is clearly readable on every page<br>AC2: The navigation bar is responsive<br>AC3: I can navigate between pages without refreshing the page                                                                                                                                                                 | T1: Create Navabar and Navbar Links<br>T2: Add a responsive bootstrap react template to make it responsive<br>T3: Add routing to the nav bar links | Must Have     |
| Navigation            | As a user, it is displayed whether I am logged in and the navigation bar adapts to my status so that I only see relevant links and can navigate even easier                     | AC1: When I am logged in I see the logout link.<br>AC2: When I am logged in I see my user name  in the navbar.<br>AC3: When I am logged out I see the login and register link                                                                                                                                                      | T1: Hide and show only the corresponding links in each status<br>T2: Paste the user name if the user is logged in                                  | Must Have     |
|                       |                                                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                    |               |
|  Authentication       | As a user I can create an account to log in so that i can use limited functions for logged in users                                                                             | AC1: There is a registration form on the website which I can fill in.<br>AC2: The data will be saved in the database                                                                                                                                                                                                               | T1: Creating a form<br>T2: Linking the form to the navbar<br>T3: Styling the form with bootstrap react<br>T4: Create Conection to the backend      | Must Have     |
|  Authentication       | As a user I can log in so that I can access all features for logged in users                                                                                                    | AC1: There is a login form on the website which I can fill in.<br>AC2: The data will be saved in the database                                                                                                                                                                                                                      | T1: Creating a form<br>T2: Linking the form to the navbar<br>T3: Styling the form with bootstrap react<br>T4: Create Conection to the backend      | Must Have     |
|                       |                                                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                    |               |
| Parks overview        | As a user I can read all Park articles sorted by publication date so that I always get the latest article first                                                                 | AC1: The articles are displayed in order of creation date                                                                                                                                                                                                                                                                          | T1: Add sort function                                                                                                                              | Must have     |
| Parks overview        | As a user, I can search for keywords so that I can find the park that interest me the most.                                                                                     | AC1: A search bar is available on the website<br>AC2: I can enter what I am looking for.                                                                                                                                                                                                                                           | T1: Add search bar<br>T2: Ensuring the function of the search bar                                                                                  | Could have    |
| Parks overview        | As  user, I can see the park that have been rated and have been put in a bucketlist so that I can form a better opinion about a park and decide which one I want to visit next. | AC1: Parks have a rating counter.<br>AC2: Parks have a bucketlist counter to the park.                                                                                                                                                                                                                                             | T1: Add a bucketlist and a rating counter                                                                                                          | Could have    |
| Parks overview        | As a user, I can scroll through the articles on the website, which are automatically loaded, so I don't have to click on buttons and change pages.                              | AC1: I can scroll without clicking and without having to stop                                                                                                                                                                                                                                                                      | T1: Add scroll function                                                                                                                            | Should have   |
|                       |                                                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                    |               |
| Park detail page      | As the supersuer I can create a park article to expand the website content                                                                                                      | AC1:There is a form to fill out an create a new park with all avalable fields                                                                                                                                                                                                                                                      | T1: Create a create park form                                                                                                                      | Must have     |
| Park detail page      | As a user, I can call up a detail view for a park so that I can read all the information about the park.                                                                        | AC1: I can access a detail view of each park via a link<br>AC2: The page has a bootstrap styling                                                                                                                                                                                                                                   | T1: Create detailed view<br>T2: Styling detailed view                                                                                              | Must have     |
| Park detail page      | As the author of the article, I can edit the entry for the park so that it can be corrected and updated.                                                                        | AC1: I can go to an update page and update the information about a park.                                                                                                                                                                                                                                                           | T1: Create update page                                                                                                                             | Must have     |
| Park detail page      | As the author of the article, I can delete the entry for the park if a park is closed and no longer exists                                                                      | AC1: The author can delete his article                                                                                                                                                                                                                                                                                             | T1: Integrate delete function                                                                                                                      | Must have     |
|                       |                                                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                    |               |
| Bucketlist            | As a logged in user I can put a park on my bucket list so that I have a list of parks I still want to visit                                                                     | AC1: I can add a park to my bucket list                                                                                                                                                                                                                                                                                            | A1: Create an overview view with all parks on my bucket list                                                                                       | Must Have     |
| Bucketlist            | As a logged in user I can delete a park from my bucket list so that I can update my list if i change my mind                                                                    | AC1: I can delete a park from my bucket list                                                                                                                                                                                                                                                                                       | A1: Creating the delete function of parks in my bucket list                                                                                        | Must Have     |
|                       |                                                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                    |               |
| Rating a park         | As a logged in user, I can rate a park and give my opinion in a text field so that I can share my opinion and experience with others.                                           | AC1: I can give a rating when I am logged in.<br>AC2: I can write a text in a text field<br>AC3: I can see when the rating was last edited or created.                                                                                                                                                                             | T1: Create a 5 Star rating<br>T2: Hinzüfgen eines Textfeldes für einen Kommentrat                                                                  | Must Have     |
| Rating a park         | As a logged in user, I can update my created rating so that I can change my mind and share my new opionen                                                                       | AC1: I can update my rating                                                                                                                                                                                                                                                                                                        | T1: Add update function                                                                                                                            | Must Have     |
| Rating a park         | As a logged in user, I can delite my created rating so the rating is not visible anymore                                                                                        | AC1: I can delete my rating                                                                                                                                                                                                                                                                                                        | T1: Add delite function                                                                                                                            | Must Have     |
|                       |                                                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                    |               |
| About page            | As a users I can read on the about page what the purpose of the website is so that I am informed whether the site fits my requirements                                          | AC1: About page with a bootstrap styling is accessible to everyone and can be read.                                                                                                                                                                                                                                                | T1: Create an about page with appropriate text and styling                                                                                         | Could have    |
|                       |                                                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                    |               |
| Contact form          | All users can send a message to the admin  (saved in the Database)  via the contract form so that I can give a feeedback and send my wishes for the next park article           | AC1: Contact Form page with a bootstrap styling is accessible to everyone and can be filled out and submitted.<br>AC2: I get feedback when I have submitted the form.                                                                                                                                                              | T1: Creating a contact form with Bootstrap styling.<br>T2: Show feedback message when the form has been sent.                                      | Must have     |
| Contact form          | As a user, I can view the sent data again, update it and delete it before it is saved permanently.                                                                              | AC1. The user is taken to a page where the data he has entered is displayed<br>AC2: The user can update the data from there on another page.<br>AC3: The user can after saving, view the data again.<br>AC4: The usercan delete the data.<br>AC5: The user can leave via confirm data the page and then no longer change the data. | AC1. Creating the comment edit page<br>AC2: Create the comment page where the data can be read<br>AC3: Create the user notifications.              | should have   |
|                       |                                                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                    |               |
| User Profile          | As a user i can go to other user profiles so that I can find more informations about the specific user                                                                          | AC1: I can go to userprofiles via links in ratings and park artikel                                                                                                                                                                                                                                                                | T1: Create a user profile detal page                                                                                                               | Should have   |
| User Profile          | As a user, I can view all ratings and bucketlist items of a particular user when I am on their profile, so that I can read more from that person                                | AC1: All ratings and bucketlist items that belong to the user profile are listed under the profile.<br>AC2: The listed points are styled with bootstrap                                                                                                                                                                            | T1: Add filters and list ratings and articles to the userprofile page                                                                              | Should have   |
| User Profile          | As a logged in user, I can update my user profile so my details are up to date                                                                                                  | AC1: I can update a user profile                                                                                                                                                                                                                                                                                                   | T1: Create user profile update page                                                                                                                | Should have   |
|                       |                                                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                    |               |
| Like a rating         | As a logged in user I can like a park rating so that i can share my sympathy for a rating                                                                                       | AC1: I can like a rating when I am logged in.<br>AC2: I can remove my like again                                                                                                                                                                                                                                                   | T1: Create like button and make it clickable                                                                                                       | will not have |
| Messages user to user | As a User i would like to contact other user by personal message to organises offline meetings and more personaöl exchange                                                      | AC1. As autorised user i can send a messege to a other autorised user                                                                                                                                                                                                                                                              | T1: Create a Messages Form                                                                                                                         | will not have |
| Messages user to user | As a User i would like to reseave messsages from other user to organises offline meetings and more personaöl exchange                                                           | AC1. As autorised user i can resave messeges from other users<br>AC2 I get a notification when a message comes in the mailbox:                                                                                                                                                                                                     | T1: Create a mailbox for incoming message<br>T2: Create a Notoification when i message comes in                                                    | will not have |
| User Profile          | As a user, I would like to have an overview of all the user profiles that exist so that I can network with them better                                                          | AC1 There is an overview page with all existing user profiles                                                                                                                                                                                                                                                                      | T1: Create a profiles overvie page                                                                                                                 | will not have |
| User Profile          | As a autorised user I can search and filter these profiles to find people who have the same interests as me                                                                     | AC1 I can filter through all user profiles<br>AC1 I can search through all user profiles                                                                                                                                                                                                                                           | T1: Create a filter function for user profiles<br>T2: Create a search function for user profiles                                                   | will not have |



## Design
### Colour Scheme
I used the website [coolors](https://coolors.co/)  to find colors that go good together. These should always make a warm, friendly impression and invite users to spend time on the website.

![Color palette](documentationfiles/coolors.png "Color palette")

Finally, I checked the contrast again with [Contrast-grid](contrast-grid.eightshapes.com/). 

![Contrast grid color palette](documentationfiles/contrast-grid.png "Contrast grid color palette")


### Typography
Two different fonts from [googlefonts](https://fonts.google.com/) were selected for the Thrill Seeker project.
For all headlines I chose the font family “Raleway”, a sans-serif font. I linked the name directly to railway tracks and therefore to tracks and speed, like on rollercoasters. At the same time, I really liked the font. 
I then looked for a suitable font for the rest of the text and the body on the website. I came across this [article](https://maxibestof.one/typefaces/raleway/pairing/roboto/) which combines the "Roboto" sans-serif font family with Raleway. This combination appealed to me and I like "Roboto". That's why I chose Roboto as the second font for the project.

### Imagery and Icons
I have used various image sources for this project. 
I created the logo with the website [Logo](https://logo.com/). I used a variant of this for the profile_defauld image and the favicon. All other profile images for example accounts as well as the no_results image for an unsuccessful search are from the website [Freepiks](https://de.freepik.com/). The pictures on the About, Sign in and Sign up page are from the website [Pexels](https://www.pexels.com/de-de/). The images for the park articles are from the respective [Wikipedia](https://www.wikipedia.org/) pages of the free parks.
All icons on the website were used by [Fontawesome](https://https://fontawesome.com/icons/).






## Technologies Used
### Languages
Frondend: <br>
- HTML
- CSS
- Python
- JSX (JavaScript XML)

Backend: <br>
- Python
- Markdown

### Frameworks and Database
Frondend: <br>
- React: JavaScript library for creating the Fontend user interfaces. 
- React-bootstrap: Front-end framework, rebuilt for React with a collection of HTML, CSS, and JavaScript components.

Backend: <br>
- Django rest framework
- The PostgreSQL database from Code Institute was used as the database


### Libraries and Packages
Backend: <br>
- asgiref==3.3.4 - ASGI (Asynchronous Server Gateway Interface) specification, used by Django for asynchronous support
- certifi==2024.6.2 - A collection of root certificates for SSL/TLS verification
- cffi==1.16.0 - C Foreign Function Interface for Python.
- charset-normalizer==3.3.2 - Library for character encoding detection
- cloudinary==1.33.0 - Python SDK for Cloudinary, a cloud service for image and video management
- cryptography==3.4.8 - Library for various cryptographic operations
- defusedxml==0.7.1 - XML bomb protection for Python stdlib modules
- dj-database-url==0.5.0 - Utility to configure Django database using URLs
- dj-rest-auth==2.1.9 - Authentication views for Django REST Framework
- Django==3.2.4 - The core Django web framework
- django-allauth==0.44.0 - Integrated set of Django applications addressing authentication, registration, account management
- django-cloudinary-storage==0.3.0 - Django package that provides Cloudinary storages for both media and static files
- django-cors-headers==3.7.0 - Django application for handling the server headers required for Cross-Origin Resource Sharing (CORS)
- django-filter==2.4.0 - Django application for allowing users to filter querysets dynamically
- djangorestframework==3.12.4 - Powerful and flexible toolkit for building Web APIs in Django
- djangorestframework-simplejwt==4.7.2 - JSON Web Token authentication plugin for Django REST Framework
- gunicorn==20.1.0 - Python WSGI HTTP Server for UNIX, often used to deploy Django applications
- idna==3.7 - Internationalized Domain Names in Applications (IDNA) support
- oauthlib==3.1.1 - Generic, spec-compliant implementation of OAuth for Python
- Pillow==8.2.0 - Python Imaging Library (Fork), for opening, manipulating, and saving many different image file formats
- psycopg2==2.9.1 - PostgreSQL adapter for Python
- pycparser==2.22 - C parser in Python, required by some Python packages that interface with C code
- PyJWT==2.1.0 - JSON Web Token implementation in Pytho
- python3-openid==3.2.0 - OpenID support for modern servers and consumers
- pytz==2021.1 - World timezone definitions for Python
- requests==2.32.3 - HTTP library for Python
- requests-oauthlib==1.3.0 - OAuthlib authentication support for Requests
- six==1.16.0 - Python 2 and 3 compatibility library
- sqlparse==0.4.1 - Non-validating SQL parser for Python

Frontend: <br>
- axios@0.21.4 - Promise-based HTTP client for making API requests.
- bootstrap@4.6.0 - CSS framework for responsive web design.
- jwt-decode@3.1.2 - Decodes JSON Web Tokens
- msw@0.35.0 - Core React library.
- react-bootstrap@1.6.3 - React components for Bootstrap.
- react-dom@17.0.2 - React package for working with the DOM.
- react-infinite-scroll-component@6.1.0 - react-infinite-scroll-component: Component for implementing infinite scroll functionality.
- react-router-dom@5.3.0 - Routing library for React applications.
- react-scripts@4.0.3 - Scripts and configuration used by Create React App.
- react-star-ratings@2.3.0 - Component for displaying star ratings.
- react@17.0.2 - Library for measuring web vitals metrics.
- web-vitals@1.1.2 - Mock Service Worker for API mocking in tests.


### Software and Tools
- Balsamiq - To create a wireframe.
- Draw-io - To create an ERD.
- Gitpod - IDE to code the project
- Git - For version control.
- Github - To store the website.
- Gitpod - As an integrated development environment to write the code.
- Heroku - To deploy the website.
- Google Fonts - All fonts used are from google fonts.
- Google Dev Tools, and Lighthouse - For troubleshooting testing and fixing bugs.
- Deepl - For translating text.
- Birme - To change the image to webp format and reducing the size of the images.
- Tabletomarkdown.com - Used to Create table for markdown out of excel cheats.
- ChatGPT - To generate the articles, review and texts and about page.
- Microsoft Excel - To pre create tables for the readme.
- Pep8 CI Python Linter - To Linter the python
- W3C HTML Validator - To validate the HTML code.
- W3C CSS Validator - To validate the CSS code.
- JS Hint - To detects errors and potential problems in JavaScript code.
- Cloudinary - Media management platform to save and provide images.
- Font Awesome - To provide icons for the project.

## Testing
The tests for the Thrill Seeker react frontend are listed in a separate file. This file can be found here. [TESTING.md](./TESTING.md)




## Project Planning
Strategy Plane
Agile Methodologies - Project Management:
Story Points Allocation
Sprint Planning Example
MoSCoW Prioritization:
User Stories, Milestones and Epics
Users Stories
Milestones
Epics
Scope Plane
Structural Plane
Skeleton & Surface Planes
Wireframes
Database Schema - Entity Relationship Diagram
Database Schema
Entity Relationship Diagram (ERD)
Tables Overview
Relationships
Security
All Existing Features with Screenshots
CRUD Functionality
Future Features
Technology Used
Frontend
Backend
Deployment and Version Control
Development Tools
Libraries and Frameworks
Validation Tools
Others
Testing
Deployment
Cloning and Forking
Credits