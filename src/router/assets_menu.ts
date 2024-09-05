export let menuData = [
	/**
	 * 工作台
	 */
	{
		parentId: 0,
		id: 1,
		isShow: true,
		name: 'home',
		path: '/',
		icon: 'el-icon-wanchengshoukuangongzuotai',
		title: '首页',
		component: '/src/views/home/index.vue'
	},

	/**
	 * 超级表格
	 */
	{
		parentId: 0,
		id: 2,
		isShow: true,
		name: 'superTable',	
		path: '/superTable',
		icon: 'el-icon-menutable',
		title: '超级表格',
		component: '',
		redirect: '/superTable/basis'
	},
	{
		parentId: 2,
		id: 2.1,
		isShow: true,
		name: 'superTableBasis',
		path: '/superTable/basis',
		icon: '',
		title: '表格基本使用',
		component: '/src/views/superTable/basis.vue'
	},
	{
		parentId: 2,
		id: 2.2,
		isShow: false,
		name: 'superTableTreesSreen',
		path: '/superTable/treesSreen',
		icon: '',
		title: '树形筛选表格',
		component: ''
	},

	/**
	 * 超级表单
	 */
	{
		parentId: 0,
		id: 3,
		isShow: true,
		name: 'superForm',	
		path: '/superForm',
		icon: 'el-icon-biaodan',
		title: '超级表单',
		component: '',
		redirect: '/superForm/basis'
	},
	{
		parentId: 3,
		id: 3.1,
		isShow: true,
		name: 'superFormBasis',
		path: '/superForm/basis',
		icon: '',
		title: '表单基本使用',
		component: '/src/views/superForm/basis.vue'
	},
	{
		parentId: 3,
		id: 3.2,
		isShow: false,
		name: 'superFormStep',
		path: '/superForm/step',
		icon: '',
		title: '分步表单',
		component: ''
	},
	{
		parentId: 3,
		id: 3.2,
		isShow: true,
		name: 'superFormDynamic',
		path: '/superForm/dynamic',
		icon: '',
		title: '动态表单',
		component: '/src/views/superForm/dynamic.vue'
	},
	/**
	 * 图表可视化
	 */
	{
		parentId: 0,
		id: 4,
		isShow: false,
		name: 'Dashboard',	
		path: '/dashboard',
		icon: 'el-icon-gauge-dashboard-',
		title: 'Dashboard',
		component: '',
		redirect: '/dashboard/dataVisualize'
	},
	{
		parentId: 4,
		id: 4.1,
		isShow: false,
		name: 'dashboardDataVisualize',
		path: '/dashboard/dataVisualize',
		icon: '',
		title: '数据可视化',
		component: ''
	},

	/**
	 * echarts
	 */
	{
		parentId: 0,
		id: 5,
		isShow: true,
		name: 'echarts',
		path: '/echarts',
		icon: 'el-icon-echarts',
		title: 'Echarts',
		component: '',
		redirect: '/echarts/basis'
	},
	{
		parentId: 5,
		id: 5.1,
		isShow: true,
		name: 'echartsBasis',
		path: '/echarts/basis',
		icon: 'el-icon-echarts',
		title: 'Echarts基本使用',
		component: '/src/views/echarts/basis.vue',
	},

	/**
	 * 常用组件
	 */
	{
		parentId: 0,
		id: 6,
		isShow: true,
		name: 'module',
		path: '/module',
		icon: 'el-icon-zujianxinxi',
		title: '常用组件',
		// component: '/src/views/module/index.vue',
		redirect: '/module/guide'
	},
	{
		parentId: 6,
		id: 6.1,
		isShow: true,
		name: 'moduleGuide',
		path: '/module/guide',
		icon: '',
		title: '引导页',
		component: '/src/views/module/guide.vue'
	},
	{
		parentId: 6,
		id: 6.2,
		isShow: true,
		name: 'moduleIconchoice',
		path: '/module/iconchoice',
		icon: '',
		title: '图标选择器',
		component: '/src/views/module/iconchoice.vue'
	},
	{
		parentId: 6,
		id: 6.3,
		isShow: true,
		name: 'moduleFileupload',
		path: '/module/fileupload',
		icon: '',
		title: '文件上传',
		component: '/src/views/module/fileupload.vue'
	},
	{
		parentId: 6,
		id: 6.4,
		isShow: true,
		name: 'moduleQRcode',
		path: '/module/QRcode',
		icon: '',
		title: '二维码',
		component: '/src/views/module/QRcode.vue'
	},
	{
		parentId: 6,
		id: 6.5,
		isShow: true,
		name: 'moduleCodehighlight',
		path: '/module/codehighlight',
		icon: '',
		title: '代码高亮',
		component: '/src/views/module/codehighlight.vue'
	},
	{
		parentId: 6,
		id: 6.6,
		isShow: true,
		name: 'moduleWatermark',
		path: '/module/watermark',
		icon: '',
		title: '水印',
		component: '/src/views/module/watermark.vue'
	},

	/**
	 * 自定义指令
	 */
	{
		parentId: 0,
		id: 7,
		isShow: true,
		name: 'directives',
		path: '/directives',
		icon: 'el-icon-a-mingchengzhilingshuxingxiafazhiling',
		title: '自定义指令',
		component: '/src/views/directives/index.vue',
		// redirect: '/directives/list'
	},
	// {
	// 	parentId: 7,
	// 	id: 7.1,
	// 	isShow: true,
	// 	name: 'directivesList',
	// 	path: '/directives/list',
	// 	icon: '',
	// 	title: '自定义指令列表',
	// 	component: '/src/views/directives/index.vue'
	// },

	/**
	 * 内嵌网页
	 */
	{
		parentId: 0,
		id: 8,
		isShow: true,
		name: 'iframe',
		path: '/iframe',
		icon: 'el-icon-neiqianyemian',
		title: '内嵌网页',
		component: '',
		redirect: '/iframe/vue'
	},
	{
		parentId: 8,
		id: 8.1,
		isShow: true,
		name: 'iframeVue',
		path: '/iframe/vue',
		icon: '',
		title: 'Vue文档',
		component: '/src/views/iframe/vue.vue'
	},
	{
		parentId: 8,
		id: 8.2,
		isShow: true,
		name: 'iframeVite',
		path: '/iframe/vite',
		icon: '',
		title: 'vite文档',
		component: '/src/views/iframe/vite.vue'
	},
	{
		parentId: 8,
		id: 8.3,
		isShow: true,
		name: 'iframeTailwindcss',
		path: '/iframe/tailwindcss',
		icon: '',
		title: 'tailwindcss文档',
		component: '/src/views/iframe/tailwindcss.vue'
	},
	{
		parentId: 8,
		id: 8.4,
		isShow: true,
		name: 'iframeMakeapie',
		path: '/iframe/makeapie',
		icon: '',
		title: '可视化社区',
		component: '/src/views/iframe/makeapie.vue'
	},
	{
		parentId: 8,
		id: 8.5,
		isShow: true,
		name: 'iframePpchart',
		path: '/iframe/ppchart',
		icon: '',
		title: 'PPChart',
		component: '/src/views/iframe/ppchart.vue'
	},
	{
		parentId: 8,
		id: 8.6,
		isShow: true,
		name: 'iframeMadeapie',
		path: '/iframe/madeapie',
		icon: '',
		title: 'MadeApie',
		component: '/src/views/iframe/madeapie.vue'
	},

	/**
	 * 表单设计器
	 */
	{
		parentId: 0,
		id: 9,
		isShow: true,
		name: 'editor',
		path: '/editor',
		icon: 'el-icon-htbianjiqi',
		title: '编辑器',
		component: '',
		redirect: '/editor/markdown'
	},
	{
		parentId: 9,
		id: 9.1,
		isShow: true,
		name: 'editorMarkdown',
		path: '/editor/markdown',
		icon: '',
		title: 'Markdown',
		component: '/src/views/editor/markdown.vue'
	},
	{
		parentId: 9,
		id: 9.2,
		isShow: true,
		name: 'editorRich',
		path: '/editor/rich',
		icon: '',
		title: '富文本',
		component: '/src/views/editor/rich.vue'
	},
	{
		parentId: 9,
		id: 9.3,
		isShow: true,
		name: 'editorFormMaking',
		path: '/editor/formMaking',
		icon: '',
		title: 'FormMaking',
		component: '/src/views/editor/formMaking.vue'
	},

	/**
	 * 系统管理
	 */
	{
		parentId: 0,
		id: 10,
		isShow: true,
		name: 'system',
		path: '/system',
		icon: 'el-icon-xitong',
		title: '系统管理',
		component: '',
		redirect: '/system/usermanagement'
	},
	{
		parentId: 10,
		id: 10.1,
		isShow: true,
		name: 'systemUsermanagement',
		path: '/system/usermanagement',
		icon: '',
		title: '用户管理',
		component: ''
	},
	{
		parentId: 10,
		id: 10.2,
		isShow: true,
		name: 'systemRole',
		path: '/system/role',
		icon: '',
		title: '角色管理',
		component: ''
	},
	{
		parentId: 10,
		id: 10.3,
		isShow: true,
		name: 'systemMenupermission',
		path: '/system/menupermission',
		icon: '',
		title: '菜单权限',
		component: '/src/views/system/menupermission.vue'
	},
	{
		parentId: 10,
		id: 10.4,
		isShow: true,
		name: 'systemButtonpermission',
		path: '/system/buttonpermission',
		icon: '',
		title: '按钮权限',
		component: '/src/views/system/buttonpermission.vue'
	},
	{
		parentId: 10,
		id: 10.5,
		isShow: true,
		name: 'systemOperationlog',
		path: '/system/operationlog',
		icon: '',
		title: '操作日志',
		component: '/src/views/system/operationlog.vue'
	},

	/**
	 * 关于
	 */
	{
		parentId: 0,
		id: 12,
		isShow: true,
		name: 'about',
		path: '/about',
		icon: 'el-icon-guanyu',
		title: '关于',
		component: '/src/views/about/index.vue'
	},
]

// menuData = []