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
});

export default theme;
