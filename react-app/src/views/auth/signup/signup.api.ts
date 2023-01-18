import { useFetch } from "../../../hooks";

interface PostSignupData {
  id: string;
  emailAddress: string;
}
export const apiPostSignup = () => {
  const [state, callback] = useFetch('/api/auth/signup');

  return {
    status: state.status,
    data: state.response?.data as PostSignupData,
    postSignup: callback
  }
}