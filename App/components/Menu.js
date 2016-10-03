"use strict"

import React, { Component } from "react"
import {
  View, StyleSheet, Switch, Modal, TouchableHighlight, Text
} from "react-native"

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {modalVisible: false};
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={styles.container}>
        <Switch
          onValueChange={this.props.toggleAutoplay}
          value={this.props.autoplay}
          style={styles.switch}
        />
        <TouchableHighlight onPress={() => {
         this.setModalVisible(true)
       }}>
         <Text>Get Help Now!</Text>
       </TouchableHighlight>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}>
          <View style={styles.modal}>
            <TouchableHighlight onPress={() => {
             this.setModalVisible(false)
             }}>
               <Text>Go Back</Text>
             </TouchableHighlight>
            <Text style={styles.h2}>
              Get Help Now!
            </Text>
            <Text style={styles.h1}>
              1-800-273-TALK (8255)
            </Text>
            <Text style={styles.h3}>
              www.save.org
            </Text>
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modal: {
    margin: 100,
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'space-around',
  },
  h1: {
    fontSize: 30,
  },
  h2: {
    fontSize: 40,
  },
  h3: {
    fontSize: 20,
  },
})
