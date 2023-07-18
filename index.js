import { engine } from 'express-handlebars';
import express from 'express';
import bodyParser from 'body-parser';
import pgPromise from 'pg-promise';
import builders from './Builders.js';
import 'dotenv/config'


const app = express();
const pgp = pgPromise();

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://:@localhost:5432/builder';

const db = pgp(connectionString);

const Builders = builders(db);

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.get('/', async (req, res) => {
    let allData = await Builders.getAllBuilders();
    res.render('index', {
        allData
    });
});

app.post('/build', (req, re) => {
    let {name, address} = req.body;
    let data = Builders.create(name, address);
    res.redirect('/');
})

app.get('/add', (req,res) => {
    res.render('add');
})
let PORT = process.env.PORT || 3007;
app.listen(PORT, () => {

    console.log('webapp is live on port', PORT);
});