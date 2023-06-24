import { Config } from 'tailwindcss';
import defaultConfig from 'tailwindcss/defaultConfig';
import plugin from 'tailwindcss/plugin';
import resolveConfig from 'tailwindcss/resolveConfig';

interface Options {
  baseFontSize?: number;
}

type ThemeConfig = Config['theme'];
type ResolvedConfig = ReturnType<typeof resolveConfig>;

const DEFAULT_BASE_FONT_SIZE = 10;

export = plugin.withOptions<Options>(
  ({ baseFontSize = DEFAULT_BASE_FONT_SIZE } = {}) => {
    return ({ addBase }) => {
      addBase({
        html: {
          fontSize: `${baseFontSize}px`,
        },
      });
    };
  },
  ({ baseFontSize = DEFAULT_BASE_FONT_SIZE } = {}) => {
    const config = resolveConfig(defaultConfig);

    const updatedTheme = getUpdatedTheme(config, baseFontSize);

    return {
      theme: {
        extend: { ...updatedTheme },
      },
    };
  }
);

function getUpdatedTheme(config: ResolvedConfig, baseFontSize: number): ThemeConfig {
  if (!config.theme) return;

  const updatedTheme: ThemeConfig = {};

  for (const [key, value] of Object.entries(config.theme)) {
    if (typeof value === 'object' && value !== null) {
      const updatedProperty = getUpdatedRemValues(value, baseFontSize);

      if (hasRemValue(updatedProperty)) {
        updatedTheme[key] = updatedProperty;
      }
    }
  }

  return updatedTheme;
}

function getUpdatedRemValues(value: any, baseFontSize: number): any {
  if (typeof value === 'string') {
    if (value.endsWith('rem')) {
      const numericValue = parseFloat(value);
      return `${(numericValue * 16) / baseFontSize}rem`;
    } else {
      return value;
    }
  } else if (Array.isArray(value)) {
    const updatedArray: any[] = [];
    for (const item of value) {
      const updatedItem = getUpdatedRemValues(item, baseFontSize);
      if (updatedItem !== null) {
        updatedArray.push(updatedItem);
      }
    }
    return updatedArray.length > 0 ? updatedArray : null;
  } else if (typeof value === 'object' && value !== null) {
    const updatedObject: { [key: string]: any } = {};
    for (const [key, nestedValue] of Object.entries(value)) {
      const updatedValue = getUpdatedRemValues(nestedValue, baseFontSize);
      if (updatedValue !== null) {
        updatedObject[key] = updatedValue;
      }
    }
    return Object.keys(updatedObject).length > 0 ? updatedObject : null;
  } else {
    return null;
  }
}

function hasRemValue(obj: any): boolean {
  if (typeof obj === 'string') {
    return obj.endsWith('rem');
  } else if (Array.isArray(obj)) {
    return obj.some(hasRemValue);
  } else if (typeof obj === 'object' && obj !== null) {
    return Object.values(obj).some(hasRemValue);
  } else {
    return false;
  }
}
