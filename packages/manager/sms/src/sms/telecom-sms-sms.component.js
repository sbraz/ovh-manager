import angular from 'angular';
import '@uirouter/angularjs';

import controller from './telecom-sms-sms.controller';
import template from './telecom-sms-sms.html';

import compose from './compose';
import hlr from './hlr';
import incoming from './incoming';
import outgoing from './outgoing';
import pending from './pending';
import templates from './templates';

const moduleName = 'ovhManagerSmsSmsComponent';

angular
  .module(moduleName, [
    'ui.router',
    compose,
    hlr,
    incoming,
    outgoing,
    pending,
    templates,
  ])
  .config(($stateProvider) => {
    $stateProvider.state('sms.sms', {
      url: '/sms',
      views: {
        'smsInnerView@sms': {
          template,
          controller,
          controllerAs: 'TelecomSmsSmsCtrl',
        },
      },
      translations: ['.'],
    });
  });

export default moduleName;
