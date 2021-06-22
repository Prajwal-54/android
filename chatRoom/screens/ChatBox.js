import React from 'react';
import {View, Text, FlatList, Image} from 'react-native';

const ChatBox = ({txt, user}) => {
  return (
    <View>
      <FlatList
        data={txt}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View>
            <Image
              style={{height: 30, width: 30}}
              source={{
                uri: user.photoURL,
              }}
            />
            <Text>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ChatBox;
