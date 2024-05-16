import mongoose from "mongoose";
import User from "../model/userModel.js";

export const create = async (req, res) => {

    try {
        const userData = new User({
            _id: new mongoose.Types.ObjectId(),
            fname: req.body.fname,
            Lname: req.body.Lname,
            email: req.body.email,
            password: req.body.password,

        });
        if (!userData) {
            return res.status(404).json({ msg: "user data not found" });
        }
        const savedData = await userData.save();
        res.status(200).json({ msg: "user created successfully" });

    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getAll = async (req, res) => {
    try {
        const userData = await User.find();

        if (!userData) {
            return res.status(404).json({ msg: "user data not found" });
        }
        res.status(200).json(userData);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}

export const getOne = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);

        if (!userExist) {
            return res.status(404).json({ msg: "user not found" });
        }
        res.status(200).json(userExist);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);

        if (!userExist) {
            return res.status(404).json({ msg: "user not found" });
        }

        const updatedData = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ msg: "user updated successfully" });
    }   
    catch (error) {
        res.status(500).json({ error: error });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);

        if (!userExist) {
            return res.status(404).json({ msg: "user not found" });
        }

        await User.findByIdAndDelete(id);
        res.status(200).json({ msg: "user deleted successfully" });

    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}