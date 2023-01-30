import React, { FC, useEffect } from 'react';
//import { AppRoute } from './app.route';

import * as styles from './assets/css/theme/theme.scss?inline';

export const App: FC = (): JSX.Element => {

  useEffect(() => {
    //const scss = import('./assets/css/index.scss');

    // void (async () => {
    //   const scss: any = (await import('./assets/css/index.scss'));
    //   console.log(scss);
    // })();

    console.log(styles.default);

    //scss.then(data => console.log(data));

  }, []);

  return <>hello</>;
}