import React from 'react';
import { Link } from 'react-router-dom';

const PolicyList: React.FC = (props): JSX.Element => {
  console.log('POLICY', props);
  return <div>POLICY <Link to="new">Add</Link></div>;
};

export default PolicyList;