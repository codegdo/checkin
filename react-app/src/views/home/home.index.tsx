import React from 'react';

function Index() {

  const handleToggle = () => {
    const body = document.body || document.getElementsByTagName('body')[0];
    body.toggleAttribute('data-scheme-dark');
  }

  return <div>
    HOME <br />
    <button type="button" className="button" onClick={handleToggle}>Toggle</button>
  </div>;
};

export default Index;