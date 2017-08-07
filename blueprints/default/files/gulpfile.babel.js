import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import panini from 'panini';
import BrowserSync from 'browser-sync';
import {output as pagespeed} from 'psi';
import pkg from './package.json';
import critical from 'critical';
import rollup from 'rollup-stream';
import nodeResolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'gulp-sourcemaps';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

const criticalStream =  critical.stream;
const browserSync = BrowserSync.create();
const $ = gulpLoadPlugins();
const productionEnv = $.util.env.env === 'production';

const paths = {
  appRoot: {
    src: 'src/',
    dest: 'dist/'
  },
  styles: {
    manifesto: 'src/stylesheets/application.scss',
    src:  'src/stylesheets/**/*.{scss, sass}',
    dest: 'dist/stylesheets'
  },
  scripts: {
    manifesto: 'src/scripts/index.js',
    src:  'src/scripts/**/*.{js, coffee}',
    dest: 'dist/scripts/'
  },
  images: {
    src:  'src/assets/images/**/*.{jpg,jpeg,png,gif,webp}',
    vectors: 'src/assets/images/**/*.svg',
    dest: 'dist/assets/images/'
  },
  fonts: {
    src:  'src/assets/fonts/**/{*.woff, *.woff2}',
    dest: 'dist/assets/fonts/'
  },
  views: {
    src: 'src/views/',
    dest: 'dist/'
  }
};

/*Utilities*/
// Run PageSpeed Insights
export function runPageSpeedInsights(done){
  console.log(pkg.homepage)
  pagespeed(pkg.homepage, {
      strategy: 'mobile'
      // By default we use the PageSpeed Insights free (no API key) tier.
      // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
      // key: 'YOUR_API_KEY'
  })
  done()
}
export function handleError(task) {
  return function (err) {

    $.notify.onError({
      message: task + ' failed, check the logs..',
      sound: true
    })(err);

    $.util.log($.util.colors.bgRed(task + ' error:'), $.util.colors.red(err));
    this.emit('end');
  };
};

/*
 * For small tasks you can use arrow functions and export
 */
const clean = (done) => del([ paths.appRoot.dest ], done);
export { clean }

// export function clean(done) {
//  del([ paths.appRoot.dest ])
//  done()
// }

/*Copy Common App RootFiles */
export function copyRootFiles() {
  return gulp.src([paths.appRoot.src + '/*.*', paths.appRoot.src + '/CNAME'], {since: gulp.lastRun('copyRootFiles'), dot: true})
    .pipe(gulp.dest(paths.appRoot.dest));
}

/*
 * Copy & Optimize static assets
 */
export function images() {
  return gulp.src(paths.images.src, {since: gulp.lastRun('images')})
    .pipe($.newer(paths.images.dest))  // pass through newer images only
    .pipe($.imagemin({
      optimizationLevel: 5,
      progressive: true,
      interlaced: true
    }))
    .pipe($.if(productionEnv, $.size({title: $.util.colors.bgRed('[SIZE] Images: ')})))
    .pipe(gulp.dest(paths.images.dest));
}

export function vectors(){
  return gulp.src(paths.images.vectors)
    .pipe(gulp.dest(paths.images.dest));
}
/*Copy paste fonts*/
export function fonts() {
  return gulp.src(paths.fonts.src, {since: gulp.lastRun('fonts')})
    .pipe(gulp.dest(paths.fonts.dest));
}


/*
 * STYESHEETS
 */
export function styles() {
  return gulp.src(paths.styles.manifesto)
    .pipe($.plumber())
    .pipe($.if(!productionEnv, $.sourcemaps.init({
      loadMaps: true
    })))
    .pipe($.sass({
      precision: 10,
      sourceComments: !productionEnv,
      outputStyle: productionEnv ? 'compressed' : 'nested'
    }))
    .on('error', handleError('styles'))
    .pipe($.autoprefixer({
      browsers: [
        'last 2 versions',
        'ie >= 10',
        'android >= 4.4'
      ]
    }))
    .pipe($.if(productionEnv,$.cleanCss()))
    .pipe($.rename({
      basename: 'app'
    }))
    .pipe($.if(productionEnv, $.size({title:  $.util.colors.bgRed('[SIZE] Styles: ')})))
    .pipe($.if(!productionEnv, $.sourcemaps.write({
      includeContent: true,
      sourceRoot: '.'
    })))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.reload({stream: true}))
}

