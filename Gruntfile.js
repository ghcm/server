module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        concat: {
            "options": { "separator": ";" },
            "build": {
                "src": ["public/f/lib/angular/angular.js","public/f/js/angular-webstorage.js","public/f/js/app_dev.js", "public/f/js/services.js", "public/f/js/controllers.js", "public/f/js/filters.js", "public/f/js/directives.js", "public/f/lib/angular/angular-resource.js", "public/f/js/bootstrap.js", "public/f/js/custom.js"],
                "dest": "public/f/js/grunt.js"
            }
        },
        uglify: {
            js: {

            },
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                mangle: false
            },
            dist: {
                files: {
                    'public/f/js/grunt.min.js': ['<%= concat.build.dest %>']
                }
            },
            prod: {
                options: {
                    compress: false
                }
            },
            dev: {
                options: {
                    compress: false
                }
            }                         ,

    }});

    // Load required modules
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // Task definitions
    grunt.registerTask('default', ['concat', 'uglify']);
};