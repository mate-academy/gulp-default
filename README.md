# Base template for Gulp

Template to start from before starting frontend projects.

## Before you start

Install `nodejs` (it includes `npm`)

- [Nodejs installation](https://nodejs.org/en/download/package-manager/)

## Install template

``` sh
$ git clone https://github.com/mate-academy/gulp-default.git project-name
$ cd project-name
$ npm install
```

All packages will be installed after executing the script above. пакеты.

## Build the project

``` sh
$ gulp build
```

## Development mode 

``` sh
$ gulp watch
```

### Gulp tasks

 - `$ gulp html` - compile pages
 - `$ gulp js` - compile JS
 - `$ gulp less` - compile LESS
 - `$ gulp clean` - clean `build/` directory
 - `$ gulp webserver` - start local web server with livereload
 - `$ gulp build` - full project compilation
 - `$ gulp watch` - start `webserver` and watch for changes
 - `$ gulp default` - start `watch` task

## Project structure

- `src/` - directory for html, less, js, image files
- `src/blocks` - project building blocks
- `src/layouts` - page layouts
- `src/pages` - individual pages
- `build/` - directory for built pages

You should be writing code in `src/` directory.

### Livereload and syncronization with browsers

Task `$ gulp webserver`

When task is executed, gulp starts local web server BrowserSync and opens index.html.  

[About BrowserSync](http://www.browsersync.io/)  

Server uses `build/` as a project root.

### Watching changes

Task `$ gulp watch`

When task starts task `$ gulp webserver` is exectured. When files within `src/` changes automatically task to process file is executed.
