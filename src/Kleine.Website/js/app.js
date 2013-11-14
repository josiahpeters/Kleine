'use strict';

var modules = ['ngRoute', 'ui.router', 'ngResource', 'kleine.controllers', 'kleine.directives'];

var app = angular.module('kleine', modules)
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider)
    {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('welcome', {
                url: '/',
                templateUrl: 'partials/welcome.html'
            })
            .state('invite', {
                url: '/invite/:id/:name/:email',
                templateUrl: 'partials/invite.html',
                controller: 'invite'
            })
            .state('guess', {
                url: '/guess/:id/:name',
                templateUrl: 'partials/guess.html',
                controller: 'guess',
            })
            .state('guess.gender', {
                url: '/gender',
                controller: 'guess',
                views: {
                    'guess': { templateUrl: 'partials/guess.gender.html' }
                }
            })
            .state('guess.date', {
                url: '/date',
                controller: 'guess',
                views: {
                    'guess': { templateUrl: 'partials/guess.date.html' }
                }
            })
            .state('guess.time', {
                url: '/time',
                controller: 'guess',
                views: {
                    'guess': { templateUrl: 'partials/guess.time.html' }
                }
            })
            .state('guess.weight', {
                url: '/weight',
                controller: 'guess',
                views: {
                    'guess': { templateUrl: 'partials/guess.weight.html' }
                }
            })
            .state('guess.length', {
                url: '/length',
                controller: 'guess',
                views: {
                    'guess': { templateUrl: 'partials/guess.length.html' }
                }
            })
            .state('guess.finish', {
                url: '/finish',
                controller: 'guess',
                views: {
                    'guess': { templateUrl: 'partials/guess.finish.html' }
                }
            });
    }]);
//.controller('controllers.invite', ['$scope', '$location', '$stateParams'])

angular.module('kleine.controllers', [])
    .controller('guess', [function ()
    {

    }]);

//angular.module('kleine.directives', []).
//  directive('slider', function ()
//  {
//      return { 
//          restrict: 'AE', 
//          //templateUrl: 'partials/slider.html',
//template: '<div class="range-slider">' +
//'    <input type="hidden" ng-model="value" />' +
//'      slide' +
//'    <div class="slider">' +
//'        <label class="min">{{ minValue + " " + label }}</label>' +
//'        <label class="max">{{ minValue + " " + label }}</label>' +
//'    </div>' +
//'</div>',
//          scope: {
//              label: '=label',
//              min: '=minValue',
//              max: '=maxValue',
//              //maxLabel: "Max"
//          },
//          link: function(scope, element, attrs)
//          {

//          }
//      };
//  });

angular.module('kleine.directives', []).
  directive('slider', function ($document, $window)
  {
      return {
          restrict: 'AE',
          //templateUrl: 'partials/slider.html',
          template: '    <input type="hidden" ng-model="value" />' +
          '      slide' +
          '    <div class="slider">' +
          '        <label class="min">{{ minValue + " " + label }}</label>' +
          '        <label class="max">{{ maxValue + " " + label }}</label>' +
          '    </div>',
          scope: {
              //'&'
              //maxLabel: "Max"
          },
          link: function (scope, element, attr)
          {
              var startX = 0, startY = 0, x = 0, y = 0;

              element.addClass('range-slider');

              var minValue = parseFloat(attr.min);
              var maxValue = parseFloat(attr.max);

              scope.label = attr.label || "lbs";

              scope.minValue = "2";
              scope.maxValue = "34";

              console.log(scope);
              console.log(attr);

              console.log(scope.$eval(attr.conversion));


              element.css({
                  position: 'relative',
                  cursor: 'pointer'
              });              

              var sliderElement = angular.element(element.children()[1]);

              var sliderMaxPx = 1140;
              var pixelPerValue = 100;

              var w = angular.element($window);

              w.bind('resize', resize);
              resize();

              sliderElement.css({
                  position: 'absolute',
                  cursor: 'pointer',
                  left: '0px'
              });

              sliderElement.on('mousedown', function (event)
              {
                  // Prevent default dragging of selected content
                  event.preventDefault();
                  startX = event.pageX - x;
                  $document.on('mousemove', mousemove);
                  $document.on('mouseup', mouseup);
              });

              function mousemove(event)
              {
                  x = event.pageX - startX;

                  if (x < 0)
                      x = 0;                  
                  if (x > sliderMaxPx)
                      x = sliderMaxPx;

                  sliderElement.css({
                      left: x + 'px'
                  });

                  calculateValue();
              }

              function calculateValue()
              {
                  //var range = $(this);

                  var left = parseFloat(sliderElement.css("left"));

                  //console.log(left);

                  scope.minValue = left / pixelPerValue + minValue;
                  scope.maxValue = left / pixelPerValue + minValue + maxValue;

                  scope.$apply();


                  //var rangeMinValue = self.options.unitConversion(left / self.pixelPerValue + self.options.min);
                  //var rangeMaxValue = self.options.unitConversion(left / self.pixelPerValue + self.options.min + self.options.range);
                  //range.find(".label.min").text(rangeMinValue);
                  //range.find(".label.max").text(rangeMaxValue);

                  //self.element.find("input").val('{min: "' + rangeMinValue + '", max: "' + rangeMaxValue + '"}');
              }

              function resize(event)
              {
                  sliderMaxPx = element[0].offsetWidth - sliderElement[0].offsetWidth;

                  pixelPerValue = sliderElement[0].offsetWidth / sliderMaxPx;
              }

              function mouseup()
              {
                  $document.unbind('mousemove', mousemove);
                  $document.unbind('mouseup', mouseup);
              }
          }
      };

  });