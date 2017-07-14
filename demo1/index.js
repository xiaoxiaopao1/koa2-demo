const Koa = require('koa')
const fs = require('fs')
const app = new Koa();
const path = require('path');

/**
 * 用Promise封装异步读取文件方法
 * @param  {string} page html文件名称
 * @return {promise}      
 */
function render( page ) {
  return new Promise(( resolve, reject ) => {
    let viewUrl = `./view/${page}`    //此处使用的是es6的反引号规定，binary表示二进制输出
    fs.readFile(path.resolve(__dirname,viewUrl), "binary", ( err, data ) => {
      if ( err ) {
        reject( err )
      } else {
        resolve( data )
      }
    })
  })
}

/**
 * 根据URL获取HTML内容
 * @param  {string} url koa2上下文的url，ctx.url
 * @return {string}     获取HTML文件内容
 */
async function route( url ) {
  let view = '404.html'
  switch ( url ) {
    case '/':
      view = 'index.html'
      break
    case '/index':
      view = 'index.html'
      break
    case '/todo':
      view = 'todo.html'
      break
    default:
      view = '404.html'
      break
  }
  let html = await render( view ) //执行render函数，返回的为一个promise对象
  return html;                    //此处返回的html，可以理解为then方法中的返回值
}

app.use( async ( ctx ) => {
  let url = ctx.request.url
  let html = await route( url )   //此处表示then方法返回值的时候还需要继续then，所以继续await
  ctx.body = html                 //await有结果之后，才开始执行await后面的代码
})

app.listen(3000)
console.log('[demo] route-simple is starting at port 3000')