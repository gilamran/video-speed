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
      styles: {
        files: ['dev/content_scripts/styles/{,*/}*.css'],
        tasks: ['sass:content_scripts']
      }
    },

    // typescript
    ts: {
      content_script : {
        out: "app/content_scripts/scripts/video_speed_content_scripts.js",
        src: ["dev/content_scripts/scripts/{,*/}*.ts"],
        options: {
          sourceMap: true
        }
      }
    },

    sass: {
      options: {
        sourceMap: true
      },
      content_script: {
        files: [{
          'app/content_scripts/styles/video-speed.css': 'dev/content_scripts/styles/{,*/}*.css'
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
      dev: {
        files: [{
          expand: true,
          nonull: true,
          dot: true,
          cwd: 'dev',
          dest: 'app',
          src: [
            'content_scripts/bower_components/jquery/dist/jquery.min.js',
            'content_scripts/bower_components/jquery/dist/jquery.min.map',
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
          src: ['**', '!*.map'],
          dest: ''
        }]
      }
    }
  });

  grunt.registerTask('build', function () {
    grunt.task.run([
      'clean',
      'copy:dev',
      'copy:icons',
      'sass:content_script',
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

  grunt.registerTask('default', ['debug']);
}
