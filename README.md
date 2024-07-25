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


# Content
- [UX - User Experience](#ux---user-experience)
    - [Project goles](#project-goles)
    - [Target audience](#target-audience)
    - [User requirements and expectations](#user-requirements-and-expectations)
    - [Initial epics and user stories](#initial-epics-and-user-stories)


- [Design](#design)
  - [Colour Scheme](#colour-scheme)
  - [Typography](#typography)
  - [Imagery and Icons](#imagery-and-icons)

  

  - [Scope Plane](#scope-plane)
  - [Structural Plane](#structural-plane)
  - [Skeleton \& Surface Planes](#skeleton--surface-planes)
    - [Wireframes](#wireframes)
    - [Database Schema - Entity Relationship Diagram](#database-schema---entity-relationship-diagram)
      - [Database Schema](#database-schema)
      - [Entity Relationship Diagram (ERD)](#entity-relationship-diagram-erd)
      - [Tables Overview](#tables-overview)
      - [Relationships](#relationships)
    - [Security](#security)
  - [All Existing Features with Screenshots](#all-existing-features-with-screenshots)
    - [CRUD Functionality](#crud-functionality)
  - [Future Features](#future-features)



- [Technology Used](#technology-used)
  - [Languages](#languages)
  - [Frameworks](#frameworks)
  - [Database](#database)
  - [Tools](#tools)




  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Deployment and Version Control](#deployment-and-version-control)
  - [Development Tools](#development-tools)
  - [Libraries and Frameworks](#libraries-and-frameworks)
  - [Validation Tools](#validation-tools)
  - [Others](#others)
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




## Testing





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