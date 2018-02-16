// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var myApp = angular.module('starter', ['ionic','starter.service'])

.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.MobileAccessibility){
      window.MobileAccessibility.usePreferredTextZoom(false);
      console.log("disable preffered font done");
      // console.log(MobileAccessibility.getTextZoom(),"get text zoom");
      // console.log(MobileAccessibility.updateTextZoom(10),"update text zoom")
   }
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('table', {
      url: '/table/:id',
      cache: false,
      templateUrl: 'templates/table.html',
      controller: 'TableCtrl'
    })
    // .state('app.table', {
    //   url: '/table',
    //   views: {
    //     'menuContent': {
    //       templateUrl: 'templates/table.html'
    //     }
    //   }
    // })
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })
  .state('lobby', {
    url: '/lobby',
    cache: false,
    templateUrl: 'templates/lobby.html',
    controller:'LobbyCtrl'
    
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('login');
});

myApp.controller("AppCtrl", function ($scope) {
  console.log("hi")
});

