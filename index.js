const typeOf = require('typeof');

module.exports = _validate;

/**
 * Test the validity of a value given a schema.
 * 
 * @param {any} value
 * @param {object} schema
 * @returns
 */
function _validate (value, schema) {
  const valueType = typeOf(value);

  // Handle null allowed
  if ( valueType === null ) {
    if ( schema.options.allowNull ) { return handleValidation(value, schema); }
  }

  // Handle undefined allowed
  if ( valueType === undefined ) {
    if ( !schema.options.required ) { return handleValidation(value, schema); }
  }

  // Handle value match
  if ( valueType !== schema.type ) {
    return false; }

  return handleValidation(value, schema);
}

/**
 * Test the validity of a value against a custom function, otherwise is valid.
 * 
 * @param {any} value - Input to be validated.
 * @param {any} schema - Schema which constains the validation function
 * @returns {boolean}
 */
function handleValidation (value, schema) {
  if ( typeOf(schema.options.validation) !== Function ) { return true };
  return schema.options.validation(value);
}