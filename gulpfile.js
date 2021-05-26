const { src, dest } = require("gulp")
const gulp = require("gulp")
const browsersync = require("browser-sync")
const fileinclude = require("gulp-file-include")

let dist = "dist"
let source = "src"

let path = {
  build: {
    html: dist + "/",
    css: dist + "/css/",
    js: dist + "/js/",
    img: dist + "/img/",
    fonts: dist + "/fonts/"
  },
  source: {
    html: source + "/*.html",
    css: source + "/scss/style.scss",
    js: source + "/js/script.js",
    img: source + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    fonts: source + "/fonts/*.ttf"
  },
  watch: {
    html: source + "/**/*.html",
    css: source + "/scss/**/*.scss",
    js: source + "/js/**/*.js",
    img: source + "/img/**/*.{jpg,png,svg,gif,ico,webp}"
  },
  clean: "./" + dist + "/"
}

function browserSync() {
  browsersync.init({
    server: {
      baseDir: "./" + dist + "/"
    },
    port: 3000,
    notify: false
  })
}

function html() {
  return src(path.source.html)
    .pipe(
      fileinclude({
        prefix: "@@"
      })
    )
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}

function watchFiles() {
  gulp.watch([path.watch.html], html)
}

let build = gulp.series(html)
let watch = gulp.parallel(build, watchFiles, browserSync)

exports.html = html
exports.build = build
exports.watch = watch
exports.default = watch
