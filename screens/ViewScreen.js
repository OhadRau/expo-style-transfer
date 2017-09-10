import React from 'react';
import { Button, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, Image, StyleSheet, Dimensions, TouchableHighlight, InteractionManager } from 'react-native';
import { Camera, ImagePicker, FileSystem, Permissions } from 'expo';

const token = "JGFyZ29uMmkkdj0xOSRtPTUxMix0PTIscD0yJFA4MXY2dFhwWEtKWlhmZkVPSGUza2ckUWFkMS9IbXVGdm1xcXNqODFSenRIQQ==";

export default class ViewScreen extends React.Component {
  state = {
    image: null,
  };

  checkUpdate = async () => {
    const { params } = this.props.navigation.state;
    let formData = new FormData();
    formData.append('token', token);

    let options = {
      method: 'POST',
      body: formData,
    };

    const apiUrl = `http://107.150.18.183/download/${params.imageId}/`;
    var x = await fetch(apiUrl, options);
    console.log(x.headers.get('content-type'));
    if (x.headers.get('content-type').indexOf('application/json') === -1) {
      this.setState({ image: x.body });
      clearInterval(this._interval);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.backgroundContainer}>
          <Image source={this.state.image || require('../assets/images/loading.gif')} style={styles.picture} />
          <Button
          onPress={this.checkUpdate}
          title="Check"
          />
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
    width: 120,
    height: 120,
    margin: 5,
    resizeMode: 'center',
  },
});