import React from 'react';
import { Link } from 'react-router-dom';

const RoleList: React.FC = (props): JSX.Element => {
  console.log('ROLE', props);
  return <div>ROLE <Link to="new">Add</Link></div>;
};

export default RoleList;