import React, { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';

type SignupSuccessProps = {
  data: {
    username: string;
  }
}

const SignupSuccess: React.FC<SignupSuccessProps> = ({ data }): JSX.Element => {
  const { username } = data;

  useLayoutEffect(() => {
    document.body.setAttribute('data-page', 'signup-success');
  }, []);

  return (
    <div>
      <h2>Almost there...</h2>
      <p>Please check your email to confirm your account</p>
      <span>No confirmation email received? Please check your spam folder <small>or</small>
        <Link to={`/auth/resend?username=${username}`}>Request new confirmation</Link>
      </span>
    </div>
  );
};

export default SignupSuccess;
