import React, { useLayoutEffect } from 'react';

const ResendSuccess: React.FC = (): JSX.Element => {

  useLayoutEffect(() => {
    document.body.setAttribute('data-page', 'resend-success');
  }, []);

  return (
    <div>
      <h2>Resend success...</h2>
      <p>Please check your email to confirm your account.</p>
    </div>
  );
};

export default ResendSuccess;
