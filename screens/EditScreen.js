import React from 'react';
import { Text, View, Image, StyleSheet, Dimensions } from 'react-native';
import { Camera, FileSystem, Permissions } from 'expo';

export default class EditScreen extends React.Component {
  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <View style = {styles.backgroundContainer}>
          <Image source={params} style={styles.picture} />
        </View>
        <View style={styles.pictures}>
          <Image style={styles.miniPicture} source={require('../assets/images/ayahuasca.jpg')} />
          <Image style={styles.miniPicture} source={require('../assets/images/robot-prod.png')} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  picture: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  pictures: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  miniPicture: {
    width: 100,
    height: 100,
    margin: 5,
    resizeMode: 'cover',
  },
});