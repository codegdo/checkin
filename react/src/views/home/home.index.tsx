import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = (): JSX.Element => {
  return <div>HOME <Link to="/checkin/client">Checkin</Link> <Link to="/checkin/employee">Checkout</Link></div>;
};

export default Home;