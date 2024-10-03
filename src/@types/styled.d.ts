import "styled-components/native"
import themes from "@/themes"

declare module "styled-components" {
  type ThemeType = typeof themes
  export interface DefaultTheme extends ThemeType {}
}
