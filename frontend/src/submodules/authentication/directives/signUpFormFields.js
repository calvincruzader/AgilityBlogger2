import template from '../templates/form-field.html';

function SignUpFormFieldsDirective() {
  'ngInject';

  return ({
    template,
    restrict: 'E',
    scope: {},
    controllerAs: 'vm',
    bindToController: {
      field: '=',
      type: '=',
      icon: '=',
      updateSubmittableStatus: '='
    },
    controller: () => {},
    link: (scope) => {
      const {vm} = scope;

      vm.status = "";
      vm.updateStatus = () => {
        vm.updateSubmittableStatus();
        vm.status = (vm.field.errorsPresent()) ? "errors-present" : "validations-passed";
      }
    },
  });
}

export default SignUpFormFieldsDirective;
