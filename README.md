# Базовый шаблон проекта на Gulp

Пример шаблона для начала работ над frontend проектами

## Перед началом работы

Для работы шаблона необходимо установить `nodejs` (вместе с `npm`)

- [Установка Nodejs](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager "Installing Node.js via package manager")

## Установка шаблона

``` sh
$ git clone https://github.com/bcherepakha/gulp-default.git project-name
$ cd project-name
$ npm install
```

По окончанию выполнения будут установлены все необходимые пакеты.

### Задачи Gulp

 - `$ gulp html` - сборка страниц
 - `$ gulp js` - сборка JS
 - `$ gulp less` - компилиция LESS
 - `$ gulp clean` - очистка каталога `build/`
 - `$ gulp webserver` - запуск локального веб-сервера для livereload
 - `$ gulp build` - полная сборка проекта
 - `$ gulp watch` - запуск задачи `webserver` и отслеживания изменений
 - `$ gulp default` - запуск задачи `watch`

## Общая концепция

- `src/` - каталог для размещения рабочих файлов (html, less, js, изображения)
- `src/blocks` - блоки из которых собирается проект
- `src/layouts` - layouts страниц
- `src/pages` - страницы
- `build/` - каталог для размещения готовой верстки

Вся работа осуществляется в каталоге `src/`.

### Livereload и синхронизация между браузерами

Задача `$ gulp webserver`

При выполнении задачи запускается локальный веб-сервер BrowserSync и открыватся index.html проекта.  

[Подробнее о BrowserSync](http://www.browsersync.io/ "Подробнее о BrowserSync")  

Сервер использует каталог `build/` в качестве корня проекта.

### Отслеживание изменений

Задача `$ gulp watch`

При запуске сначала выполняется задача `$ gulp webserver`, затем при изменении или добавлении в каталоге `src/` каких  
либо файлов, автоматически запускается соответсвующая задача по их обработке.
