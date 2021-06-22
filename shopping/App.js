import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import Header from './components/header';
import List from './components/list';
import AddItem from './components/addItem';
import {v4 as uuidv4} from 'uuid';

const App = () => {
  const [item, setItems] = useState([
    {id: uuidv4(), text: 'iphone'},
    {id: uuidv4(), text: 'macBook'},
    {id: uuidv4(), text: 'BMW'},
    {id: uuidv4(), text: 'macLaron'},
  ]);

  const deleteItem = id => {
    setItems(prevItems => {
      return prevItems.filter(item => item.id != id);
    });
  };

  const addItem=newItem=>{
    setItems(
      prevItems=>{
        return [{id: uuidv4(), text:newItem},...prevItems]
      }
    )
  }

  return (
    <View style={styles.cont}>
      <Header title="Shopping List" />
      <AddItem addNewItem={addItem} />
      <FlatList
        data={item}
        renderItem={({item}) => <List item={item} deleteItem={deleteItem} />}
      />
    </View>
  );
};

//css stylings
const styles = StyleSheet.create({
  cont: {flex: 1, paddingTop: 60},
});

export default App;
