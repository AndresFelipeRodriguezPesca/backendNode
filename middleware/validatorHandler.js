const boom = require('@hapi/boom');

//recibe el esquema que voy a validad y la propiedad(query, body)
//middelware de forma dinamica
function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
}

module.exports = validatorHandler;
