(function() {
    'use strict';

    angular
        .module('hyferApp')
        .component('hyfTimeline', {
            templateUrl: 'app/timeline/view.html',
            controller: hyfTimelineController
        });

    hyfTimelineController.inject = ['backendService', '$sce'];

    function hyfTimelineController(backendService, $sce) {
        var ctrl = this;
        ctrl.name = "Hasan sh";
        backendService.getTimeline()
            .then(res => {
                ctrl.timeline = res;
                ctrl.classes = Object.keys(ctrl.timeline).sort();
                ctrl.maxLength = 0;
                for (let key in ctrl.timeline) {
                    ctrl.maxLength = Math.max(ctrl.maxLength, ctrl.timeline[key].length, 10);
                }
                backendService.getReadme(ctrl.timeline[ctrl.classes[0]][0].git_repo)
                    .then(res => ctrl.readmeFile = $sce.trustAsHtml(res))
                    .catch(err => console.log(err));
            });

        ctrl.showReadme = showReadme;

        function showReadme(gitRepo) {
            backendService.getReadme(gitRepo)
                .then(res => {
                    ctrl.readmeFile = $sce.trustAsHtml(res);
                })
                .catch(err => console.log(err))
        }
    }
})();