var express = require('express');
const { route } = require('.');
var router = express.Router();


const films = [
    {
        id: 1,
        title: 'Gardien de la galaxie 3',
        duration: 149 ,
        budget: 250 , 
        link :'https://fr.disney.be/films/les-gardiens-de-la-galaxie-volume-3' , 
      },

      {
        id: 2,
        title: 'Home Alone 3',
        duration: 102 ,
        budget: 32 , 
        link :'https://www.disneyplus.com/nl-nl/movies/home-alone-3/5iC8Hb3jcEoo' , 
      },
      {
        id: 3,
        title: 'Black Panther',
        duration: 135 ,
        budget: 200 , 
        link :'https://fr.disney.be/films/black-panther' , 
      },

]


router.get('/', function(req, res,next) {
    const  newFilm = []; 
    const minimum = req?.query?.['minimum-duration'] ??undefined ;
    if(minimum != undefined){
        for (const film of films) {
            if(film.duration>=req.query['minimum-duration']){
                 newFilm.push(film);
            }
              
        }
    }
        
   return res.json(  newFilm ?? films); 
  });
  



router.post('/' , function(req,res){
    const duration =  req?.body?.duration > 0?  req.body.duration : undefined ; 
    const budget =  req?.body?.budget > 0?  req.body.budget : undefined ;
    let add = 
    [
         title = req.body.title,
         duration = req.body.duration, 
         budget = req.body.budget, 
         link = req.body.link
    ]
    films.push(add); 
})

module.exports = router;