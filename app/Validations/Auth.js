const Joi = require('@hapi/joi');

class ValidateAuth {
  static async validateRegister(body) {
    try {
      const validateRegisterSchema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        surname: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30).required(),
      });

      const {error} = validateRegisterSchema.validate(body);
      if (error) {
        return {type: false, message: error.details[0].message};
      }
      return {type: true};
    } catch (error) {
      return {type: false, message: error.message};
    }
  }

  static async validateLogin(body) {
    try {
      const validateLoginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30).required(),
      });

      const {error} = validateLoginSchema.validate(body);
      if (error) {
        return {type: false, message: error.details[0].message};
      }
      return {type: true};
    } catch (error) {
      return {type: false, message: error.message};
    }
  }
  static async validateForgetPassword(body) {
    try {
      const validateForgetPasswordSchema = Joi.object({
        password: Joi.string().min(6).max(30).required(),
        user_id: Joi.string().required(),
      });

      const {error} = validateForgetPasswordSchema.validate(body);
      if (error) {
        return {type: false, message: error.details[0].message};
      }
      return {type: true};
    } catch (error) {
      return {type: false, message: error.message};
    }
  }
}

export default ValidateAuth;
