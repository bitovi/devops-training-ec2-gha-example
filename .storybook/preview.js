// Global Styles
import '../src/styles/reset.css'
import '../src/styles/theme-bitovi-light.css'
import '../src/styles/main.css'
import '../src/styles/colors.css'
import '../src/styles/text.css'
import '../src/styles/shadows.css'
import '../src/styles/forms.css'
import '../src/styles/buttons.css'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

// Apply the theme variables to the page.
document.body.classList.add('theme-bitovi-light')