import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Constants } from "expo";
import Timer from './components/timer';


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Timer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    alignSelf: "center",
    width: Dimensions.get('window').width
  },
});
