import React from 'react';
import {View, Text, Button} from 'react-native';

const Header = ({user, logOut}) => {
  return (
    <View>
      <Text>Welcome {user.email} </Text>
      <Button
        onPress={() =>
          logOut()
            .then()
            .catch(er => console.log(er))
        }
        title="log out"
      />
    </View>
  );
};

export default Header;
