import { utils } from '@libs/shared-code';
import { RouterProvider } from 'react-router-dom';
import { router } from './app.router';

function App() {

  console.log(utils.strRandom());

  return <><RouterProvider router={router} /></>
}

export default App;
