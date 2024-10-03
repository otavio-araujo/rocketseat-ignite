import { Groups } from "@/screens/Groups"
import themes from "@/themes"

import { ThemeProvider } from "styled-components/native"

export default function App() {
  return (
    <ThemeProvider theme={themes}>
      <Groups />
    </ThemeProvider>
  )
}
