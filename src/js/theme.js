import { createMuiTheme, getContrastText } from '@material-ui/core/styles';
import { grey, blue } from '@material-ui/core/colors';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#b2b2b2',
      dark: blue[700]
    },
    secondary: {
      main: '#9FB98B',
      green: '#9FB98B'
    },
    green: {
      main: '#82997a',
    },
    red: {
      main: '#E65C73',
    },
    common: {
      green: '#9FB98B',
      green2: '#AAB99E',
      superGreen: '#4CBE5F',
      conviniBlue: '#579FD9',
      yellow: '#f2ce49',
      pontaOrange: '#FFA64D',
      white: '#FFF',
      grey1: '#808080',
      grey2: '#979797',
      grey3: '#B3B3B3',
      red: '#E65C73',
      darkGrey: '#4D4D4D',
    }
  },
  typography: {
    HiraginoKakuGo: ["Hiragino Kaku Gothic Pro", "HiraginoSans-W3"],
    HiraginoSans: ["Hiragino Sans", "HiraginoSans-W3"],
    NotoSansRegular: ['NotoSansCJKjp-Regular', "HiraginoSans-W3"],
    NotoSansBold: ['NotoSansCJKjp-Bold', "HiraginoSans-W3"],
    ITCAvant: ['ITCAvantGardePro-Md', "HiraginoSans-W3"],
    Helvetica: ['Helvetica', "HelveticaNeue"],
    Arial: ['Arial', "ArialMT"],
    HiraginoSansW3: ['HiraginoSans-W3']
  },
  spacing: 16
});