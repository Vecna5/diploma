import React from 'react';
import Header from '../../components/ui/Header/Header';
import DreamerList from '../../components/ui/DreamerList/DreamerList';
import Footer from '../../components/ui/Footer/Footer';
import Content from '../../components/ui/Content/Content';
import About from '../../components/ui/About/About';
import AnotherSection from '../../components/ui/AnotherSection/AnotherSection';
import './Home.css';
import './Theme.css'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchTop } from '../../redux/slices/posts';

const Home = () => {
  const dispatch = useDispatch();
  const { items: users, status } = useSelector(state => state.posts);

  React.useEffect(() => {
    dispatch(fetchTop());
  }, [dispatch]);
  
  const isLoading = status === 'loading';

  const usersArray = Array.isArray(users)
    ? users
    : users?.users || users?.dreamers || [];

  return (
    <div className="home-page">
      <Header />
      <Content />
      <main className="dream-block">
        <About />
        <div className="divider" />
        <DreamerList
          title="Most popular dreamers"
          items={
            isLoading
              ? []
              : usersArray.map(user => ({
                  name: user.username,
                  count: user.total_likes 
                }))
          }
        />
        {isLoading && <div>Loading</div>}
      </main>
      <AnotherSection />
      <Footer />
    </div>
  );
};

export default Home;