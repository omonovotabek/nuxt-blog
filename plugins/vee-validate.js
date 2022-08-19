import Vue from "vue";
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { messages } from 'vee-validate/dist/locale/ru.json';

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule],  
    message: messages[rule]  
  });
});

 




 


