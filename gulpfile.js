var gulp = require("gulp");
var babel = require("gulp-babel");
var browserify = require("browserify");
var babelify = require("babelify");
var source = require('vinyl-source-stream');

gulp.task('compile', function(){
    return gulp.src("application/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("compiled"));
});

gulp.task('modules', function() {
    browserify({
       entries: './compiled/app.js',
       debug: true
   })
   .transform(babelify)
   .bundle()
   .pipe(source('application.js'))
   .pipe(gulp.dest('bundle'));
});

gulp.task("default", ['compile', 'modules']);