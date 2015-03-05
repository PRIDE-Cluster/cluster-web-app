module.exports = function(config){
    config.set({

        basePath : './src/main/webapp/',

        files : [
            'bower_components/angular/angular.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angularjs-nvd3-directives/dist/angularjs-nvd3-directives.js',
            'bower_components/angular-carousel/dist/angular-carousel.js',
            'bower_components/angular-touch/angular-touch.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'app.js',
            'components/**/*.js',
            'view*/**/*.js'
        ],

        autoWatch : true,

        frameworks: ['jasmine'],

        browsers : ['Chrome'],

        plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],

        junitReporter : {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};