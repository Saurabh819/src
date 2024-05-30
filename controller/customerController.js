const express = require("express");
const app = express();

const Customer = require("../model/customerModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerCustomer = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const isExistCustomer = await Customer.findOne({ where: { email } });
    if (isExistCustomer) {
      return res.status(403).json({
        success: false,
        massage: "Customer Already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newCustomer = await Customer.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newCustomer.save();

    return res.status(201).json({
      success: true,
      message: "Customer Registered Successfully",
      data: newCustomer,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

exports.loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const CustomerData = await Customer.findOne({ where: { email } });
    if (!CustomerData) {
      return res.status(400).json({
        success: false,
        massage: "Email or Password is Incorrect",
      });
    }
    const passwordMatch = await bcrypt.compare(password, CustomerData.password);
    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: "Email or Password is Incorrect",
      });
    }

    const token = jwt.sign(
      {
        id: CustomerData.id,
        email: CustomerData.email,
        role: CustomerData.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "6h" }
    );

    return res.status(200).json({
      success: true,
      message: "Customer Loggedin successfully",
      data: CustomerData,
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const id = req.params.id;

    // Check if the Customer exists
    const existingCustomer = await Customer.findOne({ where: { id } });
    if (!existingCustomer) {
      return res.status(404).json({
        success: false,
        message: "Customer does not exist",
      });
    }

    // Hash the password if provided
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Update the Customer with provided fields
    const updatedCustomer = await Customer.update(
      { username, email, password: hashedPassword },
      { where: { id } }
    );

    return res.status(200).json({
      success: true,
      message: "Customer updated successfully",
      data: updatedCustomer[1],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const isExistCustomer = await Customer.findOne({ where: { id } });

    if (!isExistCustomer) {
      return res.status(404).json({
        success: false,
        message: "Customer does not exist",
      });
    }
    const deleteCustomer = await Customer.destroy({ where: { id } });
    return res.status(200).json({
      success: true,
      message: "Customer deleted successfully",
      data: isExistCustomer,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

exports.getAllCustomer = async (req, res) => {
  try {
  

    const pageNumber = parseInt(req.query.page, 10);
    const limitNumber = parseInt(req.query.limit, 10);

    const { count,rows } = await Customer.findAndCountAll({
      offset:(pageNumber - 1) * limitNumber,
      limit:limitNumber
    })
  
    return res.status(200).json({
      totalUsers: count,
      totalPages: Math.ceil(count / limitNumber),
      currentPage: pageNumber,
      users: rows,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};
