const Joi = require('joi');

// refactoring
function errorDetails(errorsArr) {
  return errorsArr.map((eObj) => ({
    field: eObj.path[0],
    message: eObj.message,
  }));
}

async function checkPetBody(req, res, next) {
  const petSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    dob: Joi.date().less(new Date().toLocaleDateString()).required(),
    client_email: Joi.string().email().required(),
  });

  try {
    const validationResult = await petSchema.validateAsync(req.body, { abortEarly: false });
    console.log('validationResult ===', validationResult);
    next();
  } catch (error) {
    console.log(' validation error ===', error);
    // is error pasiusti atgal tik message dalis
    // is error nusiusti objektu masyva kurist turi field ir message

    res.status(400).json({
      msg: 'bad data sent',
      error: errorDetails(error.details),
      type: 'validation',
    });
  }
}

async function checkMedsBody(req, res, next) {
  const medsSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(5).required(),
  });

  try {
    const validationResult = await medsSchema.validateAsync(req.body, { abortEarly: false });
    console.log('validationResult ===', validationResult);
    next();
  } catch (error) {
    console.log(' validation error ===', JSON.stringify(error, null, 2));

    res.status(400).json({
      msg: 'bad data sent',
      error: errorDetails(error.details),
      type: 'validation',
    });
  }
}

module.exports = {
  checkPetBody,
  checkMedsBody,
};