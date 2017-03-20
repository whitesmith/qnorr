# Quickie
It will be a fully modular webstarter kit, for creating & deploying static website/webapps.  
Right now is just a non-modular starter kit, but we'll get there. 


### Requirements
1. A computer.
1. Node `>=v6.10.0`.
1. Gulp.

### Setup
1. Install `node.js >=v6.10.0, (we suggest [nvm](https://github.com/creationix/nvm) to manage your node versions)
1. Install [Gulp.js](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) `npm install --global gulp-cli`
1. Install dependencies `npm install`

### Usage
1. Clone this repo into your desired project folder
1. `npm start` or `npm run dev` or `gulp` to start development environment 
1. `npm run production` to start production environment 
1. `npm run build` to build a production environment folder

### Deploy
At the moment, only GitHub pages are supported to host your site/app. Maybe it makes sense to support other free platforms like [Now.sh](https://zeit.co/now) in a near future.

1. `npm run deploy` will do all the magic. It assumes your current git repo as the destination. 

Already bought a domain? 👌

1. Add it to CNAME in the `src/CNAME` file. 
1. Config your domain register service to point to githubPages. Here's how to do it on [NameCheap](https://www.namecheap.com/support/knowledgebase/article.aspx/9645/2208/how-do-i-link-my-domain-to-github-pages);
1. Deploy it again

### Documentation
In future quick overview guides will be created for some specific packages (Templating, CriticalCSS to name a few), in the meantime refer to packages own docs `/shrug`

### Features

| Feature                                      | Summary                                                                                                                                                              |
|----------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Responsive boilerplate                       | Inherits all the *good parts* of your also good ol'friend [Sassqit](https://github.com/whitesmith/sassqit) aligned with current Whitesmith Best Practivces |
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
To all open-source packages listed on `package.json` (we'll put a comprehensive list here soon), [`inuitcss`](https://github.com/inuitcss/inuitcss) for the ongoing css inspiration which is the foundation of this kit and [Google web starter kit](https://github.com/google/web-starter-kit) which inspired the creation of this project.
