import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Header = (props) => {
  return (
    <View style={styles.head}>
      <Text style={styles.txt}>{props.title}</Text>
    </View>
  );
};

//css stylings
const styles = StyleSheet.create({
  head: {height: 60, padding: 15, backgroundColor: 'darkslateblue'},
  txt: {
    color: '#fff',
    fontSize: 23,
    textAlign: 'center',
  },
});

Header.defaultProps={
    title:"Shopping List"
}

export default Header;
