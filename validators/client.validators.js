import Joi from "joi";

export const createClientSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  matriculeFiscale: Joi.string().required(),
  regime: Joi.string().required(),
  subscriptionType: Joi.string().required(),
  status: Joi.string().required(),
  startDate: Joi.date().required()
});
