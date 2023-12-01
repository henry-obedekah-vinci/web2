var express = require('express');
const { route } = require('.');
var router = express.Router();


const FILM = [
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
  const minimumFilmDuration = req?.query?.['minimum-duration']
  ? Number(req.query['minimum-duration'])
  : undefined;

if (minimumFilmDuration === undefined) return res.json(FILM);

if (typeof minimumFilmDuration !== 'number' || minimumFilmDuration <= 0)
  return res.json('Wrong minimum duration'); // bad practise (will be improved in exercise 1.5)

const filmsMinDuration = FILM.filter(
  (film) => film.duration >= minimumFilmDuration
);
return res.json(filmsMinDuration);
        
   
  });

  // Read a film from its id in the menu
router.get('/:id', (req, res) => {
  const indexOfFilmFound = FILM.findIndex((film) => film.id == req.params.id);

  if (indexOfFilmFound < 0) return res.json('Resource not found'); // bad practise (will be improved in exercise 1.5)

  return res.json(FILM[indexOfFilmFound]);
});
  

// Read a film from its id in the menu
router.get('/:id', (req, res) => {
  const indexOfFilmFound = FILM.findIndex((film) => film.id == req.params.id);

  if (indexOfFilmFound < 0) return res.json('Resource not found'); // bad practise (will be improved in exercise 1.5)

  return res.json(FILM[indexOfFilmFound]);
});

router.post('/' , function(req,res){
  const title =
  req?.body?.title?.trim()?.length !== 0 ? req.body.title : undefined;
const link =
  req?.body?.content?.trim().length !== 0 ? req.body.link : undefined;
const duration =
  typeof req?.body?.duration !== 'number' || req.body.duration < 0
    ? undefined
    : req.body.duration;
const budget =
  typeof req?.body?.budget !== 'number' || req.body.budget < 0
    ? undefined
    : req.body.budget;

if (!title || !link || !duration || !budget) return res.json('Bad request'); // bad practise (will be improved in exercise 1.5)

const lastItemIndex = FILM?.length !== 0 ? FILM.length - 1 : undefined;
const lastId = lastItemIndex !== undefined ? FILM[lastItemIndex]?.id : 0;
const nextId = lastId + 1;

const newFilm = { id: nextId, title, link, duration, budget };

FILM.push(newFilm);

return res.json(newFilm);
})

// Delete a film
router.delete('/:id', function (req, res) {
  const indexOfFilmFound = FILM.findIndex((film) => film.id == req.params.id);

  if (indexOfFilmFound < 0) return res.sendStatus(404);

  const itemsRemoved = FILM.splice(indexOfFilmFound, 1);
  const itemRemoved = itemsRemoved[0];

  return res.json(itemRemoved);
});


// Update one or more properties of a film identified by its id
router.patch('/:id', function (req, res) {
  const title = req?.body?.title;
  const link = req?.body?.link;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;

  if (
    !req.body ||
    (title !== undefined && !title.trim()) ||
    (link !== undefined && !link.trim()) ||
    (duration !== undefined && (typeof req?.body?.duration !== 'number' || duration < 0)) ||
    (budget !== undefined && (typeof req?.body?.budget !== 'number' || budget < 0))
  )
    return res.sendStatus(400);

  const indexOfFilmFound = FILM.findIndex((film) => film.id == req.params.id);

  if (indexOfFilmFound < 0) return res.sendStatus(404);

  const filmPriorToChange = FILM[indexOfFilmFound];
  const objectContainingPropertiesToBeUpdated = req.body;

  const updatedFilm = {
    ...filmPriorToChange,
    ...objectContainingPropertiesToBeUpdated,
  };

  FILM[indexOfFilmFound] = updatedFilm;

  return res.json(updatedFilm);
});



router.put('/:id', function (req, res) {
  const title = req?.body?.title;
  const link = req?.body?.link;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;

  if (
    !req.body ||
    !title ||
    !title.trim() ||
    !link ||
    !link.trim() ||
    duration === undefined ||
    typeof req?.body?.duration !== 'number' ||
    duration < 0 ||
    budget === undefined ||
    typeof req?.body?.budget !== 'number' ||
    budget < 0
  )
    return res.sendStatus(400);

  const id = req.params.id;
  const indexOfFilmFound = FILM.findIndex((film) => film.id == id);

  if (indexOfFilmFound < 0) {
    const newFilm = { id, title, link, duration, budget };
    FILM.push(newFilm);
    return res.json(newFilm);
  }

  const filmPriorToChange = FILM[indexOfFilmFound];
  const objectContainingPropertiesToBeUpdated = req.body;

  const updatedFilm = {
    ...filmPriorToChange,
    ...objectContainingPropertiesToBeUpdated,
  };

  FILM[indexOfFilmFound] = updatedFilm;

  return res.json(updatedFilm);
});

module.exports = router;