import React from 'react';
import styles from '../../styles/Home.module.css';
import bgImage from '../../assets/images/coaster-hero-pexels.webp';

const Home = () => {
    return (
        <>
            <div className={styles.heroSection} style={{backgroundImage: `url(${bgImage})`}}>
                <div className={styles.heroContent}>
                    <h1>Welcome to ThrillSeeker</h1>
                    <h2>The Ultimate Guide to Adventure</h2>
                </div>
            </div>
        </>
    );
};
export default Home;