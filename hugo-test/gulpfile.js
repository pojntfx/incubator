"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const { spawn } = require("child_process");
const handler = require("serve-handler");
const http = require("http");

// Compile SASS
gulp.task("sass", function() {
  return gulp
    .src("./assets/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./public/css/"));
});

// Watch ./assets/scss for changes and compile SASS when necessary
gulp.task("sass:watch", function() {
  gulp.watch("./assets/scss/**/*.scss", ["sass"]);
});

// Generate the site
gulp.task("hugo", function() {
  const hugo = spawn("hugo");

  hugo.stdout.on("data", data => {
    console.log(`stdout: ${data}`);
  });

  hugo.stderr.on("data", data => {
    console.log(`stderr: ${data}`);
  });

  hugo.on("close", code => {
    console.log(`child process exited with code ${code}`);
  });
});

// Watch this directory for changes, compile site and refresh page when necessary
gulp.task("hugo:watch", function() {
  const hugo = spawn("hugo", ["server", "-D"]);

  hugo.stdout.on("data", data => {
    console.log(`stdout: ${data}`);
  });

  hugo.stderr.on("data", data => {
    console.log(`stderr: ${data}`);
  });

  hugo.on("close", code => {
    console.log(`child process exited with code ${code}`);
  });
});

// Serve the compiled site
gulp.task("serve", function() {
  const server = http.createServer((request, response) => {
    return handler(request, response);
  });

  server.listen(5000, () => {
    console.log("Running at http://localhost:5000");
  });
});

// Watch SASS and the rest of the site, start development server
gulp.task("dev", function() {
  gulp.start("sass:watch", "hugo:watch");
});

// Compile SASS and the rest of the site
gulp.task("build", function() {
  gulp.start("sass", "hugo");
});

// Compile SASS and the rest of the site, start production server
gulp.task("start", function() {
  gulp.start("build", "serve");
});
