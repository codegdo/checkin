import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useAction, useFetch } from '../../hooks';
import { AppState } from '../../store/reducers';

const Home: React.FC = (): JSX.Element => {
  const { locations } = useSelector((state: AppState) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (locations.length == 0) {
      navigate('/welcome');
    }
  }, []);

  return <div>Welcome</div>;
};

export default Home;

/*

const Home: React.FC = (): JSX.Element => {
  const { session, locations } = useSelector((state: AppState) => state);
  const { updateSession } = useAction();
  const navigate = useNavigate();
  const [{ status, response: { data } }, postReload] = useFetch('/api/reload/location');

  useEffect(() => {
    if (status === 'success') {
      updateSession({ ...session, locationId: data.locationId });
      navigate('/welcome');
    }
  }, [status]);

  useEffect(() => {
    if (locations.length == 1) {
      navigate('/welcome');
    }
  }, []);

  const handleClick = (locationId: number) => {
    if (session.locationId !== locationId) {
      postReload({
        body: {
          locationId
        }
      });
    } else {
      navigate('/welcome');
    }
  };

  return <div>
    {
      locations.map((location: any, i: any) => {
        const { id, name } = location;
        return <div id={id} key={i} onClick={() => handleClick(id)}>{name}</div>
      })
    }
  </div>;
};
*/