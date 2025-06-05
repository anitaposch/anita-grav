/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './templates/**/*.html.twig',
    './templates/*.html.twig',
    './src/**/*.{js,css}',
  ],
  theme: {
    extend: {
      colors: {
        'default': '#efefef',
        'primary': '#005a80',
        // 'primary': '#800000',

      },
      fontFamily: {
        sans: ['Inter'],
      },
      typography: {
        DEFAULT: {
          css: {
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:first-of-type::after': { content: 'none' },
          },
        },
      },
    }
  },
  variants: {
    extend: {
      display: ['group-hover'],
      scale: ['group-hover'],
      translate: ['group-hover'],
      filter: ['group-hover', 'hover'],
      saturate: ['group-hover', 'hover']
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ]
}
