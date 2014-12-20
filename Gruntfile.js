module.exports = function(grunt) {
  grunt.initConfig({
    // Read the grunt file for variables
    pkg: grunt.file.readJSON('package.json'),
    // Configure js uglify
    uglify: {
      dev: {
        options: {
          banner: '/*! <%= pkg.name %> -  <%= grunt.template.today("dd-mm-yyyy") %> - dev build */\n',
          mangle: false,
          compress: true,
          sourceMap: true,
          sourceMapIncludeSources: true
        },
        files: {
          'assets/js/<%= pkg.name %>.min.js': [
            '_bower/jquery/dist/jquery.js',
            '_bower/jcarousel/dist/jquery.jcarousel.js',
            '_src/js/*.js'
          ]
        }
      },
      deploy: {
          options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> - deploy build */\n',
          mangle: true,
          compress: true,
          sourceMap: false
        },
        files: {
          'assets/js/<%= pkg.name %>.min.js': [
            '_bower/jquery/dist/jquery.js',
            '_bower/jcarousel/dist/jquery.jcarousel.js',
            '_src/js/*.js'
          ]
        }
      }
    },
    // Configure Sass compilation
    sass: {
      options: {
        // Add bower stuff to loadpath
        loadPath: ['_bower/font-awesome/scss']
      },
      dev: {
        options: {
          style: 'compressed',
          sourcemap: 'inline'
        },
        files: {
          'assets/css/felixjung.io.min.css': '_src/sass/main.scss'
        }
      },
      deploy: {
        options: {
          style: 'compressed',
          sourcemap: 'none'
        },
        files: {
          'assets/css/felixjung.io.min.css': '_src/sass/main.scss'
        }
      }
    },
    // Configure Jekyll
    jekyll: {
      dev: {
        options: {
          serve: false,
          drafts: true,
          future: true,
          limit_posts: 20
        }
      },
      deploy: {
        options: {
          serve: false,
          drafts: false,
          future: false
        }
      }
    },
    // Copy
    copy: {
      fontawesome: {
        files: [{
          expand: true,
          cwd: '_bower/font-awesome/',
          src: ['fonts/*'],
          dest: 'assets/'
        }]
      }
    },
    // BrowserSync
    browserSync: {
      bsFiles: {
        src : [
          '_site/**/*.js',
          '_site/**/*.css',
          '_site/**/*.html'
        ]
      },
      options: {
        watchTask: true,
        server: {
          baseDir: "_site"
        },
        logFileChanges: true,
        port: 5757
      }
    },
    // Configure watch
    watch: {
      // Rebuild Jekyll site
      jekyll: {
        files: [
          './**/*.html',
          '!./_site/**',
          '*.html',
          '_posts/*.md',
          '_config.yml',
          'assets/**/*'
        ],
        tasks: ['jekyll:dev']
      },
      // Sass files
      sass: {
        files: ['_src/sass/**/*.scss'],
        tasks: ['sass:dev']
      },
      // Uglify
      uglify: {
        files: ['_src/js/*.js'],
        tasks: ['uglify:dev']
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');

  // Register tasks
  grunt.registerTask('dev', ['copy', 'browserSync', 'watch']);
  grunt.registerTask('default', 'dev');
  grunt.registerTask('deploy', ['copy', 'sass:deploy', 'uglify:deploy', 'jekyll:deploy']);
};
