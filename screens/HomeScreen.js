import React from 'react';
import { Text, View, Platform, TouchableOpacity, Vibration } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Camera, FileSystem, Permissions } from 'expo';
import ImageResizer from 'react-native-image-resizer';

export default class HomeScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.front,
    photoId: 1,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  componentDidMount() {
    FileSystem.deleteAsync(FileSystem.documentDirectory + 'temp');
    FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + 'temp'
    ).catch(e => {
      console.log(e, 'Directory exists');
    });
    //this._interval = setInterval(this.capture.bind(this), 5000);
  }

  componentWillUmount() {
    //clearInterval(this._interval);
  }
  
  capture = async () => {
    if (this.camera) {
      const data = await this.camera.takePictureAsync();
      const path = `${FileSystem.documentDirectory}temp/Photo_${this.state.photoId}.jpg`;
      await FileSystem.moveAsync({
        from: data,
        to: path,
      });
      const uri = await ImageResizer.createResizedImage(path, 100, 56, 'JPEG', 80);
      this.setState({
        photoId: this.state.photoId + 1,
      });
    }
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera ratio={'16:9'} style={{ flex: 1 }} type={this.state.type} ref={ref => {this.camera = ref;}}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Ionicons
                  name={Platform.OS === 'ios'
                        ? `ios-swap`
                        : 'md-swap'}
                  size={28}
                  style={{ marginBottom: 10, color: 'white' }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={this.capture.bind(this)}>
                <Ionicons
                  name={Platform.OS === 'ios'
                        ? `ios-camera`
                        : 'md-camera'}
                  size={28}
                  style={{ marginBottom: 10, color: 'white' }}
                />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}