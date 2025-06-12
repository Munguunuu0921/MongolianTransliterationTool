import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";
import { exec } from "child_process";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { Pool } = pkg;
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get("/", (req, res) => {
  res.send("API ажиллаж байна! Use /convert or /history");
});

//  Хөрвүүлэлт хийх API
app.post("/convert", (req, res) => {
  const { text, direction, font } = req.body;
  if (!text || !direction) return res.status(400).json({ error: "Text and direction are required" });

  let command = "";

  if (direction === "mn-to-galig") {
    const binary = font === "baiti" ? "./transliterate_baiti" : "./transliterate_bolorsoft";
    command = `echo "${text}" | ${binary}`;
  } else if (direction === "galig-to-mn") {
    command = `echo "${text}" | ./reverse_transliterate`;
  } else {
    return res.status(400).json({ error: "Invalid direction" });
  }

  exec(command, async (error, stdout) => {
    if (error) {
      console.error("Error executing C program:", error);
      return res.status(500).json({ error: "Transliteration failed" });
    }

    const resultText = stdout.trim();

    // Түүхэнд хадгалах
    if (direction === "mn-to-galig") {
      await pool.query(
        "INSERT INTO transliteration_history (original_text, transliterated_text) VALUES ($1, $2)",
        [text, resultText]
      );
    } else if (direction === "galig-to-mn") {
      await pool.query(
        "INSERT INTO transliteration_reverse_history (original_text, transliterated_text) VALUES ($1, $2)",
        [text, resultText]
      );
    }

    res.json({ galig: resultText });
  });
});

// Түүх татах (mn→galig)
app.get("/history", async (req, res) => {
  const result = await pool.query("SELECT * FROM transliteration_history ORDER BY created_at DESC");
  res.json(result.rows);
});

// Түүх татах (galig→mn)
app.get("/reverse-history", async (req, res) => {
  const result = await pool.query("SELECT * FROM transliteration_reverse_history ORDER BY created_at DESC");
  res.json(result.rows);
});

// Бүртгэл
app.post("/register", async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query(
    "INSERT INTO users (name, email, phone, password) VALUES ($1, $2, $3, $4)",
    [name, email, phone, hashedPassword]
  );

  res.json({ message: "User registered successfully" });
});

// Нэвтрэх
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

  if (result.rows.length === 0) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const user = result.rows[0];
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});



// Сервер асаах
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on: http://localhost:${PORT}`));
