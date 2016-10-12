"use strict"

import React, { Component } from "react"
import {
  View, StyleSheet, Switch, Modal, TouchableHighlight, Text, ListView,
  TextInput,
} from "react-native"

import store from './../Store'

export default class Chat extends Component {
  constructor(props) {
    super(props)

    const state = {
      modalVisible: false,
      chatStore: store.getState(),
    }

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2,
    })

    state.dataSource = ds.cloneWithRows(state.chatStore.chatMessages)

    this.state = state

    store.subscribe(() => {
      const state = this.state

      state.chatStore = store.getState()

      this.setState(state)
    })
  }

  setModalVisible(visible) {
    const state = this.state

    state.modalVisible = visible

    this.setState(state)
  }

  renderRow(chatMessage){
    return <Text>{chatMessage.message}</Text>
  }

  // componentWillReceiveProps(nextProps) {
  //   const state = this.state
  //
  //   state.dataSource.cloneWithRows(nextProps.chatMessages.chatMessages)
  //
  //   this.setState(state);
  // }

  onChange(message) {
    this.id = this.state.chatStore.chatMessages.length
    this.message = message

    console.warn('onChange', this.id, this.message)
  }

  onAddMessage(){
    store.dispatch({
      type: 'ADD_MESSAGE',
      id: this.id,
      message: this.message,
    })

    console.warn('onAddMessage', this.id, this.message)
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => {
         this.setModalVisible(true)
       }}>
         <Text>Chat!</Text>
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
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow.bind(this)}
            />
            <View>
              <TextInput
                style={styles.input}
                onChangeText={this.onChange.bind(this)}
              />
              <TouchableHighlight
                onPress={this.onAddMessage.bind(this)}
              >
                <Text>Send</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  // container: {
  //   alignItems: 'center',
  //   flex: 1,
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  // },
  modal: {
    margin: 100,
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'space-around',
  },
  input: {
    backgroundColor: '#e5e5e5',
    padding: 5,
    width: 200,
    height: 50,
    color: 'white'
  },
  // h1: {
  //   fontSize: 30,
  // },
  // h2: {
  //   fontSize: 40,
  // },
  // h3: {
  //   fontSize: 20,
  // },
})
