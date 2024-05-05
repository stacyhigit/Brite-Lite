import { captureRef } from "react-native-view-shot";
import Share from "react-native-share";

import MaterialIconsComponent from "./ui/MaterialIconsComponent";
import { playStoreUrl } from "../constants/values";
import PropTypes from "prop-types";

export default function ShareCapture({ shareRef }) {
  const containerStyle = {
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 3,
    width: 32,
  };

  const handleShare = async () => {
    try {
      const screenshotURI = await captureRef(shareRef, {
        format: "jpg",
        quality: 0.7,
      });
      await Share.open({
        title: "Brite-Lite",
        message: "Here's a picture I created with Brite-Lite\n" + playStoreUrl,
        url: screenshotURI,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MaterialIconsComponent
      onPress={handleShare}
      containerStyle={containerStyle}
      icon={{ name: "share", size: 28, color: "white" }}
    />
  );
}
ShareCapture.propTypes = {
  shareRef: PropTypes.object,
};
