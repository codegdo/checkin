import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = (): JSX.Element => {
  return <div>HOME <Link to="/checkin">Checkin</Link> <Link to="/checkout">Checkout</Link></div>;
};

export default Home;