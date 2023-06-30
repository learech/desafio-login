import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import usersRouter from './routes/users.router.js';
import viewsRouter from './routes/views.router.js';
import mongoStore from 'connect-mongo';
import handlebars from 'express-handlebars';
import { errorHandler } from './middlewares/errorHandler.js';
import { __dirname } from './path.js';
import './db/db.js';
// import { Server } from 'socket.io';
// import viewsRouter from './messages.router.js/'

//var para guardar los usuarios en mongodb
// const storeOptions = {
//     store: mongoStore.create({
//         mongoUrl: 'mongodb+srv://OscarMor4les:f5m73booh@cluster0scarmorales.k9d156s.mongodb.net/ecommerce',
//         // crypto: {
//         //     secret: '1234'
//         // }
//         ttl:180
//     }),
//     secret: '1234',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         maxAge:180000
//     }
// }

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(cookieParser());
// app.use(session(storeOptions));
app.use(
    session({
      secret: 'sessionKey',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 10000
      },
      store: new mongoStore({
        mongoUrl: 'mongodb+srv://OscarMor4les:f5m73booh@cluster0scarmorales.k9d156s.mongodb.net/ecommerce',
        // autoRemoveInterval: 1,
        //autoRemove: "interval",
        ttl: 10,
        // crypto: {
        //   secret: '1234',       //encripta los datos de la sesion
        // },
      }),
    })
  )
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set ('views', __dirname + '/views');

//aca ingresa peticion y va a products.router.js
app.use('/products', productsRouter)
app.use('/carts', cartsRouter)
app.use('/users', usersRouter)
app.use('/views', viewsRouter)
// app.use('/messages', viewsRouter)

app.use(errorHandler);

const PORT = 8081;
app.listen(PORT, ()=>
console.log(`server ok on port ${PORT}`)
);

// const socketServer = new Server(httpServer);

// socketServer.on('connection', async (socket)=>{
//     socket.emit('userConect', socket.id);
//     const arrayMsg = await msgDao.getAllMessages();
//     socket.emit('arrayMsg', arrayMsg);
//     socket.on('newMessage', async (data)=>{
//         const userName = data.userName
//         const message = data.message
//         await msgDao.sendMessage(userName, message);
//         const arrayMsgUpdated = await msgDao.getAllMessages();
//         socket.emit('arrayMsg', arrayMsgUpdated);
//     });
//     socket.on('deleteMsg', async (msgId)=>{
//         await msgDao.deleteMessage(msgId);
//         const arrayMsgUpdatedDel = await msgDao.getAllMessages();
//         socket.emit('arrayMsg', arrayMsgUpdatedDel);
//     });
// });




