var gulp = require('gulp')
var cleanCSS = require('gulp-clean-css')
var htmlmin = require('gulp-htmlmin')
var htmlclean = require('gulp-htmlclean')
var imagemin = require('gulp-imagemin')
// tester (如果使用tester,把下面4行前面的//去掉)
var uglifyjs = require('terser')
var composer = require('gulp-uglify/composer')
var pump = require('pump')
var minify = composer(uglifyjs, console)

// babel (如果不是使用bebel,把下面两行註释掉)
// var uglify = require('gulp-uglify')
// var babel = require('gulp-babel')

// minify js - babel（ 如果不是使用bebel,把下面註释掉）
// gulp.task('compress', () =>
// gulp.src(['./public/**/*.js', '!./public/**/*.min.js'])
// .pipe(babel({
// presets: ['@babel/preset-env']
// }))
// .pipe(uglify().on('error', function (e) {
// console.log(e)
// }))
// .pipe(gulp.dest('./public'))
// )

// minify js - tester (如果使用tester,把下面前面的//去掉)
gulp.task('compress', function (cb) {
    var options = {}
    pump([
        gulp.src(['./public/**/*.js', '!./public/**/*.min.js']),
        minify(options),
        gulp.dest('./public')
    ],
        cb
    )
})

// css
gulp.task('minify-css', () => {
    return gulp.src('./public/**/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('./public'))
})

// 压缩 public 目录内 html
gulp.task('minify-html', () => {
    return gulp.src('./public/**/*.html')
        .pipe(htmlclean())
        .pipe(htmlmin({
            removeComments: true, // 清除 HTML 註释
            collapseWhitespace: true, // 压缩 HTML
            collapseBooleanAttributes: true, // 省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true, // 删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true, // 删除 <script> 的 type="text/javascript"
            removeStyleLinkTypeAttributes: true, // 删除 <style> 和 <link> 的 type="text/css"
            minifyJS: true, // 压缩页面 JS
            minifyCSS: true, // 压缩页面 CSS
            minifyURLs: true
        }))
        .pipe(gulp.dest('./public'))
})

// 压缩 public/uploads 目录内图片
gulp.task('minify-images', async () => {
    gulp.src('./public/img/**/*.*')
        .pipe(imagemin({
            optimizationLevel: 5, // 类型：Number  预设：3  取值範围：0-7（优化等级）
            progressive: true, // 类型：Boolean 预设：false 无失真压缩jpg图片
            interlaced: false, // 类型：Boolean 预设：false 隔行扫描gif进行渲染
            multipass: false // 类型：Boolean 预设：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('./public/img'))
})

// 执行 gulp 命令时执行的任务
gulp.task('default', gulp.parallel(
    'compress', 'minify-css', 'minify-html', 'minify-images'
))