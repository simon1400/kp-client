import {useMutation} from "@apollo/client";
import {registerQuery} from '../../queries/auth'

const useRegister = () => {
  const [callMutation, {loading, data, error: errorReg}] = useMutation(registerQuery);

  const register = async (email, password) => {
    await callMutation({
      variables: {
        input: {
          email,
          password,
          username: email
        }
      }
    });
  }

  return [register, data, loading, errorReg];
}

export default useRegister
