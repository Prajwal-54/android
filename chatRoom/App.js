import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';

GoogleSignin.configure({
  webClientId:
    '390446501822-c8g4d2pu8o9mh6d5o5qi1gamunqepi6s.apps.googleusercontent.com',
});

import Header from './screens/Header';
import ChatBox from './screens/ChatBox';
import Input from './screens/Input';
import Login from './screens/Login';

const ht = Dimensions.get('window').height;
const wt = Dimensions.get('window').width;

const App = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [txt, setTxt] = useState([]);
  const [input, setInput] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  async function onGoogleButtonPress() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = await auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  //logout
  async function logOut() {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  //database

  const query = firestore().collection('msgs');
  const ref = query.orderBy('createdAt').limit(20);

  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(documentSnapshot => {
        let text = documentSnapshot.data().text;
        let id = documentSnapshot.id;
        list.push({text, id});
      });

      setTxt(list);
    });
  }, []);

  //sending msg
  async function sendMsg() {
    await query.add({
      createdAt: firestore.FieldValue.serverTimestamp(),
      text: input,
      id: user.uid,
    });
    setInput('');
  }

  if (initializing) return <ActivityIndicator size="large" color="#00ff00" />;

  if (!user) {
    return <Login onGoogleButtonPress={onGoogleButtonPress} />;
  } else {
    return (
      <View style={styles.cont}>
        {/* {console.log(user)} */}

        {/* header  */}
        <Header user={user} logOut={logOut} />

        {/* chat box */}
        <ChatBox txt={txt} user={user} />

        {/* msg typing area */}
        <Input input={input} setInput={setInput} sendMsg={sendMsg} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  cont: {
    height: ht,
  },
});

export default App;
