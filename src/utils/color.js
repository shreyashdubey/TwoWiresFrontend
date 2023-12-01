import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    custom: {
      charcoal: '#1D4044',
      midnightBlue: '#1A202C', //seleced one - '#1A202C'
      darkSlateBlue: '#192734',
      white: '#FFFFFF',
      button : '#22303C',
      ongoing : '#FFD580',
      completed : '#CC5500',
      scheduled: '#FBCEB1',
      mccolor : '#6082B6',
      mbutton : '#00A36C'
    },
  },
});

export default theme;