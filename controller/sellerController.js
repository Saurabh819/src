const express = require("express");
const app = express();

const Seller = require("../model/sellerModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerSeller = async (req, res) => {
  try {
    const {username, email, password,role } = req.body;
    const isExistseller = await Seller.findOne({ where: { email } });
    if (isExistseller) {
      return res.status(403).json({
        success: false,
        massage: "seller Already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newseller = await Seller.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newseller.save();

    return res.status(201).json({
      success: true,
      message: "Seller Registered Successfully",
      data: newseller,
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

exports.loginSeller = async (req, res) => {
  try {
    const { email, password } = req.body;

    const sellerData = await Seller.findOne({ where: { email } });
    if (!sellerData) {
      return res.status(400).json({
        success: false,
        massage: "Email or Password is Incorrect",
      });
    }

    if (!isValidRoles) {
        return res.status(400).json({
          success: false,
          message: "Invalid roles. Admin must have the 'admin' role and can optionally have the 'user' role.",
          data: null,
        });
      }
    const passwordMatch = await bcrypt.compare(password, sellerData.password);
    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: "Email or Password is Incorrect",
      });
    }

    const token = jwt.sign(
      { id: sellerData.id, email: sellerData.email, role: sellerData.role },
      process.env.JWT_SECRET,
      { expiresIn: "6h" }
    );

    return res.status(200).json({
      success: true,
      message: "Seller Loggedin successfully",
      data: sellerData,
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

exports.updateSeller = async (req, res) => {
  try {
    const { sellername, email, password } = req.body;
    const id = req.params.id;

    // Check if the seller exists
    const existingSeller = await Seller.findOne({ where: { id } });
    if (!existingSeller) {
      return res.status(404).json({
        success: false,
        message: "seller does not exist",
      });
    }

    // Hash the password if provided
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Update the seller with provided fields
    const updatedSeller = await Seller.update(
      { sellername, email, password: hashedPassword },
      { where: { id } }
    );

    return res.status(200).json({
      success: true,
      message: "Seller updated successfully",
      data: updatedSeller,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

exports.deleteSeller = async (req, res) => {
  try {
    const id = req.params.id;
    const isExistSeller = await Seller.findOne({ where: { id } });

    if (!isExistSeller) {
      return res.status(404).json({
        success: false,
        message: "Seller does not exist",
      });
    }
    const deleteseller = await Seller.destroy({ where: { id } });
    return res.status(200).json({
      success: true,
      message: "Seller deleted successfully",
      data: isExistSeller,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};
