import React from 'react';
import { Text, View, Image, StyleSheet, Dimensions } from 'react-native';
import { Camera, FileSystem, Permissions } from 'expo';

export default class EditScreen extends React.Component {
  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={{flex: 1}}>
        <Image source={params} style={styles.picture} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  picture: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});