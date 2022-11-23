import angular from 'angular';
import '@ovh-ux/ng-translate-async-loader';
import '@uirouter/angularjs';
import 'angular-translate';
import '@ovh-ux/ui-kit';

import component from './update-image.component';

const moduleName = 'ovhManagerPciAppsUpdateAppImage';

angular
  .module(moduleName, [
    'oui',
    'ngTranslateAsyncLoader',
    'pascalprecht.translate',
  ])
  .component('ovhManagerPciProjectAppsUpdateAppImage', component)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
