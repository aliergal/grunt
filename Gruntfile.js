var THEME_DIR = 'dist/wp-content/themes/test';

module.exports = function(grunt){
	
	grunt.initConfig({

		sass: {
			compile: {
				files: {
					'src/css/main.css' : 'src/css/sass/main.scss'
				}
			}
		},

		cssmin: {
			minify: {
				files: {
					'src/css/style.min.css' : ['src/css/main.css', 'src/css/template.css']
				}
			}
		},

		uglify: {
			compress: {
				files: {
					'src/js/script.min.js' : 'src/js/script.js'
				}
			}
		},

		concat: {
			concatenate: {
				files: {
					'dist/css/style.min.css' : ['src/css/wordpress.css', 'src/css/style.min.css']
				}
			}
		},

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
				tasks : ['uglify']
			}
		}
	});

	//Load Tasks
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
}