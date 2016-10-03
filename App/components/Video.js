"use strict"

import React, { Component } from "react"
import { View, Text, StyleSheet } from "react-native"

import ReactNativeVideo from "react-native-video"

import VideoButton from "./VideoButton"

export default class Video extends Component {
  constructor(props) {
    super(props)

    this.state = {
      banner: {
        delay: 50,
      },

      playbackRate: 1,
      paused: false,
      pausedImage: "pause",
      muted: true,
      mutedImage: "mute",
    }
  }

  rewind() {
    // Rewind the video.
    const state = this.state

    state.pausedImage = "play"

    if (state.playbackRate >= 1 && state.playbackRate <= 1.5) {
      state.playbackRate = 0
    }

    state.playbackRate -= 0.5

    if (state.playbackRate < -2) {
      state.playbackRate = -0.5
    }

    // console.log(state.playbackRate)

    this.setState(state)
  }

  seek() {
    // Fast forward video.
    const state = this.state

    state.pausedImage = "play"

    if (state.playbackRate >= -0.5 && state.playbackRate <= 0) {
      state.playbackRate = 1
    }

    state.playbackRate += 0.5

    if (state.playbackRate > 3) {
      state.playbackRate = 1.5
    }

    // console.log(state.playbackRate)

    this.setState(state)
  }

  setPlaybackRate(playbackRate, pausedImage) {
    const state = this.state

    state.playbackRate = playbackRate
    state.pausedImage = pausedImage

    this.setState(state)
  }

  play() {
    // Resume playback.
    // if (this.state.paused) {
      this.setPlaybackRate(1, "pause")

      this.state.paused = false
    // }
  }

  pause() {
    // Pauses playback entirely.
    this.setPlaybackRate(0, "play")

    this.state.paused = true
  }

  togglePlayback(playbackRate, paused) {
    if ((playbackRate !== 1 && !paused) || paused) {
      this.play()
    } else {
      this.pause()
    }
  }

  muteVideo() {
    // Mutes the audio entirely.
    const state = this.state

    if (state.muted) {
      state.muted = false
      state.mutedImage = "unmute"
    } else {
      state.muted = true
      state.mutedImage = "mute"
    }

    this.setState(state)
  }

  loadStart() {
    // Callback when video starts to load
  }

  setDuration() {
    // Callback when video loads

    // animate banner
  }

  setTime() {
    // Callback every ~250ms with currentTime
    const state = this.state

    if (state.banner.delay > 0) {
      state.banner.delay -= 1
    }

    this.setState(state)

    if (state.banner.delay === 0) {
      state.banner.delay = -1
    }
  }

  onEnd() {
    // Callback when playback finishes
  }

  videoError() {
    // Callback when video cannot be loaded
  }

  render() {
    let statusText = ""

    if (this.state.paused) {
      statusText += "Paused"
    } else if (this.state.playbackRate !== 1) {
      statusText += `${this.state.playbackRate * 100}%`
    } else {
      statusText += ""
    }

    if (this.state.muted) {
      statusText += `${statusText ? " - " : ""}Muted`
    }

    return (
      <View style={styles.container}>
        <Text style={styles.playbackRate}>{statusText}</Text>
        <ReactNativeVideo
          source={require("../../video.mp4")}
          rate={this.state.playbackRate}    // 0 is paused, 1 is normal.
          // rate={1}
          volume={1.0}                      // 0 is muted, 1 is normal.
          muted={this.state.muted}          // Mutes the audio entirely.
          paused={false}                    // Pauses playback entirely.
          resizeMode="cover"                // Fill the whole screen at aspect ratio.
          repeat={false}                    // Repeat forever.
          playInBackground={false}          // Audio continues to play when entering
                                            // background.
          playWhenInactive={false}          // [iOS] Video continues to play when
                                            // control or notification center are
                                            // shown.
          onLoadStart={this.loadStart.bind(this)}
          onLoad={this.setDuration.bind(this)}
          onProgress={this.setTime.bind(this)}
          onEnd={this.onEnd.bind(this)}
          onError={this.videoError.bind(this)}
          style={styles.video}
        />
        <View style={styles.buttons}>
          <VideoButton
            onPress={this.rewind.bind(this)}
            image="rewind"
          />
          <VideoButton
            onPress={this.togglePlayback.bind(this, this.state.playbackRate, this.state.paused)}
            image={this.state.pausedImage}
          />
          <VideoButton
            onPress={this.seek.bind(this)}
            image="seek"
          />
          <VideoButton
            onPress={this.muteVideo.bind(this)}
            image={this.state.mutedImage}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 7,
    backgroundColor: "rgba(22,22,22,1)",
  },
  playbackRate: {
    backgroundColor: "rgba(0,0,0,0)",
    top: 0,
    left: 4,
    position: "absolute",
    color: "red",
    zIndex: 999,
  },
  video: {
    flex: 10,

    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    // marginHorizontal: 2,
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    margin: 3,
  },
})
