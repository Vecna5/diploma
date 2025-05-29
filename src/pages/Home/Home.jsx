import React from 'react';
import Header from '../../components/ui/Header/Header';
import DreamerList from '../../components/ui/DreamerList/DreamerList';
import Footer from '../../components/ui/Footer/Footer';
import Content from '../../components/ui/Content/Content';
import About from '../../components/ui/About/About';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <Content />
      <main className="dream-block">
        <About />
        <div className="divider" />
        <DreamerList title="Most popular dreamers" items={[
          { name: 'John Doe', count: 1 },
          { name: 'John Doe', count: 1 },
          { name: 'John Doe', count: 1 },
          { name: 'John Doe', count: 1 },
        ]} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
