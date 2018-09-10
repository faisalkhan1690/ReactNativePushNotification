/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import FCM,{FCMEvent} from "react-native-fcm";


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fcm_token: ""
    };
  }


  componentDidMount() {
    
    // this method generate fcm token.
    FCM.requestPermissions();
    FCM.getFCMToken().then(token => {
      this.setState({fcm_token:token});
      console.warn("TOKEN (getFCMToken)", token);
    });
    
    // This method get all notification from server side.
    FCM.getInitialNotification().then(notif => {
      console.warn("INITIAL NOTIFICATION", notif)
    });
    
    // This method give received notifications to mobile to display.
    FCM.on(FCMEvent.Notification, notif => {     
      if (notif && notif.local_notification) {
        return;
      }
      console.warn("a", notif);
      this.sendRemote(notif);
    });
  }
  
  // This method display the notification on mobile screen.
  sendRemote(notif) {
    var notiObject = {
      wake_screen: true,
      priority: "high",
      show_in_foreground: true,
      large_icon: "ic_launcher",
      icon: "ic_launcher",
      title:"FCM sample",
      body:notif.fcm.body
    }

    FCM.presentLocalNotification(notiObject);

  
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native FCM demo</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
