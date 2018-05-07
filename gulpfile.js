var
    gulp = require('gulp'),
    plugin = require('gulp-load-plugins')(),
    pngquant = require('imagemin-pngquant'),
    browserSync = require('browser-sync');

gulp.task('sync', function() {
    browserSync({
        server: {
            baseDir: 'dist'
        }
    });
});

// Stylus
gulp.task('stylus', function () {
    return gulp.src(['src/styl/*.styl', '!src/styl/_*.styl'])
        .pipe(plugin.sourcemaps.init())
        .pipe(plugin.stylus().on("error", plugin.notify.onError("*** STYLUS ***: <%= error.message %>")))
        .pipe(plugin.autoprefixer({browsers: ['last 10 versions'], cascade: false}))
        .pipe(plugin.concat('app.css'))
        .pipe(plugin.sourcemaps.write('../css'))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Pug
gulp.task('pug', function () {
    return gulp.src('src/pug/pages/*.pug')
        .pipe(plugin.pug({pretty: true})).on("error", plugin.notify.onError("*** PUG ***: <%= error.message %>"))
        .pipe(gulp.dest('dist'));
});

// JavaScript
gulp.task('appjs', function() {
    return gulp.src([
            'src/js/*.js'
        ])
        .pipe(plugin.sourcemaps.init())
        .pipe(plugin.concat('app.js'))
        .pipe(plugin.sourcemaps.write('../css'))
        .pipe(gulp.dest('dist/assets/js'));
});

// JS libs
gulp.task('scripts', function() {
    return gulp.src([
            'src/libs/svg4everybody/svg4everybody.min.js',
            'src/libs/input-mask/inputmask.dependencyLib.js',
            'src/libs/input-mask/inputmask.js',
            'src/libs/validate/validate.min.js',
            'src/libs/serialize/serialize.min.js',
            'src/libs/tiny-slider/tiny-slider.js',
            'src/libs/zenscroll/zenscroll-min.js',
            'src/libs/vanillamodal/vanillamodal.js',
            'src/libs/headroom/headroom.min.js'
        ])
        .pipe(plugin.concat('libs.min.js'))
        .pipe(gulp.dest('dist/assets/js'));
});

// CSS libs
gulp.task('csslibs', ['stylus'], function() {
  return gulp.src([
          'src/libs/normalize-css/normalize.css',
          'src/libs/tiny-slider/tiny-slider.css',
          'src/libs/vanillamodal/modal.css'
      ])
        .pipe(plugin.csso())
        .pipe(plugin.concat('libs.min.css'))
        .pipe(gulp.dest('dist/assets/css'));
});

// Reload
gulp.task('reload:pug', ['pug'], function (done) {
    browserSync.reload();
    done();
});
gulp.task('reload:js', ['appjs'], function (done) {
    browserSync.reload();
    done();
});
gulp.task('reload:vendor', ['csslibs', 'scripts'], function (done) {
  browserSync.reload();
  done();
});

gulp.task('fonts', function() {
    return gulp.src('src/assets/fonts/**/*')
        .pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('favicons', function() {
    return gulp.src('src/assets/favicons/**/*')
        .pipe(gulp.dest('dist/assets/favicons'));
});

gulp.task('img', function() {
    return gulp.src('src/assets/img/**/*')
        .pipe(plugin.cache(plugin.image({
            zopflipng: false
        })))
        .pipe(gulp.dest('dist/assets/img'));
});

gulp.task('svg', function () {
    return gulp.src('src/assets/img/icons/**/*.svg')
        .pipe(plugin.svgmin({
            plugins: [{
                removeAttrs: {
                    attrs: '(fill|stroke)'
                }
            }]
        }))
        .pipe(plugin.svgSprite({
            mode : {
                symbol: {
                    sprite: 'sprite.svg', // имя файла
                    bust: false, // отключаем хэш в имени файла
                    dest: '', // отключаем файловую струтуру (по умолчанию, создаем в папке gulp.dest)
            }
          }
        }))
        .pipe(gulp.dest('dist/assets/img'));
});

// Watch
gulp.task('watch', ['csslibs', 'scripts', 'appjs', 'pug', 'stylus', 'img', 'svg', 'fonts', 'favicons', 'sync'], function() {

    gulp.watch("src/js/*.js", ['reload:js']);
    gulp.watch("src/styl/**/*.styl", ['stylus']);
    gulp.watch("src/pug/**/*.pug", ['reload:pug']);
});


gulp.task('clean', function() {
    return del.sync(['dist']);
});

gulp.task('build', ['img', 'svg', 'fonts', 'pug', 'stylus', 'scripts', 'csslibs', 'appjs']);

gulp.task('default', ['watch']);