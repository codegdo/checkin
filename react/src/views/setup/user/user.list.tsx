import React from 'react';
import { Link } from 'react-router-dom';

const UserList: React.FC<any> = ({ route, page }): JSX.Element => {

  return <div>USER <Link to={`new?formId=${route}_${page}`}>Add</Link></div>;
};

export default UserList;