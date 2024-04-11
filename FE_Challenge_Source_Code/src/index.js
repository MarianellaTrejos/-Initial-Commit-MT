import 'bootstrap/dist/css/bootstrap.css';
import './styles/main.scss';
import { initInputValidation, initSearchButton, initEmailButton, initPhoneButton } from './js/form-validation';

(function init() {
  initInputValidation();
  initSearchButton();
  initEmailButton();
  initPhoneButton();
})();
