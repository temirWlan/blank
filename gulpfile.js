const gulp = require("gulp");
const webpack = require("webpack-stream");
const browsersync = require("browser-sync");
const htmlmin = require("gulp-htmlmin");
const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const sourcemaps   = require("gulp-sourcemaps");
const imagemin = require("gulp-imagemin");
const del          = require("del");
const config = require('./webpack.config');

const src = "./app"
const dest = "./build";
const path = {
	src: {
		html: `${src}/index.html`,
		images: `${src}/assets/images/**/*.*`,
		icons: `${src}/assets/icons/**/*.*`,
		fonts: `${src}/assets/fonts/**/*.*`,
		styles: `${src}/assets/scss/style.scss`,
		js: `${src}/assets/js/main.js`
	},
	build: {
		html: `${dest}`,
		images: `${dest}/assets/images`,
		icons: `${dest}/assets/icons`,
		fonts: `${dest}/assets/fonts`,
		css: `${dest}/assets/css`,
		js: `${dest}/assets/js`
	},
	watch: {
		html: `${src}/index.html`,
		images: `${src}/assets/images/**/*.*`,
		icons: `${src}/assets/icons/**/*.*`,
		fonts: `${src}/assets/fonts/**/*.*`,
		styles: `${src}/assets/scss/**/*.scss`,
		js: `${src}/assets/js/**/*.js`
	}
};


function clean() {
	return del(dest);
}

function copyHtml() {
	return gulp.src(path.src.html)
					.pipe(htmlmin({ collapseWhitespace: true }))
               .pipe(gulp.dest(path.build.html))
               .pipe(browsersync.stream());
}

function copyImages() {
	return gulp.src(path.src.images)
               .pipe(imagemin({
                  progressive: true, 
                  svgoPlugins: [{ removeViewBox: false }],
                  interlaced: true,
                  optimazationLevel: 3
               }))
               .pipe(gulp.dest(path.build.images))
               .on("end", browsersync.reload);
}

function copyIcons() {
	return gulp.src(path.src.icons)
               .pipe(imagemin({
                  progressive: true, 
                  svgoPlugins: [{ removeViewBox: false }],
                  interlaced: true,
                  optimazationLevel: 3
               }))
               .pipe(gulp.dest(path.build.icons))
               .on("end", browsersync.reload);
}

function copyFonts() {
	return gulp.src(path.src.fonts)
               .pipe(gulp.dest(path.build.fonts))
               .on("end", browsersync.reload);
}


function buildStyles() {
	return gulp.src(path.src.styles)
   				.pipe(sourcemaps.init())                                                     
   				.pipe(concat("main.scss"))                                                              
   				.pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))     
   				.pipe(autoprefixer({                                                                       
      				overrideBrowserslist: ["last 8 versions"],                              
        				cascade: false
   				}))
   				.pipe(rename({suffix: ".min"}))                                                     
   				.pipe(sourcemaps.write("./"))                                                           
   				.pipe(gulp.dest(path.build.css))                                                    
   				.on("end", browsersync.reload);   
}

function buildJs() {
	return gulp.src(path.src.js)
               .pipe(webpack(config))
               .pipe(gulp.dest(path.build.js))
               .on("end", browsersync.reload);
}

// service tasks
function watch() {
	browsersync.init({
		server: "./build",
		port: 5000,
		notify: true
   });

   gulp.watch(path.watch.html, copyHtml);
   gulp.watch(path.watch.images, copyImages);
   gulp.watch(path.watch.icons, copyIcons);
   gulp.watch(path.watch.fonts, copyFonts);
   gulp.watch(path.watch.styles, buildStyles);  
   gulp.watch(path.watch.js, buildJs);
}


function build(done) {
	gulp.series(clean, gulp.parallel(copyHtml, copyImages, copyIcons, copyFonts, buildStyles, buildJs))(done);
}

gulp.task("default", gulp.parallel(watch, build));

exports = {
	clean,
	copyHtml,
	copyImages,
	copyIcons,
	copyFonts,
	buildStyles,
	buildJs,
	watch,
	build
};
