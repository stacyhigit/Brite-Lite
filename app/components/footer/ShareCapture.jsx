import Share from "react-native-share";
import PropTypes from "prop-types";

import { playStoreUrl } from "../../constants/values";
import MaterialCommunityIconsComponent from "../ui/MaterialCommunityIconsComponent";
import { showToast } from "../../util/shared";
import { globalStyles } from "../../constants/styles";

export default function ShareCapture({ takeScreenshot }) {
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
          failOnCancel: false,
        });
      } else {
        showToast("error", "An error occurred sharing");
      }
    } catch (error) {
      console.log("error handleShare:", error);
      showToast("error", "An error occurred sharing");
    }
  };

  return (
    <MaterialCommunityIconsComponent
      onPress={handleShare}
      containerStyle={globalStyles.containerFooterIcon}
      icon={{ name: "share-variant", size: 28, color: "white" }}
    />
  );
}
ShareCapture.propTypes = {
  takeScreenshot: PropTypes.func,
};
