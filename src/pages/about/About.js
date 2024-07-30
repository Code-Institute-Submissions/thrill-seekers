import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '../../styles/About.module.css';
import bgImage from '../../assets/images/coaster-hero-pexels.webp';

const About = () => {
    return (
        <div className={styles.aboutPage}>
            <div className={styles.heroSection} style={{ backgroundImage: `url(${bgImage})` }}>
                <Container className={styles.heroContentContainer}>
                    <Row className="justify-content-start">
                        <Col xs={12} md={8}>
                            <div className={styles.heroContent}>
                                <h1>About ThrillSeeker</h1>
                                <h2>The Ultimate Guide to Adventure</h2>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container fluid className={styles.infoContainer}>
                <Row className="justify-content-center">
                    <Col xs={12} md={11} lg={10}>
                        <h3>Who We Are</h3>
                        <p>
                            At ThrillSeeker, we're a passionate team of adrenaline junkies and theme park aficionados. 
                            Our extensive global park-hopping experience allows us to provide unparalleled insights 
                            and meticulous details about every park we review. Our unwavering enthusiasm for thrills 
                            and dedication to precision make us your ultimate resource for in-depth theme park evaluations.
                        </p>
                        <h3>What We Do</h3>
                        <p>
                            We embark on comprehensive explorations of theme parks, 
                            leaving no stone unturned in our quest to deliver enlightening assessments.
                        </p>
                        <p>
                            Our evaluations cover:
                        </p>
                        <ul>
                            <li><strong>Value Analysis:</strong> 
                            We assess the bang for your buck and pinpoint which visitor types each park caters to best.</li>
                            <li><strong>Key Metrics:</strong>
                                <ul>
                                    <li>Ride inventory</li>
                                    <li>Roller coaster count</li>
                                    <li>Excitement quotient</li>
                                    <li>Holistic park score</li>
                                </ul>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default About;
