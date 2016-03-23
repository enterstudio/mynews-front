var MyNewsApp = app = angular.module('MyNewsApp', [
    'MyNewsApp.Controllers',
    'MyNewsApp.Directives',
    'MyNewsApp.Services',
    'MyNewsApp.Models',
    'MyNewsApp.Filters',
    'CommonModels',
    'CommonServices',
    'ngSanitize',
    'ngAnimate',
    'ngRoute',
    'duScroll',
    'angularFileUpload'
]);

app.run(function($rootScope, $http, ActiveUser) {

    /**
     * Default AJAX Headers
     */
    if (ActiveUser.Get('token')) {
        $http.defaults.headers.common['X-Auth-Token'] = ActiveUser.Get('token');
    }

    /**
     * Receive broadcast request
     */
    $rootScope.$on('new_broadcast', function(event, args) {
        if (args && args.channel && args.data) {
            $rootScope.$broadcast(args.channel, args.data);
        } else {
            $rootScope.$broadcast('broadcast', args);
        }
    });

});

angular.module('MyNewsApp.Controllers', []);
angular.module('MyNewsApp.Directives', []);
angular.module('MyNewsApp.Services', []);
angular.module('MyNewsApp.Models', []);
angular.module('MyNewsApp.Filters', []);
// Required when importing angular models from mynews-common
angular.module('CommonModels', []);
// Required when importing angular services from mynews-common
angular.module('CommonServices', []);


