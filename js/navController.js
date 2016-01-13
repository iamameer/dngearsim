angular.module('navController', ['ngRoute','translationService'])
.controller('NavCtrl', 
  ['$scope','$route','$location','translations','region','$rootScope','$timeout','$window','$routeParams',
  function($scope,$route,$location,translations,region,$rootScope,$timeout,$window,$routeParams) {

    var setupAction = { path: 'setup', name: 'setup' }
    var aboutAction = { path: '/', name: 'about' }
    
    var noMenu = [];
    var noLocationMenu = [aboutAction,setupAction];
    var normalMenu = [
      aboutAction,
      {path: 'item-search', name:'search'},
      {path: 'saved', name:'saved'},
      setupAction, 
      ];
      
    $scope.searchMenu = [
      {path: 'item-search/titles', name:'titles'},
      {path: 'item-search/weapons', name:'weapons'},
      {path: 'item-search/armour', name:'armour'},
      {path: 'item-search/accessories', name:'accessories'},
      {path: 'item-search/techs', name:'techs'},
      {path: 'item-search/gems', name:'gems'},
      {path: 'item-search/plates', name:'plates'},
      {path: 'item-search/talisman', name:'talisman'},
      {path: 'item-search/cash', name:'cash'},
      ];
      
    region.init();
    
    $scope.isSearch = function() {
      return $location.path().indexOf('/item-search') == 0;
    }

    $scope.isLoading = function() {
      return translations.startedLoading && 
            !translations.isLoaded() &&
            region.tlocation != null &&
            region.tlocation.url != '' &&
            !$scope.noRegion();
    }
    
    $scope.noRegion = function() {
      return region.dntLocation == null;
    }
      
    $scope.getActions = function() {
      var menu = null;
      if(region.dntLocation != null && region.dntLocation.url == '') {
        menu = noLocationMenu; 
      }
      else if(region.tlocation != null && region.tlocation.url == '') {
        menu = noLocationMenu; 
      }
      else if($location.path() == '/view-group' || region.dntLocation == null) {
        menu = noMenu;
      }
      else {
        menu = normalMenu;
      }
      
      angular.forEach(menu, function(value, key) {
        delete value.extraCss;
        if($location.path().length == 1) {
          if(value.path.length == 1) {
            value.extraCss = 'active';
          }
        }
        else if(value.path.length > 1 && $location.path().indexOf('/' + value.path) == 0) {
          value.extraCss = 'active';
        }
      });
      
      angular.forEach($scope.searchMenu, function(value, key) {
        if($location.path() == '/' + value.path) {
          value.extraCss = 'search-active';
        }
        else {
          value.extraCss = 'search-default';
        }
      });
      
      return menu;
    };
  }
])
.directive('dngearsimNav', function() {
  return {
    templateUrl: 'partials/nav.html'
  };
});