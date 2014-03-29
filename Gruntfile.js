module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        concat: {
            "options": { "separator": ";" },
            "build": {
                "src": ["public/f/js/app_dev.js", "public/f/js/bootstrap.js"],
                "dest": "public/f/js/grunt.js"
            }
        },
        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'public/f/js/grunt.min.js': ['<%= concat.build.dest %>']
                }
            }
    }});

    // Load required modules
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // Task definitions
    grunt.registerTask('default', ['concat', 'uglify']);
};