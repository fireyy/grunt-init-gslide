'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    connect: {
      server: {
        options: {
          port: process.env.PORT || 8000
        }
      }
    },
    sass: {
      compile: {
        options: {
          style: "compressed",
          compass: true
        },
        files: {
          "theme/css/default.css": "theme/scss/default.scss",
          "theme/css/phone.css": "theme/scss/phone.scss"
        }
      }
    },
    watch: {
      scripts: {
        files: ["theme/scss/**/*.scss"],
        tasks: ["sass:compile"],
        options: {
          nospawn: false
        }
      }
    }
  });
  this.registerTask("open", function() {
    var port = grunt.config("connect").server.options.port;
 
    grunt.util.spawn({
      cmd: require("os").platform() === "darwin" ? "open" : "xdg-open",
      args: ["http://localhost:" + port + "/template.html"]
    }, function() {});
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-sass");

  // Default task.
  grunt.registerTask("serve", ["open", "connect:server", "watch"]);

};