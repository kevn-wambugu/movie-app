import request from 'request'
import  express from 'express'
import esj from 'ejs'
import path  from 'path'



const app = express()

const __dirname = path.resolve()

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server serves at http://localhost:${port}`));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'))
     
app.get("/", function(req,res){
    res.render("index.ejs")
})



app.get("/movies", function(req, res){
    
    //access data from the query string
    var searchedMovie = req.query.searchValue;
    var yearRelease = req.query.yearValue
    
    //create a variable for the query string
    var queryString = "http://www.omdbapi.com/?i=tt3896198&apikey=e81d69a0&t=" + searchedMovie + "&y=" + yearRelease;
    
    
    request(queryString, function(error, response, body){
    if(!error && response.statusCode == 200){
        var parseData = JSON.parse(body);
        //console.log(parseData["Search"][0]["Title"]);
        res.render("result", {data: parseData});
        }
    });
});
