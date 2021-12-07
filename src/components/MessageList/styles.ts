import { StyleSheet } from "react-native";
import { COLORS } from "../../themes";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  content: {
    paddingBottom: 184,
    paddingTop: 135
  },
  noMessages: {
    fontSize: 30,
    textAlign: 'center',
    color: COLORS.WHITE   }
})