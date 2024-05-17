const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./Model/User');
const Organization = require('./Model/Organization');

const router = express.Router();

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get('/usersbyid/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const users = await User.find({id: id});
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Get users by id
router.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const users = await User.findOne({id: id});
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Update a user
router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email,role } = req.body;
  try {
    const user = await User.findOneAndUpdate({id:id}, { name, email,role }, { new: true });
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Delete a user
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOneAndDelete({id:id});
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Create a organization
router.post('/organization/add', async (req, res) => {
  const { name, description } = req.body;
  try {
    const org = new Organization({ name, description });
    await org.save();
    res.send(org);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Get all organizations
router.get('/organizations', async (req, res) => {
  try {
    const orgs = await Organization.find({});
    res.send(orgs);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

//Get organization by id
router.get('/organization/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const org = await Organization.findOne({id: id});
    res.send(org);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Update a organization
router.put('/organization/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const org = await Organization.findOneAndUpdate({id:id}, { name, description }, { new: true });
    res.send(org);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Delete a user
router.delete('/organization/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const org = await Organization.findOneAndDelete({id:id});
    res.send(org);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;