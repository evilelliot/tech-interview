import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Listar todas las categorías
router.get("/", async (req, res) => {
  try {
    const collection = await db.collection("category");
    const categories = await collection.find({}).toArray();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    res.status(500).send("Error al obtener categorías");
  }
});

// Obtener una categoría por su ID
router.get("/:id", async (req, res) => {
  try {
    const collection = await db.collection("category");
    const category = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!category) {
      res.status(404).send("Categoría no encontrada");
    } else {
      res.status(200).json(category);
    }
  } catch (error) {
    console.error("Error al obtener categoría:", error);
    res.status(500).send("Error al obtener categoría");
  }
});

// Crear una nueva categoría
router.post("/", async (req, res) => {
  try {
    const newCategory = {
      name: req.body.name,
      permissions: req.body.permissions // Permisos de contenido: permite imágenes, permite videos, permite textos
    };
    const collection = await db.collection("category");
    const result = await collection.insertOne(newCategory);
    res.status(204).json(result);
  } catch (error) {
    console.error("Error al crear categoría:", error);
    res.status(500).send("Error al crear categoría");
  }
});

// Actualizar una categoría por su ID
router.patch("/:id", async (req, res) => {
  try {
    const collection = await db.collection("category");
    const query = { _id: new ObjectId(req.params.id) };
    const update = {
      $set: {
        name: req.body.name,
        permissions: req.body.permissions
      }
    };
    const result = await collection.updateOne(query, update);
    if (result.modifiedCount === 0) {
      res.status(404).send("Categoría no encontrada");
    } else {
      res.status(200).send("Categoría actualizada exitosamente");
    }
  } catch (error) {
    console.error("Error al actualizar categoría:", error);
    res.status(500).send("Error al actualizar categoría");
  }
});

// Eliminar una categoría por su ID
router.delete("/:id", async (req, res) => {
  try {
    const collection = await db.collection("category");
    const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      res.status(404).send("Categoría no encontrada");
    } else {
      res.status(200).send("Categoría eliminada exitosamente");
    }
  } catch (error) {
    console.error("Error al eliminar categoría:", error);
    res.status(500).send("Error al eliminar categoría");
  }
});

export default router;
