const Koa = require('koa');
const app = new Koa();
const KoaRouter = require('koa-router');
const router = new KoaRouter();

router.get('/',async (ctx) => {
	const html = `
	<ul>
		<li><a href="/todo">todo</a></li>
		<li><a href="/link1">link1</a></li>
		<li><a href="/link2">link2</a></li>
		<li><a href="/link3">link3</a></li>
		<li><a href="/link4">link4</a></li>
	</ul>
	`
	ctx.body = html;
})

router.get('/todo',async (ctx) => {
	ctx.body = 'todo';
})

router.get('/link1',async (ctx) => {
	ctx.body = 'link1 page';
})

router.get('/link2',async (ctx) => {
	ctx.body = 'link2 page';
})

router.get('/link3',async (ctx) => {
	ctx.body = 'link3 page';
})

router.get('/link4',async (ctx) => {
	ctx.body = 'link4 page';
})

router.get('*',async (ctx) => {
	ctx.body = '404 Not Found'
})

app.use(router.routes())
   .use(router.allowedMethods());
app.listen(3000);
console.log('project has started on port 3000')