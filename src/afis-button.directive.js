
/*global _, angular*/
(function (angular) {
    'use strict';
    angular
        .module('afis.ui')
        .directive('afisButton', [function () {
            var actions = [
                {action: 'add'         , icon: 'icon-plus'             , transRef: 'afis.add'}         ,
                {action: 'addAll'      , icon: 'icon-plus-circled'     , transRef: 'afis.addAll'}      ,
                {action: 'apply'       , icon: 'icon-ok-circled2'      , transRef: 'afis.apply'}       ,
                {action: 'approve'     , icon: 'icon-ok-circled'       , transRef: 'afis.approve'}     ,
                {action: 'back'        , icon: 'icon-left-open'        , transRef: 'afis.back'}        ,
                {action: 'cancel'      , icon: 'icon-cancel'           , transRef: 'afis.cancel'}      ,
                {action: 'close'       , icon: 'icon-cancel'           , transRef: 'afis.close'}       ,
                {action: 'compare'     , icon: 'icon-sliders'          , transRef: 'afis.compare'}     ,
                {action: 'delete'      , icon: 'icon-trash-empty'      , transRef: 'afis.delete'}      ,
                {action: 'down'        , icon: 'icon-down-big'         , transRef: 'afis.down'}        ,
                {action: 'download'    , icon: 'icon-download'         , transRef: 'afis.download'}    ,
                {action: 'dryRun'      , icon: 'icon-play-circled2'    , transRef: 'afis.dryRun'}      ,
                {action: 'edit'        , icon: 'icon-edit'             , transRef: 'afis.edit'}        ,
                {action: 'exportExcel' , icon: 'icon-file-excel'       , transRef: 'afis.exportExcel'} ,
                {action: 'exportPdf'   , icon: 'icon-file-pdf'         , transRef: 'afis.exportPdf'}   ,
                {action: 'finalise'    , icon: 'icon-ok-circled2'      , transRef: 'afis.finalise'}    ,
                {action: 'forward'     , icon: 'icon-right-open'       , transRef: 'afis.forward'}     ,
                {action: 'import'      , icon: 'icon-download'         , transRef: 'afis.import'}      ,
                {action: 'login'       , icon: 'icon-login'            , transRef: 'afis.login'}       ,
                {action: 'logout'      , icon: 'icon-logout'           , transRef: 'afis.logout'}      ,
                {action: 'no'          , icon: 'icon-cancel'           , transRef: 'afis.no'}          ,
                {action: 'next'        , icon: 'icon-right-circled2'   , transRef: 'afis.next'}        ,
                {action: 'ok'          , icon: 'icon-thumbs-up'        , transRef: 'afis.ok'}          ,
                {action: 'previous'    , icon: 'icon-left-circled2'    , transRef: 'afis.previous'}    ,
                {action: 'print'       , icon: 'icon-print'            , transRef: 'afis.print'}       ,
                {action: 'refresh'     , icon: 'icon-arrows-cw'        , transRef: 'afis.refresh'}     ,
                {action: 'reject'      , icon: 'icon-cancel-circled'   , transRef: 'afis.reject'}      ,
                {action: 'remove'      , icon: 'icon-trash-empty'      , transRef: 'afis.remove'}      ,
                {action: 'removeAll'   , icon: 'icon-trash'            , transRef: 'afis.removeAll'}   ,
                {action: 'reply'       , icon: 'icon-reply'            , transRef: 'afis.reply'}       ,
                {action: 'replyAll'    , icon: 'icon-reply-all'        , transRef: 'afis.replyAll'}    ,
                {action: 'reset'       , icon: 'icon-ccw'              , transRef: 'afis.reset'}       ,
                {action: 'save'        , icon: 'icon-floppy'           , transRef: 'afis.save'}        ,
                {action: 'saveDraft'   , icon: 'icon-floppy'           , transRef: 'afis.saveDraft'}   ,
                {action: 'search'      , icon: 'icon-search'           , transRef: 'afis.search'}      ,
                {action: 'send'        , icon: 'icon-mail'             , transRef: 'afis.send'}        ,
                {action: 'submit'                                      , transRef: 'afis.submit'}      ,
                {action: 'up'          , icon: 'icon-up-big'           , transRef: 'afis.up'}          ,
                {action: 'update'      , icon: 'icon-arrows-cw'        , transRef: 'afis.update'}      ,
                {action: 'view'        , icon: 'icon-eye'              , transRef: 'afis.view'}        ,
                {action: 'viewHistory' , icon: 'icon-book'             , transRef: 'afis.viewHistory'} ,
                {action: 'yes'         , icon: 'icon-ok'               , transRef: 'afis.yes'}
            ];


            return {
                restrict: 'E',
                templateUrl: './button/afis-button.template.html',
                transclude: true,

                scope: {
                    afState: '@?',
                    afClass: '@',
                    afAction: '@?',
                    afDisabled: '=',
                    afCaption: '@',
                    afIcon: '@?',
                    afSize: '@?',
                    afPrompt: '@',
                    afPlaceholder: '@',
                    afModel: '=',
                    afTitle: '@',
                    afClick: '&',
                    afType: '@?',
                    afId: '@'
                },
                link: function ($scope, element, attrs) {
                    var actionIdx;
                    var defaults = { afState: 'secondary', afType: 'button' };
                    var settings = angular.extend({}, defaults, attrs);

                    //computes state class
                    switch (settings.afState) {
                        case 'primary':
                            $scope.stateClass = 'btn-primary';
                            break;
                        case 'danger':
                            $scope.stateClass = 'btn-danger';
                            break;
                        default:
                            $scope.stateClass = 'btn-default';
                            break;
                    }

                    // WARNING: geomedi 27/11/2017
                    // IE has a bug where the type is ignored if it's an interpolated value like in our case
                    // the workaround is to use ng-attr-type instead of type in the template
                    // @see https://github.com/angular/angular.js/issues/14117
                    $scope.afType = settings.afType;

                    // sets icon & standard caption
                    actionIdx = _.findIndex(actions, {'action': settings.afAction});
                    if (actionIdx >= 0) {
                        $scope.icon = actions[actionIdx].icon;
                        $scope.label = actions[actionIdx].transRef;
                    } else {
                        $scope.icon = false;
                    }

                    //custom icon
                    if($scope.afIcon){
                        $scope.icon = $scope.afIcon;
                    }

                    //custom label and no label
                    if (typeof $scope.afCaption !== 'undefined') {
                        //button with no label and a tooltip
                        if ($scope.afCaption === '') {
                            $scope.afTitle = angular.copy($scope.label);
                            $scope.label = '';

                        } else {
                            //custom label
                            $scope.label = attrs.afCaption;
                        }
                    }

                    //button size
                    if ($scope.afSize) {
                        $scope.btnSize = 'btn-' + settings.afSize;
                    }


                }
            };
        }]);

})(angular);