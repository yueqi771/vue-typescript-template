const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();

const userData =
    {
        name: '越祈',
        age: 18,
        skill: '流翼',
        avatar: "https://picsum.photos/200/300?image=57"
    }

const userList = [
    {
        name: '越祈',
        age: 18,
        skill: '流翼',
        avatar: "https://picsum.photos/200/300?image=57"
    },
    {
        name: '今朝',
        age: 18,
        skill: '流翼',
        avatar: "https://picsum.photos/200/300?image=57"
    },
]



const routes =  router.get('/user', async ctx => {
    ctx.body = {
        code: 10000,
        data: userList,
        message: '登录成功'
    }
})

app.use(routes.routes())

console.log(routes)

app.listen(3000, () => {
    console.log(`server is listening on 3000`)
});
