Router.configMap([
	{
		route: ['', 'teste'],
		name: 'index',
		moduleId: 'views/index',
		nav: true,
		title: 'Index'
	},
	{
		route: 'geral',
		name: 'geral',
		moduleId: 'views/geral',
		nav: true,
		title: 'Geral'
	},
	{
		route: 'teste',
		name: 'teste',
		moduleId: 'views/teste',
		nav: false,
		title: 'Teste'
	}
]);