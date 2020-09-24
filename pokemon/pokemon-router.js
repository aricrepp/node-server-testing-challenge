const express = require('express');
const Pokemon = require('./pokemon-model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    res.json(await Pokemon.find());
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const pokemon = await Pokemon.findById(req.params.id);
    if (!pokemon) {
      return res.status(404).json({
        message: 'Pokemon not found',
      });
    }

    res.json(pokemon);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const pokemon = await Pokemon.create(req.body);

    res.status(201).json(pokemon);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
