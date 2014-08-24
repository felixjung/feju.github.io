module.exports = function(grunt) {
  grunt.initConfig({
    // Read the grunt file for variables
    pkg: grunt.file.readJSON('package.json'),
    // Configure file concatination
    concat: {
      options: {
        separator: '\n',
      },
      css: {
        src: ['_assets/css/*.css', 'bower/animate.css/animate.css'],
        dest: 'assets/css/<%= pkg.name %>.css'
      },
      js: {
        src: ['_assets/js/*.js', 'bower/jquery/dist/jquery.js'],
        dest: 'assets/js/<%= pkg.name %>.js'
      }
    },
    // Configure js uglify
    uglify: {
      deploy: {
          options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
          mangle: true,
          compress: true
        },
        files: {
          'assets/js/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
        }
      }
    },
    // Configure css minification
    cssmin: {
      deploy: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        files: {
          'assets/css/<%= pkg.name %>.min.css': ['<%= concat.css.dest %>']
        }
      }
    },
    // Configure Sass compilation
    sass: {
      options: {
        // Add the various Bourbon sources to the sass load path
        loadPath: [
          'bower/bourbon/dist',
          'bower/neat/app/assets/stylesheets',
          'bower/bitters/app/assets/stylesheets'
        ]
      },
      dev: {
        options: {
          style: 'expanded',
          trace: 'true',
          sourcemap: 'file'
        },
        files: {
          '_assets/css/felixjung.io.css': '_assets/sass/main.scss'
        }
      },
      deploy: {
        options: {
          style: 'nested',
          trace: 'false'
        },
        files: {
          '_assets/css/felixjung.io.css': '_assets/sass/main.scss'
        }
      }
    },
    // Copy files
    // copy: {
      // sourcemap: {
        // files: [{
          // kkkk

        // }]
        // src: '_assets/css/*.map',
        // dest: 'assets/css/'
      // }
    // },
    // Configure Jekyll
    jekyll: {
      serve: {
        options: {
          serve: true
        }
      },
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
    // Configure watch
    watch: {
      // Rebuild Jekyll site
      jekyll: {
        files: [
          '_includes/*.html',
          '_layouts/*.html',
          'index.html',
          '_posts/*.md',
          '_config.yml'
        ],
        tasks: ['jekyll:dev']
      },
      // Sass files
      sass: {
        files: ['_assets/sass/*.scss'],
        tasks: ['sass:dev']
      },
      // Concatinate css and javascript
      concat: {
        files: [
          '_assets/css/*.css',
          '_assets/js/*js'
        ],
        tasks: ['concat']//, 'copy']
      },
      options: {
        // interrupt: true,
        atBegin: true,
        livereload: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass')
  grunt.loadNpmTasks('grunt-jekyll')
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Register tasks
  grunt.registerTask('serve', ['sass:dev', 'concat', 'jekyll:serve']);
  grunt.registerTask('default', 'serve')
  grunt.registerTask('deploy', ['sass:deploy', 'concat', 'uglify:deploy', 'cssmin:deploy', 'jekyll:deploy'])
};
