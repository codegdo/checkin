import React, { Children, isValidElement, useEffect, useState } from 'react';

export const Page: React.FC<any> = ({ onFallback, children }) => {

  const [fallback, setFallback] = useState(null);

  useEffect(() => {
    setFallback(() => children);
  }, [children]);


  useEffect(() => {
    if (!(children == fallback)) {
      //onFallback(() => fallback);
      //console.log('PAGE', (children == fallback));
    }
  }, [onFallback]);


  console.log('PAGE', (children == fallback));
  if (children !== fallback) {
    onFallback(() => fallback);
    console.log('PAGE', (children == fallback));
  }


  return <>
    {
      children
    }
  </>;

}

/*
Children.map(children, (child): JSX.Element | null => {
    console.log(child.props);
    return React.cloneElement(child, {
      fallback: children
    })
  })
*/



