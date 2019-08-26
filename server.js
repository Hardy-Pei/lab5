let express = require('express');
let bodyParser = require('body-parser');

app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static('images'));
app.use(express.static('css'));

app.use(bodyParser.urlencoded({
    extended: false
}));
// parse application/json
app.use(bodyParser.json());

const filePath = __dirname + "/views";
let db = [];

app.get('/', function(req, res) {
    res.sendFile(filePath+'/index.html');
});

app.get('/listtasks', function(req, res) {
    res.render('list.html', {ar:db})
});

app.get('/newtask', function(req, res) {
    res.sendFile(filePath+'/new.html');
});

app.post('/newtask', function(req, res) {
    db.push({
        name:req.body.name,
        due:req.body.due,
        desc:req.body.desc
    });
    res.sendFile(filePath+'/new.html');
});

app.listen(8080);