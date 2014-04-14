module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
     /*   concat: {
            "options": { "separator": ";" },
            "build": {
                "src": [
                    "public/f/lib/angular/angular.js",
                    "public/f/js/angular-webstorage.js",
                    "public/f/js/app_dev.js",
                    "public/f/js/services.js",
                    "public/f/js/controllers.js",
                    "public/f/js/filters.js",
                    "public/f/js/directives.js",
                    "public/f/lib/angular/angular-resource.js",
                    "public/f/js/bootstrap.js",
                    "public/f/js/custom.js"
                ],
                "dest": "public/f/js/grunt.js"
            }
        },*/
        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= grunt.template.today("dd-mm-yyyy hh-MM") %> */\n',
                //is need to change functions names
                mangle: false
            },
            dist: {
                files: {
                    'public/f/js/min/grunt.min.js': [
                        "public/f/lib/angular/angular.js",
                        "public/f/js/angular-webstorage.js",
                        "public/f/js/app_dev.js",
                        "public/f/js/services.js",
                        "public/f/js/controllers.js",
                        "public/f/js/filters.js",
                        "public/f/js/directives.js",
                        "public/f/js/bootstrap.js",
                        "public/f/js/custom.js",
                        "public/f/lib/angular/angular-resource.js"
                    ]
                }
            }
        },
        qunit: {
            files: ['public/f/js/tests/*.html']
        },
        gitpush: {

        }
    });

    // Load required modules
   // grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-git');
    // Task definitions
    grunt.registerTask('default', ['uglify', 'qunit']);
};