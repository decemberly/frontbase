# Introduction

This style guide provide design guidelines and code to help you quickly create trustworthy, accessible, and consistent digital services.

## Purpose of the style guide:
* to document and get an overview of all components
* to create a consistent use of the style elements
* to encourage and facilitate code and design reuse
* to help the team finding a common languange and bridge gaps between design and development

## Getting started

### Technical requirements
* NPM

### Installation
Run `npm install` in terminal.

### Building assets
* Run `npm run build` to build project once.
* Run `npm run watch` to watch for code changes and open up the styleguide in the browser.
* Run `npm run styleguide-colors` to regenerate the style guide template for colors (only needed when you changed color settings).

---

# Developer guide

## Technologies used
* Sass
* [KSS](https://github.com/kneath/kss)
* [Webpack](https://webpack.js.org/)
* [PostCSS](http://postcss.org/)
    * Autoprefixer - you don't need to vendor prefix css properties
    * Pxtorem - it's ok to write font-sizes, widths and so on in px, it will be recalculated to rem

## Markup coding style

Generally, we want:

* validated, **semantically correct** HTML (don't use `<a>` where `<button>` is more appropriate);
* everything should be **keyboard and screen reader accessible**, if not: provide alternative;
* progressive enhancement ftw.

## CSS coding style
Before continuing, you should have a general understanding for specificity, the [SCSS syntax](http://sass-lang.com/), and [KSS documentation](https://github.com/kneath/kss).

We are inspired by, and mostly following [Sass Guidelines](http://sass-guidelin.es/) by [Hugo Giraudel](http://hugogiraudel.com/).

### Syntax and formatting

Generally, we want:

* two (2) spaces indents, no tabs;
* ideally, 80-characters wide lines;
* properly written multi-line CSS rules;
* meaningful use of whitespace;
* strings and urls should always be wrapped with single quotes;
* all elements should have a class, don't use bare, unclassed HTML elements if you can avoid it;
* avoid nesting when possible, don't nest more than 3 levels;
* the order of css declarations should be the following:
    * extends: `@extend %button;` ([should be avoided](https://csswizardry.com/2016/02/mixins-better-for-performance/))
    * includes without block: `@include transition;`
    * regular declarations in no particular order, or sorted logically by [csscomb](http://csscomb.com/) as configured in `.csscomb.json`.
    * includes with blocks:
    ```css
    @include respond-to('large') {
        position: relative;
    }
    ```

### Naming conventions
We use [BEVM](http://webuild.envato.com/blog/chainable-bem-modifiers/), an extension of [BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) with [namespaces](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/) and [BEMIT](http://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/) to make the css both readable and modular.

#### BEVM
Example of BEVM:

    .block {}
    .block__element {}
    .block--variant {}
    .block__element--variant {}
    .block--variant.-modifier {}

#### Namespaces
We use the following namespaces:

* Object (`o-`)
* Component (`c-`)
* Utility, also known as helper or trump (`u-`)
* State-based (`is-` or `has-`)
* Hack (`_`)
* JavaScript (`js-`)
* KSS, only used in style guide (`kss-`)

[More detailed introduction to these namespaces.](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/#the-namespaces)

#### BEVM & namespaces
Example of BEVM with namespaces:

    .c-block {}
    .c-block.-modifier {}
    .c-block__element {}
    .c-block--variant {}
    .c-block__element--variant {}
    .c-block--variant.-modifier {}
    .c-block--variant.is-open {}
    .c-block.js-accordion {}

#### Responsive Suffixes
Example of BEVM with namespaces and responsive suffixes:

    .o-object\@xlarge {}

#### Single class vs multiple classes
We use single classes as 'variations' and multiple classes as 'chainable modifiers'. We never use both 'block'-class (`c-block`) and 'variant'-classes (`c-block--variant`) on the same element. If it has a variation, use only that class.

## CSS Architecture
The CSS architecture is based on [Inverted Triangle CSS](http://www.creativebloq.com/web-design/manage-large-scale-web-projects-new-css-architecture-itcss-41514731)
by [Harry Roberts](https://twitter.com/csswizardry/).
It is layer-based architecture that goes from generic css to explicit,
low specificity to high specificity.

### Settings
This holds all global settings that need to be accessed from anywhere.
Examples of settings: font-families, color palettes, configurations.

### Tools
Tools are globally available tools like mixins and functions.
Tools that does not need accessing globally belongs in
the partial to which it relates.
Examples of tools: font-sizing mixins, breakpoint mixins.

### Generic
This is the first layer that actually produces css.
Here you can find very high-level, far reaching styles.
This layer is rarely modified and you' won't find any classes here.
Examples: resets, sanitize.

### Elements
These are bare, unclassed HTML elements,
slightly more specific than the generic layer.
What does a blockquote look like without classes?
This is the last layer you'll find bare, element-based selectors.
Examples: h1, blockquote, ul, image.

### Objects
This is the first layer in which we find class-based selectors.
These are concerned with styling non-cosmetic design patterns, or "objects".
Examples: wrappers, grids.
**Prefixed with o-**

### Vendor
Vendor libraries.
Can be overriden by components when needed.

### Components
This layers holds the cosmetic design patterns. This is where most of the
work will happen.
Examples: icons, menus, pagination.
**Prefixed with c-**

### Trumps
This layers beats all other layers.
It contains utility and helper classes, hacks and overrides.
**Prefixed with u-**

### Commenting
We use [KSS](https://github.com/kneath/kss) for commenting css, and generating documentation.

### SassDoc
We use [SassDoc](http://sassdoc.com/) for commenting and generating sass-specific documentation, like mixins and variables. These are not included here. **The SassDoc comments are inline with three slashes (///)**.

Example:

    /// Font size in em.
    /// @param {Number} $target-px - The font-size in pixels you want
    /// @param {Number} $context [$root-font-size] - The font-size of the context you are in
    @function pxtoem($target-px, $context: $root-font-size) {
      @return $target-px / $context * 1em;
    }
