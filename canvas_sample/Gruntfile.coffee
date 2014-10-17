module.exports = (grunt) ->

  # Project configuration.
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    bower:
      install:
        options:
          targetDir: './www/lib',
          layout: 'byComponent',
          install: true,
          verbose: true,
          cleanTargetDir: true,
          cleanBowerDir: true,


    phonegap:
      config:
        plugins: []
        platforms: ['android']
        config:
          template: '_config.xml'
          data:
            id: 'com.intech.tracking'
            version: '<%= pkg.version %>'
            name: '<%= pkg.name %>'
            description: '<%= pkg.description %>'
            author:
              email: 'vmeca87@gmail.com'
              href: ''
              text: 'Victor Cabello'

        versionCode: 1
        permissions: []

    connect:
      options:
        hostname: 'localhost'
        livereload: 35729
        port: 3000
      server:
        options:
          base: 'www'
          open: true

    watch:
      options:
        livereload: '<%= connect.options.livereload %>'
      all:
        files: 'www/{,*/}*.{html,js,css,png}'

  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-phonegap'
  grunt.loadNpmTasks 'grunt-bower-task'

  grunt.registerTask 'server', ->
    grunt.task.run 'bower:install'
    grunt.task.run 'connect:server'
    grunt.task.run 'watch:all'

  grunt.registerTask 'android', ->
    grunt.task.run 'bower:install'
    grunt.task.run 'phonegap:build:android'
    grunt.task.run 'phonegap:run:android'
