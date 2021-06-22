import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const List = ({item,deleteItem}) => {
  return (
    <TouchableOpacity style={styles.listTouch}>
      <View style={styles.listView}>
        <Text style={styles.listText}>{item.text}</Text>
        <Icon name="remove" size={20} color="firebrick" onPress={()=>deleteItem(item.id)} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listTouch: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#eee',
  },

  listView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
  },
  listText: {
    fontSize: 18,
  },
});

export default List;
