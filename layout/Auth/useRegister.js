import {useMutation} from "@apollo/client";
import {registerQuery} from '../../queries/auth'

const useRegister = () => {
  const [callMutation, {loading, data, error: errorReg}] = useMutation(registerQuery);

  const register = async (email, password) => {
    const result = await callMutation({
      variables: {
        input: {
          email,
          password,
          username: email
        }
      }
    });
    console.log(errorReg);
    console.log('useRegister.register.result', result);
  }

  return [register, data, loading, errorReg];
}

export default useRegister
