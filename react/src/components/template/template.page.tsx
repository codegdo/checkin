import React, { useEffect, useState } from 'react';

export const Page: React.FC<any> = ({ onFallback, children }) => {

  const [fallback, setFallback] = useState(null);

  useEffect(() => {
    console.log('PAGE', (children == fallback));
    setFallback(() => children);
  }, [fallback]);


  useEffect(() => {
    onFallback(() => fallback);
  }, [onFallback]);

  return <>{children}</>;

}



