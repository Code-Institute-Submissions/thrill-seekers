import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import bgimage from "../../assets/images/coaster-hero-pexels.webp";



const Home = () => {
    return (
        <div id="CustomJumbotron">
            <Jumbotron style={{ backgroundImage: `url(${bgimage})`, backgroundSize: 'cover' }}> 
                <h1>Welcome to ThrillSeeker</h1>
                <h2>The Ultimate Guide to Adventure</h2>
            </Jumbotron>
        </div>

    );
};

export default Home;