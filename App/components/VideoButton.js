"use strict"

import React, { Component } from "react"
import { Text, StyleSheet, TouchableHighlight, Image } from "react-native"

const images = {
  rewind: require("./../../images/video-rewind.png"),
  seek: require("./../../images/video-seek.png"),
  pause: require("./../../images/video-pause.png"),
  play: require("./../../images/video-play.png"),
  mute: require("./../../images/video-mute.png"),
  unmute: require("./../../images/video-unmute.png"),
}

export default class VideoButton extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress} style={styles.container}>
        <Image source={images[this.props.image]} style={styles.image} />
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "rgba(211,211,211,0.8)",

    borderColor: "rgba(44,44,44,0.8)",
    borderWidth: 2,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderRadius: 10,

    flex: 1,
    justifyContent: "space-around",
    margin: 3,
  },
  image: {
    // textAlign: "center",
  },
})
