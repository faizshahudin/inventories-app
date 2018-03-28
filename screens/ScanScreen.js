import React, { Component } from 'react';
import {
  Alert,
  Linking,
  Dimensions,
  LayoutAnimation,
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import Expo, { BarCodeScanner } from 'expo';
import * as actions from '../actions';

class ScanScreen extends Component {
  componentDidMount() {
    this.props.requestCameraPermission();
  }

  handledReadBarcode = result => {
    if (result.data !== this.props.barcodeData) {
        LayoutAnimation.spring();
        this.props.storeBarcode(result);
    }
  };

  renderCamera = () => {
    if (this.props.cameraPermissions === null) {
        return (
            <Text>Requesting for camera permission</Text>
        );
    } else if (this.props.cameraPermissions === 'Failed') {
        return (
        <Text style={{ color: 'white' }}>Camera permission is not granted</Text>
        );
    }

    return (
        <BarCodeScanner
            onBarCodeRead={this.handledReadBarcode}
            style={styles.cameraStyle} 
        >
            <View style={styles.cameraHeaderStyle}>
                <Text style={styles.cameraHeaderTextStyle}>Scan your item QR code</Text>
            </View>
            <View style={styles.qrBox} />
        </BarCodeScanner>
    );
  }
  
  renderScanResult = () => {
    if (this.props.barcodeType !== 'org.iso.QRCode') {
        return (
            <View style={styles.bottomBar}>
                <Text style={styles.resultTextStyle}>Please scan only QR code</Text>
            </View>
        );
    }
    
    return (
        <View style={styles.bottomBar}>
            <Text numberOfLines={1} style={styles.resultTextStyle}>
            {this.props.barcodeData}
            </Text>
        </View>
    );
  }

  render() {
    return (
        <View style={styles.container}>
            {this.renderCamera()}
            {this.renderScanResult()}
            <StatusBar hidden />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  cameraHeaderStyle: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0
  },
  cameraHeaderTextStyle: {
      color: '#3498db',
      fontSize: 20,
      position: 'absolute',
      bottom: 10
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    flexDirection: 'row',
  },
  url: {
    flex: 1,
  },
  resultTextStyle: {
    color: '#fff',
    fontSize: 20,
  },
  cancelButton: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 18,
  },
  cameraStyle: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center'
  },
  qrBox: {
      height: (Dimensions.get('window').width) - 100,
      width: (Dimensions.get('window').width) - 100,
      borderWidth: 7,
      borderColor: 'white'
  }
});

function mapStateToProps({ scan }) {
    return { 
        cameraPermissions: scan.cameraPermissions,
        barcodeType: scan.barcodeType,
        barcodeData: scan.barcodeData
    };
}

export default connect(mapStateToProps, actions)(ScanScreen);
