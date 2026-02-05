# Example Storybook Project

To run the project. 

```bash
docker-compose up
```

To build the project
```
npm run build-storybook
```

### Organization

There are two places to put CSS.  Global styles go in the public/styles folder. Module styles stay in the individual `.astro` file for their module.

#### Global Styles

Global styles go in the `public` folder and are organized into the following files:

- `main.css`
- `text.css` includes headings, body, labels, etc.
  - `heading-1` through `heading-6` all includes styles for the three breakpoints.
- `font-faces.css` has `@font-face` rules for using Poppins. Currently we directly use scripts from Google Fonts in Layout.astro.

#### Module Styles

Module styles go into a `<style>` block at the bottom of the `.astro` file that contains the corresponding component.

An `.astro` file looks like this:

```astro
---
// TypeScript/JavaScript code goes here.  Use JavaScript for Hubspot compatibility.
---

<!-- HTML markup goes here -->

<style>
/* Styles for this component go here */
</style>
```
