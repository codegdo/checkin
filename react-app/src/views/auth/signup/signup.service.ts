import { useFetch } from "../../../hooks";

interface ReturnSignupData {
  id: string;
  emailAddress: string;
}

interface PostSignupData {
  data: {
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    username: string;
    password: string;
    groupId: number;
  }

}

export const postSignupService = () => {
  const [state, postSignup] = useFetch<PostSignupData>('/api/auth/signup');

  return {
    status: state.status,
    data: state.response?.data as ReturnSignupData,
    postSignup
  }
}