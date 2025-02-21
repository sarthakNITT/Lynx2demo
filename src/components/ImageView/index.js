import React, { Component } from "react";
import { Image } from "react-native";
import { API_STORE } from "../../mobx/API_STORE";
import { NO_IMAGE_URL } from "../../utils/API_CONSTANTS";

const loadingImage = require("../../res/images/loadingImage.jpg");

export class ImageView extends Component {
  state = {
    image: NO_IMAGE_URL,
  };

  componentDidMount() {
    this.setState({ image: this.props.src });
  }

  loadFallBack() {
    this.setState({ image: NO_IMAGE_URL });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.src !== this.props.src) {
      this.setState({ image: this.props.src });
    }
  }

  render() {
    return (
      <Image
        defaultSource={loadingImage}
        source={
          typeof this.state.image === "string"
            ? {
                uri:
                  this.state.image === API_STORE.getCDN ||
                  this.state.image === ""
                    ? NO_IMAGE_URL
                    : this.state.image,
              }
            : this.state.image
        }
        style={this.props.style}
        resizeMode={this.props.resizeMode}
        onError={() => {
          this.loadFallBack();
        }}
      />
    );
  }
}

export default ImageView;
