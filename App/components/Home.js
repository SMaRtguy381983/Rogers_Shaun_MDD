"use strict"

import React, { Component } from "react"
import { View, Text, StyleSheet } from "react-native"

import Menu from "./Menu"
import Video from "./Video"

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // autoplay: true,
      autoplay: false,
    }
  }
  getAutoplay() {
    return this.state.autoplay
  }
  toggleAutoplay() {
    this.setState({autoplay: !this.state.autoplay})
  }
  render() {
    return (
      <View style={styles.container}>
        <Menu autoplay={this.state.autoplay}
          toggleAutoplay={this.toggleAutoplay.bind(this)}
          />
        <View style={styles.header}>
          <Text style={styles.h1}>Suicide Watch</Text>
          <Text style={styles.p}>There is help.</Text>
        </View>
        <Video autoplay={this.state.autoplay} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    alignItems: "center",
    backgroundColor: "rgba(22,22,22,1)",
    flex: 2,
    justifyContent: "center"
  },
  h1: {
    color: "white",
    flex: 1,
    fontFamily: "Helvetica Neue",
    fontSize: 30,
    fontWeight: "900",
    padding: 25
  },
  p: {
    color: "white",
    flex: 1,
    fontSize: 20
  }
})
