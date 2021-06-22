import React from 'react';
import {View, Text, TextInput, TouchableOpacity, Button} from 'react-native';

const Input = ({input, setInput, sendMsg}) => {
  return (
    <View>
      <TextInput
        placeholder="Add item to list.."
        value={input}
        onChangeText={setInput}
      />

      <TouchableOpacity>
        <Button
          title="send "
          onPress={() => {
            if (input !== '') {
              sendMsg()
                .then()
                .catch(er => console.log(er));
              setInput('');
            }
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Input;
