import React from 'react';
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="container">
    <section>
        <h2>Welcome to ThrillSeeker</h2>
        <p>ThrillSeeker is your ultimate guide to the most exciting and memorable amusement parks around the world! Our mission is to provide comprehensive, honest, and insightful reviews to help you plan your next adventure with confidence.</p>
    </section>
    <section>
        <h2>Who We Are</h2>
        <p>At ThrillSeeker, we are a team of dedicated thrill-seekers and amusement park enthusiasts. With years of experience visiting parks across the globe, we bring you firsthand insights and detailed information about every aspect of the parks we review. Our passion for adventure and our commitment to providing accurate and helpful information make us the go-to source for amusement park reviews.</p>
    </section>
    <section>
        <h2>What We Do</h2>
        <p>Our goal is to explore every corner of amusement parks and deliver detailed reviews covering:</p>
        <ul>
            <li><strong>Rides and Attractions:</strong> From the most exhilarating roller coasters to the most charming kiddie rides.</li>
            <li><strong>Family Friendliness:</strong> We assess the suitability of parks for families, noting the availability of child-friendly attractions, services, and amenities.</li>
            <li><strong>Shows and Entertainment:</strong> We provide information on the various shows and entertainment options available in each park, ensuring you don't miss out on any spectacular performances.</li>
            <li><strong>Dining Options:</strong> From quick snacks to gourmet meals, we review the dining experiences available to help you make the best choices for your visit.</li>
            <li><strong>Park Amenities:</strong> We cover the essential services and facilities, including accessibility, rest areas, and overall park cleanliness.</li>
        </ul>
    </section>
    <section>
        <h2>Our Reviews</h2>
        <p>Our reviews are thorough and unbiased, combining our personal experiences with feedback from the broader park-going community. We rate parks in several key categories, including:</p>
        <ul>
            <li><strong>Thrill Factor:</strong> The excitement and intensity of the rides and attractions.</li>
            <li><strong>Family Appeal:</strong> The availability and quality of family-friendly attractions.</li>
            <li><strong>Value for Money:</strong> The overall cost of visiting the park compared to the experience provided.</li>
            <li><strong>Entertainment Quality:</strong> The variety and quality of shows and entertainment options.</li>
            <li><strong>Park Atmosphere:</strong> The general ambiance, theming, and overall vibe of the park.</li>
        </ul>
        <p>Join us as we explore the world of amusement parks and share the thrill of the ride and register <Link className={Link} to="/signup"> <span>here</span></Link>.</p>
    </section>
</div>
  );
}

export default About;