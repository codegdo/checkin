import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = (): JSX.Element => {
  return <div>HOME <Link to="/auth/checkin">Checkin</Link> <Link to="/auth/checkout">Checkout</Link></div>;
};

export default Home;