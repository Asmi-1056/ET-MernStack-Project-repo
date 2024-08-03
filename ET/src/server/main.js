const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;
const ExpenseTracker = require("./models/ExpenseTracker");

const PORT = 8000;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next();
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

mongoose.set("strictQuery", false);
mongoose
    .connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

app.post("/", async (req, res) => {
    const { amount, event, transType, balance, expense, income } = req.body;
    console.log("Received POST request with body:", req.body);
    try {
        const newTransaction = new ExpenseTracker({
            amount,
            event,
            transType,
            balance,
            expense,
            income,
        });

        await newTransaction.save();
        res.send("Transaction Saved");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error saving transaction");
    }
});

app.get("/display", async (req, res) => {
    try {
        const transactions = await ExpenseTracker.find();
        res.json(transactions);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching transactions");
    }
});

app.put("/update/:id", async (req, res) => {
    const { id } = req.params; 
    const { amount, event, transType, expense, income, balance } = req.body;
  
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send("Invalid transaction ID");
      }
  
      const updatedTransaction = await ExpenseTracker.findByIdAndUpdate(
        id,
        { amount, event, transType, expense, income, balance },
        { new: true }
      );
  
      if (!updatedTransaction) {
        return res.status(404).send("Transaction not found");
      }
  
      res.send("Transaction Updated");
    } catch (err) {
      console.log(err);
      res.status(500).send("Error updating transaction");
    }
});
  
app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const deletedTransaction = await ExpenseTracker.findByIdAndDelete(id);

        if (!deletedTransaction) {
            return res.status(404).send("Transaction not found");
        }

        res.send("Transaction Deleted");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error deleting transaction");
    }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));