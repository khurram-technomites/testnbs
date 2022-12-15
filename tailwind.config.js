const { guessProductionMode } = require("@ngneat/tailwind");

process.env.TAILWIND_MODE = guessProductionMode() ? 'build' : 'watch';

module.exports = {
    prefix: '',
    mode: 'jit',
    purge: {
      content: [
        './src/**/*.{html,ts,css,scss,sass,less,styl}',
      ]
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      extend: {
        colors: {
          'gk-yellow': '#F6AE2D',
          'gk-red': '#0989B8',
          'gk-blue': '#F6F8F9',
        },

        backgroundImage: {
          'left-hero': "url('./assets/images/left-hero-bg.png')",
          'right-hero': "url('./assets/images/right-hero-bg.png')",
          'footer-bg': "url('./assets/images/footer-bg.png')",
          'desktop-left-hero': "url('./assets/images/desktop-hero-left.png')",
          'desktop-right-hero': "url('./assets/images/desktop-hero-right.png')",
          'download-app-bg': "url('./assets/images/our-app-bg1.png')",
          'about-hero-bg': "url('./assets/images/innerimage1.jpg')",
          'contactus-hero-mbg': "url('./assets/images/contactus-mbg.png')",
          'contactus-hero-bg': "url('./assets/images/contactus-bg.png')",
          'career-hero-bg': "url('./assets/images/careers-bg_compressed.jpg')",
          'properties-hero-bg': "url('./assets/images/properties-home-bg.png')",
          'home-property-thumbnail': "url('./assets/images/ep1.jpg')",
          'most-popular-home-banner': "url('./assets/images/most-popular-home-banner.jpg')",
          'everyone-dream-banner' : "url('./assets/images/everyone-dream-banner.png')",
          'umm-al-quwain': "url('./assets/images/Umm-Al-Quwain.png')",
          'dubai': "url('./assets/images/Dubai.png')",
          'sharjah': "url('./assets/images/Sharjah.png')",
          'al-ain': "url('./assets/images/Al-Ain.png')",
          'abu-dhabi': "url('./assets/images/Abu-Dhabi.png')",
          'ajman': "url('./assets/images/Ajman.png')",
          'ras-al-khaimah': "url('./assets/images/Ras-Al-Khaimah.png')",
          'property-for-rent': "url('./assets/images/properties-thumbnails.png')",
          'motor-for-rent': "url('./assets/images/motors-for-rent.png')",
          'faq-bg': "url('./assets/images/faqs-bg.png')",
          'hero-bg': "url('./assets/images/Bg2.jpg')",
          'dropdown-arrow': "url('./assets/images/dropdown-arrow.png')",
          'comingsoon-bg': "url('./assets/images/comingsoon-bg.png')",
          'location-icon-bg': "url('./assets/images/map-location-input.png')",
          'blogs-bg': "url('./assets/images/blog-img1.jpg')",
          'variation-bg': "url('./assets/images/variation-img.png')",
        },

        fontFamily: {
          'Inter': ['Inter'],
          'FivoSans': ['FivoSans'],
        },

      },
    },
    variants: {
      extend: {},
    },
    plugins: [require('@tailwindcss/forms'),require('@tailwindcss/typography'),require('@tailwindcss/line-clamp')],
};
