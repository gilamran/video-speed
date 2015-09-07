// Generated on 2015-09-04 using generator-chrome-extension 0.3.1
'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.initConfig({

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      ts: {
        files: ['dev/content_scripts/scripts/{,*/}*.ts'],
        tasks: ['tslint', 'ts']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      icons: {
        files: ['dev/icons/{,*/}*.png'],
        tasks: ['copy:icons']
      },
      manifest: {
        files: ['dev/manifest.json'],
        tasks: ['copy:manifest']
      },
      styles: {
        files: ['dev/content_scripts/styles/{,*/}*.scss'],
        tasks: ['sass:content_scripts']
      }
    },

    // typescript
    ts: {
      content_scripts : {
        out: "app/content_scripts/scripts/video_speed_content_scripts.js",
        src: ["dev/content_scripts/scripts/{,*/}*.ts"],
        options: {
          sourceMap: false
        }
      }
    },

    sass: {
      options: {
        sourceMap: false
      },
      content_scripts: {
        files: [{
          'app/content_scripts/styles/video-speed.css': 'dev/content_scripts/styles/{,*/}*.scss'
        }]
      }
    },

    // tslint
    tslint: {
      options: {
        configuration: grunt.file.readJSON("tslint.json")
      },
      files: {
        src: ["app/ts/{,*/}*.ts"]
      }
    },

    // Empties folders to start fresh
    clean: {
      app: {
        files: [{
          src: [
            'app/**'
          ]
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      manifest: {
        files: [{
          expand: true,
          nonull: true,
          dot: true,
          cwd: 'dev',
          dest: 'app',
          src: [
            '_locales/**',
            'manifest.json'
          ]
        }]
      },
      icons: {
        files: [{
          expand: true,
          nonull: true,
          dot: true,
          cwd: 'dev',
          dest: 'app',
          src: [
            'icons/**'
          ]
        }]
      }
    },

    uglify: {
      content_scripts: {
        files: {
          'app/content_scripts/scripts/video_speed_content_scripts.js': ['app/content_scripts/scripts/video_speed_content_scripts.js']
        }
      }
    },

    // Compres dist files to package
    compress: {
      dist: {
        options: {
          archive: function() {
            var manifest = grunt.file.readJSON('app/manifest.json');
            return 'package/Video Speed-' + manifest.version + '.zip';
          }
        },
        files: [{
          expand: true,
          cwd: 'app/',
          src: ['**', '!**/*.map'],
          dest: ''
        }]
      }
    }
  });

  grunt.registerTask('build', function () {
    grunt.task.run([
      'clean',
      'copy:manifest',
      'copy:icons',
      'sass:content_scripts',
      'tslint',
      'ts'
    ]);
  });


  grunt.registerTask('debug', function () {
    grunt.task.run([
      'build',
      'watch'
    ]);
  });

  grunt.registerTask('package', function () {
    grunt.task.run([
      'build',
      'uglify',
      'compress'
    ]);
  });

  grunt.registerTask('default', ['debug']);
};
