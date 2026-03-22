import { ImageBackground, StyleSheet, ViewProps, View, ImageResizeMode, useWindowDimensions } from "react-native";
import { useTheme } from "../lib/theme/context/ThemeContext";

export enum NailVariant {
  None,
  FourCorners,
  OneCenteredTop
}

type ThemedImageBackgroundProps = ViewProps & {
  source: any;
  imageResize?: ImageResizeMode;
  overlay?: boolean;
  className?: string;
  nails?: NailVariant;
  maxHeight?: number;
  maxWidth?: number;
};

const ThemedImageBackground: React.FC<ThemedImageBackgroundProps> = ({
  source,
  imageResize = "stretch",
  overlay,
  children,
  className,
  nails = NailVariant.None,
  maxHeight,
  maxWidth,
  ...props
}) => {
  const { theme } = useTheme();

  const { height, width } = useWindowDimensions();

  const renderNails = () => {
    switch (nails) {
      case NailVariant.FourCorners:
        return (
          <>
            <View style={[styles.nail, styles.nailTopLeft]} />
            <View style={[styles.nail, styles.nailTopRight]} />
            <View style={[styles.nail, styles.nailBottomLeft]} />
            <View style={[styles.nail, styles.nailBottomRight]} />
          </>
        );
      case NailVariant.OneCenteredTop:
        return (
          <>
            <View style={[styles.nail, styles.nailTopCenter]} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        maxHeight: maxHeight ?? height,
        maxWidth: maxWidth ?? width,
      }}>
      <ImageBackground source={source} resizeMode={imageResize} className={className} {...props}>
        {overlay && (
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: theme.overlay,
              opacity: 0.8,
              boxShadow: `2px 2px 2px ${theme.border}`,
            }}
            className={className}
          />
        )}
        {children}

        {renderNails()}

      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  nail: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#2d1b0f",
    position: "absolute",
  },

  nailTopLeft: { top: 6, left: 6 },
  nailTopRight: { top: 6, right: 6 },
  nailBottomLeft: { bottom: 6, left: 6 },
  nailBottomRight: { bottom: 6, right: 6 },

  nailTopCenter: { top: 6, left: "50%", marginTop: 10 },
});

export default ThemedImageBackground;