# Qnorr
It will be a fully modular webstarter kit, for creating & deploying static website/webapps.  
Right now is just a non-modular starter kit, but we'll get there.


### Requirements
1. A computer.
1. Node `>=v6.10.0` and `npm`.

### Installation

##### From `npm`
```
npm install -g qnorr
```

#####
 Directly [from gitHub](https://stackoverflow.com/questions/17509669/how-to-install-an-npm-package-from-github-directly):
using ssh:
```bash

npm install -g git+ssh://git@github.com:whitesmith/qnorr.git 
```

using https:
```
npm install -g git+https://git@github.com:whitesmith/qnorr.git
```

or directly:
```
npm install -g https://github.com/whitesmith/qnorr
```

### Usage
To get started with a new project, just run `qnorr new <project-name>`. A new folder will be created under `project-name` with the default scaffolding and tools ([see below](#features)) for Qnorr, with git init-ed for you as well.

### Documentation
More documentation regarding deployment/usage can be found in the [README.md](blueprints/default/files/README.md) of your newly created project folder.

In future quick overview guides will be created for some specific packages (Templating, CriticalCSS to name a few), in the meantime refer to packages own docs `/shrug`

### Features

| Feature                                      | Summary                                                                                                                                                              |
|----------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Responsive boilerplate                       | Inherits all the *good parts* of your also good ol'friend [Sassqit](https://github.com/whitesmith/sassqit) aligned with current Whitesmith Best Practices |
| HandleBars Templating                        | Using [`Panini`](https://github.com/zurb/panini) from Zurb.|
| Sass Handling                                | Using `LibSass` with `gulp-sass`|
| Performance optimization                     | Minify and concatenate JavaScript, CSS, HTML and images to help keep your pages lean. |
| [Swiper Slider](http://idangero.us/swiper/)  | By iDangerous, if you need to quickly prototype touch related interactions or simply display a nice responsive carousel |
| [EditorConfig](http://editorconfig.org/)     | Uniform spaces and tabs across text editors. Add it to your texteditor, your teammates will like it.|
| Optional critical path CSS                   | run `npm run criticalCSS` after build. It uses [`loadCSS`](https://github.com/filamentgroup/loadCSS) and `cssPreload.js` polyfill from FilamentGroup |
| Page speed Tests                             | Brought to you by google page speed insights. After deployment run `npm run how_fast`, it will use the domain set as homepage in your `package.json` for the test |


### Roadmap
Take Look at Issues & Board tabs.

### Thanks
To all open-source packages listed on `package.json` (we'll put a comprehensive list here soon), [`inuitcss`](https://github.com/inuitcss/inuitcss) for the ongoing css inspiration which is the foundation of this kit, [Google web starter kit](https://github.com/google/web-starter-kit) which inspired the creation of this project and [`ember-cli`](https://github.com/ember-cli/ember-cli) from which a lot is borrowed on how to make the installer work.
