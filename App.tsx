import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto"
import { ThemeProvider } from "styled-components/native"

import themes from "@/themes"
import { Loading } from "@/components/Loading"
import { Groups } from "@/screens/Groups"

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  return (
    <ThemeProvider theme={themes}>
      {fontsLoaded ? <Groups /> : <Loading />}
    </ThemeProvider>
  )
}
