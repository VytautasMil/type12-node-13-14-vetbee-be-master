const Joi = require('joi');

async function checkPetBody(req, res, next) {
  const petSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    dob: Joi.date().less(new Date().toLocaleDateString()).required(),
    client_email: Joi.string().email(),
  });

  try {
    const validationResult = await petSchema.validateAsync(req.body, { abortEarly: false });
    console.log('validationResult ===', validationResult);
    next();
  } catch (error) {
    console.log(' validation error ===', error);
    // is error pasiusti atgal tik message dalis
    // is error nusiusti objektu masyva kurist turi field ir message
    const errorWithFields = error.details.map((eObj) => ({
      field: eObj.path[0],
      message: eObj.message,
    }));
    res.status(400).json({
      msg: 'bad data sent',
      error: errorWithFields,
      type: 'validation',
    });
  }
}

async function checkMedsBody() {}

module.exports = {
  checkPetBody,
};