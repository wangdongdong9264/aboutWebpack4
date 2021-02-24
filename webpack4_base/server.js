const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');

const app = new Koa();
const router = new Router();

// app.use(async ctx => {
//   ctx.body = {'hello': 'world'};
// });
app.use(cors());

router
    .get('/', (ctx, next) => {
        ctx.body = 'index.html'
    })
    .get('/user', (ctx, next) => {
        ctx.body = {'hello': 'world'}
    })
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);