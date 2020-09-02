const Koa = require('koa')
const compress = require('koa-compress')
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const historyFallback = require('koa2-history-api-fallback')

const app = new Koa()

app.use(cors({origin: '*'}))
app.use(bodyParser());

app.use(compress({
  gzip: {
    flush: require('zlib').constants.Z_SYNC_FLUSH
  },
  deflate: {
    flush: require('zlib').constants.Z_SYNC_FLUSH,
  },
  //br: false // disable brotli
}))

app.use(historyFallback());

app.use(serve("./dist", {index: "index.html"}));

app.listen(3014);
console.log('listening on port 3014', process.env.ENV);
