import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAction, useFetch } from '../../hooks';
import { AppState } from '../../store/reducers';
import { LocationState } from '../../store/types';

const Home: React.FC = (): JSX.Element => {
  const { session, locations } = useSelector((state: AppState) => state);
  const { updateSession } = useAction();
  const [{ status, result: { data } }, postReload] = useFetch('/api/reload/location');

  useEffect(() => {
    if (status === 'success') {
      updateSession({ ...session, locationId: data.locationId })
    }
  }, [status]);

  const handleClick = (locationId: number) => {
    if (session.locationId !== locationId) {
      postReload({
        body: {
          locationId
        }
      });
    }
  };

  return <div>
    {
      locations && locations.list.map((id: any, i: any) => {
        return <div id={id} key={i} onClick={() => handleClick(id)}>{locations.ids[id].name}</div>
      })
    }
  </div>;
};

export default Home;