import React from 'react';
import Header from '../../components/ui/Header/Header';
import DreamerList from '../../components/ui/DreamerList/DreamerList';
import Footer from '../../components/ui/Footer/Footer';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <main>
        <section className="about-section">
          <h2>About dream diary</h2>
          <p>
            Dream Diary is an online platform designed to facilitate the systematic recording and analysis of dreams. 
            Users can document dream content immediately upon waking, helping to preserve episodic memory and minimize recall decay.
          </p>
        </section>

        <DreamerList title="Most popular dreamers" items={['John Doe', 'John Doe', 'John Doe', 'John Doe']} />
        <DreamerList title="Another" items={['Now online', '34', 'Random dream', 'Title 1']} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;