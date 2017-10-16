import styled from 'react-emotion'
import { darken, radialGradient } from 'polished'

export default styled('div')(({ theme, category }) => {
  const { color, backgroundColor } =
    theme.categories[category] || theme.categories.default
  return {
    color,
    ...radialGradient({
      colorStops: [backgroundColor, darken(0.1, backgroundColor)]
    }),
    height: '100%',
    width: '100%'
  }
})
