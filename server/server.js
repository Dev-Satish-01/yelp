require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log("middleware");
    next();
})

/* GET all restaurants */
app.get("/api/v1/restaurants", async (req, res) => {
    try {
        const results = await db.query('select * from restaurants');
        console.log(results);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurant: results.rows,
            }
        })
    } catch (err) {
        console.log(err);
    }
});

/* GET one restaurant */
app.get("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query("select * from restaurants where id = $1", [req.params.id]);
        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            }
        })
    } catch (err) {
        console.log(err);
    }
});

/* POST new restaurant */
app.post("/api/v1/restaurants/", async (req, res) => {
    try {
        const results = await db.query("insert into restaurants (name, location, price_range) values ($1, $2, $3) returning *", [req.body.name, req.body.location, req.body.price_range]);
        console.log(results);
        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            }
        })
    } catch (err) {
        console.log(err);
    }
});

/* UPDATE one restaurant */
app.put("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query("update restaurants set name = $1, location = $2, price_range = $3 where id = $4 returning *", [req.body.name, req.body.location, req.body.price_range, req.params.id]);
        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            }
        })
    } catch (err) {
        console.log(err);
    }
});

/* DELETE restaurant */
app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query("delete from restaurants where id = $1", [req.params.id]);
        res.status(204).json({
            status: "success",
        })
    } catch (err) {
        console.log(err);
    }
})

const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
