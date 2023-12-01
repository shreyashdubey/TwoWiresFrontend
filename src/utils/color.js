import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    custom: {
      charcoal: '#3A3B3C',
      midnightBlue: '#15202B',
      darkSlateBlue: '#192734',
      white: '#FFFFFF',
      button : '#22303C',
      ongoing : '#FFBF00',
      completed : '#CC5500',
      scheduled: '#FBCEB1'
    },
  },
});

export default theme;