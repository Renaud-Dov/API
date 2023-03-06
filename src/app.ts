import express, {Request, Response, NextFunction} from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import compression from "compression";

const app = express();
const port = parseInt(process.env.PORT || "3000");
const hostname = process.env.HOSTNAME || 'localhost'

app.use(cors())
app.use(compression())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(process.env.STATICPATH || "static"));
app.use(express.static('src/public'));

const indexRouter = require('./routes');
const dockerRouter = require('./routes/docker');
app.use('/', indexRouter);
// app.use('/docker', dockerRouter);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response) {
    res.status(404);
    res.render('404',{layout: 'layouts/error'});
});

// error handler
app.use((err: any, req: Request, res: Response) => {
    // set locals, only providing error in development
    res.locals.message = err.message;

    // render the error page
    res.status(err.status || 500);
    res.render('404', {layout: 'layouts/error', error: err.message});
});

app.listen(port, hostname, () => {
    console.log(`App listening on port ${port}`)
})