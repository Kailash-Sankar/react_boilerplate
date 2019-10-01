# react_boilerplate

React app boilerplate with essential tools and configurations.

## Setup

- Webpack configuration
  - setup as - common, prod and dev configurations
  - parsing for js/jsx
  - parsing for css/less
    - autoprefixer
    - CSS modules for locally scoped styles
  - hot reloading for js and css
  - chunk by app/vendors for css and js
  - minimizer for css and js
  - base html template
- Babel
- ESLint
- NPM scripts
  - start: dev server
  - build: production build with report
  - test, test:watch, test:coverage
  - lint-check, lint-fix
  - scan: runs npm audit for vulnerability check and npm oudated for listing outdated dependencies
  - comply, comply:prod for dependency license check
- Folder structure example
- Pre commit hook for lint check/fix
- Jest and Enzyme for tests

## Notes

    * Name CSS modules as [name].module.less (or css). All other files will be treated as global css.
    * use --no-verify to bypass eslint enforcement
