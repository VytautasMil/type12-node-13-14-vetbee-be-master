const express = require('express');
const Joi = require('joi');
const { petsIndex, petsRemove, petsCreate } = require('../model/petsModel');
const { checkPetBody } = require('../utils/middleware');

const petsRouter = express.Router();

// ROUTES
petsRouter.get('/', async (req, res) => {
  try {
    // gauti viusu pets su modelio funkcija
    const allPets = await petsIndex();
    // issiusti atskyma su res
    res.json(allPets);
  } catch (error) {
    console.log('error ===', error);
    res.status(500).json({ msg: 'Some things dont works' });
  }
});
petsRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error('no id given');
    // gauti viusu pets su modelio funkcija
    const deleteSuccess = await petsRemove(id);
    if (deleteSuccess) {
      res.json({ msg: 'delete success' });
      return;
    }
    res.status(400).json({ msg: 'nothing deleted' });
    // issiusti atskyma su res
  } catch (error) {
    console.log('error ===', error);
    res.status(500).json({ msg: 'Some things dont works' });
  }
});

petsRouter.post('/', checkPetBody, async (req, res) => {
  try {
    const { name, dob, client_email } = req.body;
    // if (!name || !dob || !client_email) throw new Error('no name, dob, client_email given');
    // gauti viusu pets su modelio funkcija
    const createSuccess = await petsCreate(name, dob, client_email);
    if (createSuccess) {
      res.status(201).json({ msg: `${name} created` });
      return;
    }
    res.status(400).json({ msg: 'nothing created' });
    // issiusti atskyma su res
  } catch (error) {
    console.log('error ===', error);
    res.status(500).json({ msg: 'Some things dont works' });
  }
});

module.exports = petsRouter;
