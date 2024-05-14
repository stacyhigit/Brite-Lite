import Share from "react-native-share";
import PropTypes from "prop-types";

import { playStoreUrl } from "../../constants/values";
import MaterialCommunityIconsComponent from "../ui/MaterialCommunityIconsComponent";

export default function ShareCapture({ takeScreenshot }) {
  const containerStyle = {
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 3,
    width: 32,
  };

  const handleShare = async () => {
    try {
      const screenshotURI = await takeScreenshot();
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
    <MaterialCommunityIconsComponent
      onPress={handleShare}
      containerStyle={containerStyle}
      icon={{ name: "share-variant", size: 28, color: "white" }}
    />
  );
}
ShareCapture.propTypes = {
  takeScreenshot: PropTypes.func,
};
