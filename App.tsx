import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto"
import { StatusBar } from "react-native"
import { ThemeProvider } from "styled-components/native"

import themes from "@/theme"
import { NewGroup } from "@/screens/NewGroup"
import { Loading } from "@/components/Loading"

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  return (
    <ThemeProvider theme={themes}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <NewGroup /> : <Loading />}
    </ThemeProvider>
  )
}