export function scripts() {
  return rollup({
    entry: paths.scripts.manifesto,
    sourceMap: true,
    plugins: [
      $.babel({
        exclude: 'node_modules/**',
        babelrc: false,
        presets: ['es2015-rollup']
      }),
      nodeResolve({ jsnext: true, main: true })
    ]
  })
  .on('error', handleError('rollup'))
  .pipe(source(paths.scripts.manifesto))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe($.if(productionEnv, $.uglify()))
  .on('error', handleError('scripts-uglify'))
  .pipe($.rename('app.js'))
  .pipe(sourcemaps.write('.'))
  .pipe($.if(productionEnv,
    $.size({
      title: $.util.colors.bgRed('[SIZE] Scripts: ')
    })))
  .pipe(gulp.dest(paths.scripts.dest));
}


/*
 * Static sites like a bauss using Panini by Zurb
 *
 * repo: https://github.com/zurb/panini
 */
export function views() {
  return gulp.src(paths.views.src + 'pages/**/*.html' )
    .pipe($.plumber())
    .pipe(panini({
      root: paths.views.src + 'pages/',
      layouts: paths.views.src + 'layouts/',
      partials: paths.views.src + 'partials/**/',
      helpers: paths.views.src + 'helpers/',
      data: paths.views.src + 'data/'
    }))
    .on('error', handleError('views'))
    .pipe(
      $.if (productionEnv,
        $.htmlmin({
          removeComments: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          removeEmptyAttributes: false,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: false,
          removeOptionalTags: true
        })))
    .pipe($.if(productionEnv, $.size({
      title: $.util.colors.bgRed('[SIZE] Views: '),
      showFiles: true
    })))
    .pipe(gulp.dest(paths.views.dest))

}

export function paniniRefresh(done){
  panini.refresh()
  done()
}

export function viewsBuildAndStream() {
  return views()
    .pipe(browserSync.stream())
}

export function paniniRebuild() {
  return gulp.series(
    paniniRefresh,
    viewsBuildAndStream
  );
};


/*
 * Local server using BrowserSync
 */
export function browserSyncServer(done){
  var config = {
      server: {
        baseDir: paths.appRoot.dest,
        serveStaticOptions: {
          extensions: ['html']
        }
      }
  }
  //run TUNNEL=true gulp to start public tunnel url to share.
  if (process.env.TUNNEL === 'true') {
    config.tunnel = "";
  }

  browserSync.init(config);
  done()
}

// Generate & Inline Critical-path CSS
export function criticalCSS(done){
    return gulp.src( paths.views.dest + '*.html')
        .pipe(criticalStream({
            base: 'dist/',
            inline: true,
            css: ['dist/stylesheets/app.css'],
            minify: true,
            dimensions: [{
                  height: 568,
                  width: 320
              }, {
                  height: 800,
                  width: 1200
              }],
            extract: true,

         }))
        .pipe(gulp.dest(paths.views.dest));
};

/*
 * Listen for Changes
 */
export function watch() {
  gulp.watch(paths.images.src,  images);
  gulp.watch(paths.images.vectors, vectors);
  gulp.watch(paths.fonts.src,   fonts);
  gulp.watch(paths.styles.src,  styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.views.src,   paniniRebuild());

  $.util.log($.util.colors.bgGreen('Watching for changes...'));
}


/*
 * Build
 *
 * Create a deployable folder
 */
const build = gulp.series(
  clean,
  gulp.parallel(
    vectors,
    images,
    fonts,
    styles,
    scripts,
    views
  )
);


/*
 * Serve
 *
 * Serve the deployable folder watch for changes and start a dev server
 */
const serve = gulp.series(
  build,
  gulp.parallel(watch, browserSyncServer)
);


/*
 * Deploy To gitHubPages
 *
 * Serve the deployable folder watch for changes and start a dev server
 */

export function githubPages() {
  return gulp.src([paths.appRoot.dest + '**/*.*', paths.appRoot.dest + 'CNAME'])
    .pipe($.ghPages());
}


const deploy = gulp.series(
    build,
    copyRootFiles,
    githubPages
);




/* Export const functions */
export { build, serve, deploy};

/* Default gulp task as serve*/
export default serve;
