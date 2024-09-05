import './assets/style/main.css'
import './assets/style/tailwindcss.css'
import "tailwindcss/tailwind.css"

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// 导入图标
import * as Icons from '@element-plus/icons-vue'

import piniaPluginPersist from 'pinia-plugin-persist'

import 'animate.css';

import "@/assets/iconfont/iconfont.css"

// element默认主题
import 'element-plus/dist/index.css'
// 公共样式，包含自定义暗黑模式，element重置样式
import '@/assets/style/index.scss'

// 引入markdown编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// 自定义指令
import btnPermissionVerify from '@/directives/btnPermissionDirective';
import copy from './directives/copyDirective'
import ellipsis from './directives/ellipsisDirective'
import debounce from './directives/debounceDirective'
import throttle from './directives/throttleDirective'

// 粒子效果
import Particles from 'vue3-particles'

// 代码高亮
// import 'highlight.js/styles/stackoverflow-light.css' // 代码高亮样式
import 'highlight.js/styles/a11y-light.css' // 代码高亮样式（白）
// import 'highlight.js/styles/a11y-dark.css' // 代码高亮样式（黑）
// import hl from 'highlight.js' // 导入代码高亮文件
import hljsVuePlugin from "@highlightjs/vue-plugin";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import java from "highlight.js/lib/languages/java";
import sql from "highlight.js/lib/languages/sql";
import xml from "highlight.js/lib/languages/xml";
import html from "highlight.js/lib/languages/vbscript-html";
import json from "highlight.js/lib/languages/json";
import yaml from "highlight.js/lib/languages/json";
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("java", java);
hljs.registerLanguage("yaml", yaml);
hljs.registerLanguage("json", json);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("html", html);

const app = createApp(App)

const pinia = createPinia();
pinia.use(piniaPluginPersist);

app.use(ElementPlus, {
    locale: zhCn,
  })

// app.use(ElementPlus)
// app.use(createPinia())
app.use(pinia)
app.use(router)
app.use(mavonEditor)
app.use(hljsVuePlugin)
app.use(Particles)

app.directive('btnPermissionVerify', btnPermissionVerify);
app.directive('copy', copy);
app.directive('ellipsis', ellipsis);
app.directive('debounce', debounce);
app.directive('throttle', throttle);

app.provide('loadHighlightCSSlight', () => import('highlight.js/styles/a11y-light.css'));
app.provide('loadHighlightCSSdark', () => import('highlight.js/styles/a11y-dark.css'));


// 注册所有图标
for (const [key, component] of Object.entries(Icons)) {
    app.component(key, component)
}

app.mount('#app')
