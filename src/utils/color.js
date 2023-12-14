import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    custom: {
      charcoal: '#1D4044',                //layout
      midnightBlue: '#1A202C',            // backgrount color  
      darkSlateBlue: '#192734',           //  content backgrounf color
      white: '#FFFFFF',                   
      button: '#22303C',                   // button color
      ongoing: '#FFD580',
      completed: '#CC5500',
      scheduled: '#FBCEB1',
      mccolor: '#6082B6',
      mbutton: '#00A36C', 
    },
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  breakpoints : {
    base: "0px", // 0px
    sm: "375px", // ~480px. em is a relative unit and is dependant on the font-size.
    md: "425px", // ~768px
    lg: "768px", // ~992px
    xl: "1024px", // ~1280px
    "2xl": "1440px", // ~1536px
    "3xl" : "1650"
  },

});

export default theme;
