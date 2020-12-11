import Vue from 'vue';
import App from './App.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
	faPlay,
	faPause,
	faChevronCircleLeft,
	faChevronCircleRight
} from '@fortawesome/free-solid-svg-icons';

library.add(faPlay, faPause, faChevronCircleLeft, faChevronCircleRight);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
	render: function (h) {
		return h(App);
	}
}).$mount('#app');
