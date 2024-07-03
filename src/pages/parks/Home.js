import React from 'react';
import styles from '../../styles/Home.module.css';
import bgImage from '../../assets/images/coaster-hero-pexels8.webp';

const Home = () => {
    return (
        <>
            <div className={styles.heroSection} style={{backgroundImage: `url(${bgImage})`}}>
                <div className={styles.heroContent}>
                    <h1>Welcome to ThrillSeeker</h1>
                    <h2>The Ultimate Guide to Adventure</h2>
                </div>
            </div>
            <div className="Main">
                {/* Rest of your content goes here */}
            </div>
        </>
    );
};
export default Home;