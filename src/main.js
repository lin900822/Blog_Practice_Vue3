import { createApp } from 'vue'
import App from './App.vue'
import '@popperjs/core';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "bootstrap-icons/font/bootstrap-icons.css"

import router from './router'

import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/rainbow.css';

import java from 'highlight.js/lib/languages/java';
import csharp from 'highlight.js/lib/languages/csharp';
import sql from 'highlight.js/lib/languages/sql';


hljs.registerLanguage('java', java);
hljs.registerLanguage('csharp', csharp);
hljs.registerLanguage('sql', sql);

const app = createApp(App);

app.use(router)
app.mount('#app')
