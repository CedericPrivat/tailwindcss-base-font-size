# tailwindcss-base-font-size

A Tailwind CSS plugin to set the base font size in proportion to Tailwind's default utility values.

## Why Use This Plugin?

The purpose of this plugin is to allow you to easily set the base font size to `10px`, which is equivalent to `1rem`. By doing so, all rem values become easier to read and work with. Setting a base font size of `10px` simplifies calculations with rem values, making it more convenient to use arbitrary values or adding custom theme values.

By using this plugin, you can customize the base font size and ensure that all utility classes in Tailwind CSS retain their relative proportions.

## Installation

Install the plugin from npm:

```sh
npm install tailwindcss-base-font-size
```

Then add the plugin to your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('tailwindcss-base-font-size'),
    // ...
  ],
};
```

## Usage

Customize the base font size by passing an optional baseFontSize parameter to the plugin:

```js
// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('tailwindcss-base-font-size')({
      baseFontSize: 12,
    }),
    // ...
  ],
};
```

The default value is `10`.

## Tailwind CSS IntelliSense Extension

If you are using the Tailwind CSS IntelliSense extension in Visual Studio Code, it's recommended to update your `settings.json` file to ensure that the preview correctly reflects the base font size. Add the following configuration to your `settings.json`:

```js
{
  // ...
  "tailwindCSS.rootFontSize": 10,
}
```

This configuration sets the root font size to `10px`, matching the base font size specified by this plugin. With this setting, the IntelliSense extension will provide accurate and consistent previews for Tailwind CSS utility classes.

## How It Works

The plugin modifies the base font size of your HTML elements and adjusts the values of Tailwind CSS utility classes to maintain their relative sizes.

It adds a CSS rule for the `html` element, setting its font size to the specified `baseFontSize` value.

```css
html: {
  font-size: 10px;
}
```

Additionally, it extends the Tailwind CSS theme by updating the rem values in the theme configuration scaled proportionally with respect to the given `baseFontSize`. This ensures that utility classes like `text-lg`, `p-4`, etc., continue to have the same relative sizes.
