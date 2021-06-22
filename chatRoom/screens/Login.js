import React from 'react';
import {Button} from 'react-native';

const Login = ({onGoogleButtonPress}) => {
  return (
    <Button
      onPress={() =>
        onGoogleButtonPress()
          .then(() => console.log('user signed in'))
          .catch(er => console.log(er))
      }
      title="log in with google"
    />
  );
};

export default Login;
