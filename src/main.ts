import './assets/main.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import en from "./translate/en.json";
import pl from "./translate/pl.json";
library.add(fas, far, fab);
dom.watch();

import {createI18n} from 'vue-i18n';



const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: "pl",
    availableLocales: ["en", "pl"],
    messages: {
        pl,
        en
    },});


const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router);
app.use(i18n);
app.mount('#app');
