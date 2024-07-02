/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var gulp = require('gulp');

var imagemin = require('gulp-imagemin');

gulp.task('imgMin', function () {
    // place code for your default task here   
            gulp.src('src/images/*')
            .pipe(imagemin())
            .pipe(gulp.dest('dist/images'));
});

gulp.task('default', function(){
    
});
