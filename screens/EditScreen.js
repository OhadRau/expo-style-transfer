import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, Image, StyleSheet, Dimensions, TouchableHighlight, AsyncStorage } from 'react-native';
import { Camera, ImagePicker, FileSystem, Permissions } from 'expo';

const token = "JGFyZ29uMmkkdj0xOSRtPTUxMix0PTIscD0yJFA4MXY2dFhwWEtKWlhmZkVPSGUza2ckUWFkMS9IbXVGdm1xcXNqODFSenRIQQ==";

export default class EditScreen extends React.Component {
  uploadImageAsync = async (token, uri1, uri2) => {
    let apiUrl = 'http://107.150.18.183/upload';
    
    let split_data = uri1.split(".");
    let split_data_2 = uri2.split(".");
    let fileType_0 = split_data[split_data.length - 1];
    let fileType_1 = split_data_2[split_data_2.length - 1];

    let formData = new FormData();
    formData.append('file_0', {
      uri: uri1,
      name: `photo.${fileType_0}`,
      type: `image/${fileType_0}`,
    });
    formData.append('file_1', {
      uri: uri2,
      name: `photo.${fileType_1}`,
      type: `image/${fileType_1}`,
    });
    formData.append('token', token);
    
    let options = {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
    
    var x = await fetch(apiUrl, options);
    
    let formData_ = new FormData();
    formData_.append('token', token);
    
    let options_ = {
      method: 'POST',
      body: formData_,
    };
    let last = await fetch('http://107.150.18.183/last_upload', options_);
    
    this.props.navigation.navigate('View', {imageId: last.body});
    return x;
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <View style={styles.backgroundContainer}>
          <Image source={params} style={styles.picture} />
        </View>
        <View style={styles.pictures}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={async () => {
              let pickerResult = await ImagePicker.launchImageLibraryAsync();
              await this.uploadImageAsync(token, params.uri, pickerResult.uri)
            }}>
            <Ionicons
              name={Platform.OS === 'ios'
                ? `ios-add`
                : 'md-add'}
              size={28}
              style={{ marginBottom: 10, color: 'white' }}
            />
          </TouchableOpacity>
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
    resizeMode: 'cover',
  },
});