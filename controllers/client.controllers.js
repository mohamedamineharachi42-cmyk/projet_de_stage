import Client from "../models/client.js";
import { createClientSchema } from "../validators/client.validators.js";


export const createClient = async (req, res) => {
  const { error } = createClientSchema.validate(req.body);
  if (error)
    return res.status(400).json({ error: error.details[0].message });

  const client = await Client.create(req.body);
  res.status(201).json(client);
};


export const getClients = async (req, res) => {
  const {
    regime,
    subscriptionType,
    status,
    startDateFrom,
    startDateTo,
    search,
    page = 1,
    limit = 10,
    sort = "createdAt:desc"
  } = req.query;

  const query = {};

  if (regime) query.regime = regime;
  if (subscriptionType) query.subscriptionType = subscriptionType;
  if (status) query.status = status;

  if (startDateFrom || startDateTo) {
    query.startDate = {};
    if (startDateFrom) query.startDate.$gte = new Date(startDateFrom);
    if (startDateTo) query.startDate.$lte = new Date(startDateTo);
  }

  if (search) {
    query.$or = [
      { name: new RegExp(search, "i") },
      { phone: new RegExp(search, "i") },
      { matriculeFiscale: new RegExp(search, "i") }
    ];
  }

  const [field, order] = sort.split(":");

  const client = await Client.find(query)
    .sort({ [field]: order === "asc" ? 1 : -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json(clients);
};


export const getClientById = async (req, res) => {
  const client = await Client.findById(req.params.id);
  if (!client) return res.status(404).json({ message: "Client not found" });
  res.json(client);
};


export const updateClient = async (req, res) => {
  const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  res.json(client);
};


export const deleteClient = async (req, res) => {
  await Client.findByIdAndDelete(req.params.id);
  res.status(204).send();
};

