import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
const API_KEY = '11834781bff000825b4dad5de1ccaa19';

const bg1 = require('./images/bg-1.jpg');
const bg2 = require('./images/bg-2.jpg');
const bg3 = require('./images/bg-3.jpg');
const bg4 = require('./images/bg-4.jpg');
const bg5 = require('./images/bg-5.jpg');
const bg6 = require('./images/bg-6.jpg');
const bg7 = require('./images/bg-7.jpg');

const bgs = [bg1, bg2, bg3, bg4, bg5, bg6, bg7];

const ht = Dimensions.get('window').height;
const wt = Dimensions.get('window').width;

//  function getRndInteger(min, max) {
//     return Math.floor(Math.random() * (max - min)) + min;
//   }

const App = () => {
  // inpute state
  const [text, setText] = useState('');
  const addChange = newItem => {
    setText(newItem);
  };

  //loading state
  const [isLoading, setLoading] = useState(true);
  //api state
  const [data, setData] = useState([]);

  // weather image url  state
  const [url, setUrl] = useState('');

  //background image
  const [image, setImage] = useState(bg1);

  //background image changing
  useEffect(() => {
    setInterval(function () {
      let rnd = Math.floor(Math.random() * (7 - 0)) + 0;
      setImage(bgs[rnd]);
    }, 7000);
  }, []);

  useEffect(() => {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=bhatkal&appid=' +
        API_KEY,
    )
      .then(response => response.json())
      .then(json => {
        if (json.cod === 200) {
          setData(json);
          setUrl(
            'https://openweathermap.org/img/wn/' +
              json.weather[0].icon +
              '@2x.png',
          );
        } else {
          Alert.alert('city not found', 'enter a valid city name', [
            {
              text: 'OK',
              onPress: () => console.log('alert closed'),
            },
          ]);
        }
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const myDate = new Date();

  return (
    <View style={styles.loader}>
      {isLoading ? (
        <Text style={styles.load}>Loading...</Text>
      ) : (
        <View style={styles.bg}>
          {/* background image */}
          <ImageBackground source={image} style={styles.image} blurRadius={3}>
            {/* head */}
            <View style={styles.head}>
              <Text style={styles.headTxt}> Weather App</Text>
            </View>

            {/* search box */}
            <View>
              <View style={styles.InputCont}>
                <TextInput
                  placeholder="Change City Name Here"
                  placeholderTextColor="rgba(299, 299, 299, 0.4)"
                  style={styles.Input}
                  onChangeText={addChange}
                  value={text}
                  onSubmitEditing={() => {
                    if (text === '') {
                      Alert.alert('city not found', 'enter a valid city name', [
                        {
                          text: 'OK',
                          onPress: () => console.log('alert closed'),
                        },
                      ]);
                    } else {
                      fetch(
                        'https://api.openweathermap.org/data/2.5/weather?q=' +
                          text +
                          '&appid=' +
                          API_KEY,
                      )
                        .then(response => response.json())
                        .then(json => {
                          if (json.cod === 200) {
                            setData(json);
                            setUrl(
                              'https://openweathermap.org/img/wn/' +
                                json.weather[0].icon +
                                '@2x.png',
                            );
                          } else {
                            Alert.alert(
                              'city not found',
                              'enter a valid city name',
                              [
                                {
                                  text: 'OK',
                                  onPress: () => console.log('alert closed'),
                                },
                              ],
                            );
                          }
                        })
                        .catch(error => console.error(error));
                    }
                    setText('');
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    if (text === '') {
                      Alert.alert('city not found', 'enter a valid city name', [
                        {
                          text: 'OK',
                          onPress: () => console.log('alert closed'),
                        },
                      ]);
                    } else {
                      fetch(
                        'https://api.openweathermap.org/data/2.5/weather?q=' +
                          text +
                          '&appid=' +
                          API_KEY,
                      )
                        .then(response => response.json())
                        .then(json => {
                          if (json.cod === 200) {
                            setData(json);
                            setUrl(
                              'https://openweathermap.org/img/wn/' +
                                json.weather[0].icon +
                                '@2x.png',
                            );
                          } else {
                            Alert.alert(
                              'city not found',
                              'enter a valid city name',
                              [
                                {
                                  text: 'OK',
                                  onPress: () => console.log('alert closed'),
                                },
                              ],
                            );
                          }
                        })
                        .catch(error => console.error(error));
                    }
                    setText('');
                  }}>
                  <Icon
                    name="search"
                    size={35}
                    color="rgba(299, 299, 299, 0.4)"
                    style={styles.btn}
                  />
                </TouchableOpacity>
              </View>

              {/* widget container */}
              <View style={styles.card}>
                <View style={styles.left}>
                  {/* <Svg height={160} width={160} style={styles.svg} /> */}
                  <Image
                    style={styles.svg}
                    source={{
                      uri: url,
                    }}
                  />
                  <Text style={styles.status}>
                    {data.weather[0].description}
                  </Text>
                </View>

                <View style={styles.right}>
                  <Text style={styles.date}>
                    {myDate.getUTCHours()}:{myDate.getUTCMinutes()} UTC {'\n'}
                    {myDate.getUTCDate()}/{myDate.getUTCMonth()}/
                    {myDate.getFullYear()}
                  </Text>
                  <Text style={styles.place}>{data.name}</Text>
                  <Text style={styles.deg}>
                    {(data.main.temp - 273.15).toFixed(2)}
                    &#176;c
                  </Text>
                </View>

                <View style={styles.bottom}>
                  <Text style={styles.bottomBlocks}>
                    wind speed {'\n'} {(data.wind.speed * 3.6).toFixed(2)} kmph
                  </Text>
                  <Text style={styles.bottomBlocks}>
                    humudity {'\n'} {data.main.humidity} %
                  </Text>
                  <Text style={styles.bottomBlocks}>
                    pressure {'\n'} {data.main.pressure / 1000} bar
                  </Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  load: {
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'Poppins-Light',
  },
  bg: {
    flexDirection: 'column',
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  head: {
    height: 50,
    width: wt,
    padding: 5,
    backgroundColor: 'rgba(299, 299, 299, 0.4)',
    marginTop: 7,
    borderRadius: 24,
    top: -18,
  },
  headTxt: {
    color: '#fff',
    fontSize: 28,
    fontFamily: 'Poppins-ExtraBold',
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowRadius: 9,
    textShadowOffset: {width: 2, height: 2},
  },
  InputCont: {
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    width: 360,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderStyle: 'solid',
    borderColor: 'rgba(299, 299, 299, 0.4)',
    borderWidth: 4,
  },
  Input: {
    width: 290,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Poppins-Light',
    borderTopLeftRadius: 25,
    color: 'white',
  },
  btn: {
    right: -6,
    top: 5,
  },
  card: {
    width: 360,
    height: 300,
    backgroundColor: 'rgba(299, 299, 299, 0.4)',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    display: 'flex',
    flexDirection: 'row',
  },
  left: {
    height: 200,
    width: 180,
    left: 0,
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    height: 200,
    width: 180,
    right: 0,
    justifyContent: 'space-evenly',
  },
  bottom: {
    width: 360,
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    left: -360,
    top: 200,
  },
  svg: {
    height: 120,
    width: 130,
    marginLeft: 30,
    marginTop: 15,
    marginBottom: 20,
    borderRadius: 120 / 2,
  },
  status: {
    fontSize: 17,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    padding: 3,
    bottom: 18,
    marginLeft: 18,
    color: 'white',

    textShadowColor: 'black',
    textShadowRadius: 7,
    textShadowOffset: {width: 2, height: 1},
  },
  date: {
    textAlign: 'center',
    fontSize: 19,
    fontFamily: 'Poppins-ExtraBold',
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 5,
    textShadowOffset: {width: 1, height: 2},
  },
  place: {
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'Poppins-ExtraBold',
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 7,
    textShadowOffset: {width: 2, height: 1},
  },
  deg: {
    textAlign: 'center',
    fontSize: 40,
    margin: 0,
    padding: 0,
    bottom: 0,
    fontFamily: 'Poppins-ExtraBold',
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 5,
    textShadowOffset: {width: 2, height: 1},
  },
  bottomBlocks: {
    width: 120,
    height: 100,
    display: 'flex',
    textAlign: 'center',
    paddingTop: 24,
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 6,
    textShadowOffset: {width: 2, height: 1},
  },
});

export default App;
