import React from 'react';
import { Link } from 'react-router-dom';

const GroupList: React.FC = (props): JSX.Element => {
  console.log('GROUP', props);
  return <div>GROUP <Link to="new">Add</Link></div>;
};

export default GroupList;