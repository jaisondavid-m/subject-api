import express from "express"
import cors from "cors"
import subjects from "./subjects";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Subjects API is live 🚀");
});

app.get("/api/subjects", (req, res) => {
  res.json(subjects);
});

app.get("/api/subjects/:code", (req, res) => {
  const subject = subjects.find(
    s => s.code === req.params.code
  );

  if (!subject) {
    return res.status(404).json({ message: "Subject not found" });
  }

  res.json(subject);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
