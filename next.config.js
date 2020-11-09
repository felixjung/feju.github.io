const withPlugins = require('next-compose-plugins')
const withOptimizedImages = require('next-optimized-images');
const withMDX = require('@next/mdx')()

module.exports = withPlugins([
  [withMDX, { pageExtensions: ['ts', 'tsx', 'mdx'] }],
  [withOptimizedImages, {
    images: {
      handleImages: ['jpeg', 'jpg', 'png', 'svg']
    }
  }]
], {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/about',
        permanent: false,
      },
      {
        source: '/custom-iterm2-titlebar-background-colors-a088c6f2ec60',
        destination: '/blog/posts/custom-iterm2-titlebar-background-colors',
        permanent: true,
      },
      {
        source: '/test-driving-prepack-with-webpack-2-baf96e51e64d',
        destination: '/blog/posts/test-driving-prepack-with-webpack-2',
        permanent: true,
      },
      {
        source: '/upgrading-to-webpack-2-fc09bd8adbd4',
        destination: '/blog/posts/upgrading-to-webpack-2',
        permanent: true,
      },
      {
         source: '/posts/upgrading-to-webpack-2',
         destination: '/blog/posts/upgrading-to-webpack-2',
         permanent: true,
      },
      {
        source: '/feeling-good-about-side-projects-and-experiments-47caeb1fa8c6',
        destination: '/blog/posts/feeling-good-about-side-projects-and-experiments',
        permanent: true,
      },
      {
        source: '/on-apple-3c3aad523611',
        destination: '/blog/posts/on-apple',
        permanent: true,
      },
      {
        source: '/caring-about-your-code-46ad2088d32d',
        destination: '/blog/posts/caring-about-your-code',
        permanent: true,
      },
      {
        source: '/posts/presentational-react-components-the-emotion-way',
        destination: '/blog//posts/presentational-react-components-the-emotion-way',
        permanent: true,
      },
      {
        source: '/posts/pretty-iterm2-with-a-modern-titlebar',
        destination: '/blog/posts/pretty-iterm2-with-a-modern-titlebar',
        permanent: true,
      },
      {
        source: '/posts/the-css-prop-in-emotion-10',
        destination: '/blog/posts/the-css-prop-in-emotion-10',
        permanent: true,
      },
    ]
  },
})
