var THEME_DIR = 'dist/wp-content/themes/test';

module.exports = function(grunt){
	const mozjpeg = require('imagemin-mozjpeg');
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		/*
			Compiles the main.scss file into main.css
		*/
		sass: {
			compile: {
				files: {
					'src/css/main.css' : 'src/css/sass/main.scss'
				}
		
			}
		},

		/*
			Minifies main.css and template.css file into style.min.css
		*/
		cssmin: {
			minify: {
				files: {
					'src/css/style.min.css' : ['src/css/main.css', 'src/css/template.css']
				}
			}
		},

		/*
			Compresses the script.js file into script.min.js
		*/
		uglify: {
			build: {
				files: {
					'src/js/script.min.js' : 'src/js/script.js'
				}
			},
			dist: {
				files: {
					'dist/js/script.min.js' : 'src/js/script.js'
				}
			}
		},

		/*
			This task concatenates wordpress.css and style.min.css file into one single file.
			The reason I used this is because cssmin task removes comments and for Wordpress
			we need to specify the template name. This is only an example for Wordpress configuration
		*/
		concat: {
			concatenate: {
				files: {
					'dist/css/style.min.css' : ['src/css/wordpress.css', 'src/css/style.min.css']
				}
			}
		},

		htmlmin: {
			options: {
				removeComments: true,
				collapseWhitespace: true
			},
			minify: {
				files: {
					'dist/index.html' : 'src/index.html'
				}
			}
		},

		image: {
	        dynamic: {
	          	files: [{
	                expand: true,
	                cwd: 'src/',
	                src: ['**/*.{png,jpg,gif}'],
	                dest: 'dist/'
	            }]
	        }
	    },

		/*
			Watches the sass, css, and js file changes and performs relevant actions.
		*/
		watch: {
			sass: {
				files : 'src/css/sass/main.scss',
				tasks : ['sass']
			},
			cssmin: {
				files : ['src/css/main.css', 'src/css/template.css'],
				tasks : ['cssmin']
			},
			js: {
				files : 'src/js/script.js',
				tasks : ['uglify:build']
			}
		},

		/*
			Lints JS errors
		*/
		jshint: {
		    all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
		 }


	});

	//Load Tasks
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-image');

	grunt.registerTask('release', ['concat', 'htmlmin', 'uglify:dist'])
};