import React from 'react';
import { Link } from 'react-router-dom';

const UserList: React.FC = (props): JSX.Element => {
  console.log('USER', props);
  return <div>USER <Link to="new?formId=user_add">Add</Link></div>;
};

export default UserList;