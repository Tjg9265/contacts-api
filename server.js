const express = require("express");
const dotenv = require("dotenv");
const mongodb = require("./data/database");
const contactsRoutes = require("./routes/contacts");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Contacts API is running");
});

app.use("/contacts", contactsRoutes);

mongodb.initDb().then(() =>{
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch((err) => {
    console.error("Database connection failed:", err);
});
   
