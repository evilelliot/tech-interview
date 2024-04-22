import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Listar todo el contenido multimedia
router.get("/", async (req, res) => {
  try {
    const collection = await db.collection("content");
    const content = await collection.find({}).toArray();
    res.status(200).json(content);
  } catch (error) {
    console.error("Error al obtener contenido multimedia:", error);
    res.status(500).send("Error al obtener contenido multimedia");
  }
});

// Obtener contenido multimedia por su ID
router.get("/:id", async (req, res) => {
  try {
    const collection = await db.collection("content");
    const item = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!item) {
      res.status(404).send("Contenido multimedia no encontrado");
    } else {
      res.status(200).json(item);
    }
  } catch (error) {
    console.error("Error al obtener contenido multimedia:", error);
    res.status(500).send("Error al obtener contenido multimedia");
  }
});

// Crear nuevo contenido multimedia
router.post("/", async (req, res) => {
  try {
    const newItem = {
      title: req.body.title,
      type: req.body.type, // Tipo de contenido: imagen, video, texto
      content: req.body.content, // Contenido real del multimedia (URL, texto, etc.)
      credits: req.body.credits // Créditos del contenido: username
    };
    const collection = await db.collection("content");
    const result = await collection.insertOne(newItem);
    res.status(204).json(result);
  } catch (error) {
    console.error("Error al crear contenido multimedia:", error);
    res.status(500).send("Error al crear contenido multimedia");
  }
});

// Actualizar contenido multimedia por su ID
router.patch("/:id", async (req, res) => {
  try {
    const collection = await db.collection("content");
    const query = { _id: new ObjectId(req.params.id) };
    const update = {
      $set: {
        title: req.body.title,
        type: req.body.type,
        content: req.body.content,
        credits: req.body.credits
      }
    };
    const result = await collection.updateOne(query, update);
    if (result.modifiedCount === 0) {
      res.status(404).send("Contenido multimedia no encontrado");
    } else {
      res.status(200).send("Contenido multimedia actualizado exitosamente");
    }
  } catch (error) {
    console.error("Error al actualizar contenido multimedia:", error);
    res.status(500).send("Error al actualizar contenido multimedia");
  }
});

// Eliminar contenido multimedia por su ID
router.delete("/:id", async (req, res) => {
  try {
    const collection = await db.collection("content");
    const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      res.status(404).send("Contenido multimedia no encontrado");
    } else {
      res.status(200).send("Contenido multimedia eliminado exitosamente");
    }
  } catch (error) {
    console.error("Error al eliminar contenido multimedia:", error);
    res.status(500).send("Error al eliminar contenido multimedia");
  }
});

export default router;
