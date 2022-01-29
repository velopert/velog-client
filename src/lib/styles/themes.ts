type ThemeVariables = {
  bg_page1: string;
  bg_page2: string;
  bg_element1: string;
  bg_element2: string;
  bg_element3: string;
  bg_element4: string;
  bg_element5: string;
  bg_element6: string;
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  border1: string;
  border2: string;
  border3: string;
  border4: string;
  primary1: string;
  primary2: string;
  destructive1: string;
  destructive2: string;
  button_text: string;

  slight_layer: string;
  opaque_layer: string;
};

type Theme = 'light' | 'dark';
type VariableKey = keyof ThemeVariables;
type ThemedPalette = Record<VariableKey, string>;

const themeVariableSets: Record<Theme, ThemeVariables> = {
  light: {
    bg_page1: '#F8F9FA',
    bg_page2: '#FFFFFF',
    bg_element1: '#FFFFFF',
    bg_element2: '#F8F9FA',
    bg_element3: '#E9ECEF',
    bg_element4: '#DEE2E6',
    bg_element5: '#212529',
    bg_element6: '#343A40',
    text1: '#212529',
    text2: '#495057',
    text3: '#868E96',
    text4: '#CED4DA',
    border1: '#343A40',
    border2: '#ADB5BD',
    border3: '#DEE2E6',
    border4: '#F1F3F5',
    primary1: '#12B886',
    primary2: '#20C997',
    destructive1: '#FF6B6B',
    destructive2: '#FF8787',
    button_text: '#FFFFFF',

    slight_layer: 'rgba(0,0,0,0.05)',
    opaque_layer: 'rgba(249,249,249,0.85)',
  },
  dark: {
    bg_page1: '#121212',
    bg_page2: '#121212',
    bg_element1: '#1E1E1E',
    bg_element2: '#1E1E1E',
    bg_element3: '#252525',
    bg_element4: '#2E2E2E',
    bg_element5: '#F1F3F5',
    bg_element6: '#F8F9FA',
    text1: '#ECECEC',
    text2: '#D9D9D9',
    text3: '#ACACAC',
    text4: '#595959',
    border1: '#E0E0E0',
    border2: '#A0A0A0',
    border3: '#4D4D4D',
    border4: '#2A2A2A',
    primary1: '#96F2D7',
    primary2: '#63E6BE',
    destructive1: '#FFC9C9',
    destructive2: '#FFA8A8',
    button_text: '#121212',

    slight_layer: 'rgba(255,255,255,0.05)',
    opaque_layer: 'rgba(0, 0, 0, 0.85)',
  },
};

const buildCssVariables = (variables: ThemeVariables) => {
  const keys = Object.keys(variables) as (keyof ThemeVariables)[];
  return keys.reduce(
    (acc, key) =>
      acc.concat(`--${key.replace(/_/, '-')}: ${variables[key]};`, '\n'),
    '',
  );
};

export const themes = {
  light: buildCssVariables(themeVariableSets.light),
  dark: buildCssVariables(themeVariableSets.dark),
};

const cssVar = (name: string) => `var(--${name.replace(/_/, '-')})`;

const variableKeys = Object.keys(themeVariableSets.light) as VariableKey[];

export const themedPalette: Record<VariableKey, string> = variableKeys.reduce(
  (acc, current) => {
    acc[current] = cssVar(current);
    return acc;
  },
  {} as ThemedPalette,
);
