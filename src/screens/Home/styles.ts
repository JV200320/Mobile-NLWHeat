import { getStatusBarHeight } from 'react-native-iphone-x-helper'

import { StyleSheet } from "react-native";
import {COLORS} from '../../themes'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK_SECONDARY,
    paddingTop: getStatusBarHeight() + 17
  }
})