import Share from "react-native-share";
import * as Burnt from "burnt";
import PropTypes from "prop-types";

import { playStoreUrl } from "../../constants/values";
import MaterialCommunityIconsComponent from "../ui/MaterialCommunityIconsComponent";

export default function ShareCapture({ takeScreenshot }) {
  const containerStyle = {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 3,
    width: 32,
  };

  const showSaveToast = (title) => {
    Burnt.toast({
      title: title,
      preset: "done",
    });
  };

  const handleShare = async () => {
    try {
      const screenshotURI = await takeScreenshot({
        format: "jpg",
        fileName: "Brite-Lite-",
        useRenderInContext: true,
      });
      if (screenshotURI) {
        await Share.open({
          title: "Brite-Lite",
          message:
            "Here's a picture I created with Brite-Lite\n" + playStoreUrl,
          url: screenshotURI,
        });
      } else {
        showSaveToast("An error occurred sharing");
      }
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
