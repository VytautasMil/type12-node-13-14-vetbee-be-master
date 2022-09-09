const express = require('express');
const { medsIndex, medsCreate } = require('../model/medsModel');

const medsRouter = express.Router();

medsRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const allMeds = await medsIndex();
      res.json(allMeds);
    } catch (error) {
      console.log('error ===', error);
      res.status(500).json({ msg: 'Some things dont works' });
    }
  })
  .post(async (req, res) => {
    try {
      const { name, description } = req.body;
      if (!name || !description) throw new Error('no name or description');
      const createMedSuccess = await medsCreate(name, description);
      // if (createMedSuccess) {
      //   res.status(201).json({ msg: 'med created' });
      //   return;
      // }
      // res.status(400).json({ msg: 'med not created' });

      res.status(createMedSuccess ? 201 : 400).json({
        msg: createMedSuccess ? 'med created' : 'med not created',
      });
    } catch (error) {
      console.log('error ===', error);
      res.status(500).json({ msg: 'Some things dont works' });
    }
  });

module.exports = medsRouter;
