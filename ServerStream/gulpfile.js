var gulp = require("gulp");
var babel = require("gulp-babel");
const rename = require("gulp-rename");
const webpack = require("webpack-stream");
var ts = require('gulp-typescript');
const minify = require("gulp-babel-minify");
const files = ["maino.js"];
function html() {
    return gulp.src('views/index.html').pipe(htmlmin({ collapseWhitespace: true })).pipe(rename("indexo.html")).pipe(gulp.dest('views'));
}
function client ()  {
    return gulp.src("static/main.js")
        .pipe(webpack({
            mode: "production"
        }))
        .pipe(babel())
        .pipe(minify({
            mangle: {
                keepClassName: false
            }
        }))
        .pipe(rename(files[0]))
        .pipe(gulp.dest("static"));
}

function server() {
    return gulp.src("app.ts")
        .pipe(ts({
            noImplicitAny: true,
            outFile: 'app.js'
        }))
        .pipe(gulp.dest("."));
}
exports.client = gulp.parallel(client, html);
exports.server = server;
exports.default = gulp.parallel(client, server,html);