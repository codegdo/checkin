import React from 'react';
//import { utils } from '@libs/shared-code';
import { RouterProvider } from 'react-router-dom';
import { router } from './app.router';

function App() {
  return <><RouterProvider router={router} /></>
}

export default App;
