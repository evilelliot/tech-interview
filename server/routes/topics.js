import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Topics
 *   description: API de gestión de temáticas
 * components:
 *   schemas:
 *     Topic:
 *       type: object
 *       required:
 *         - name
 *         - permissions
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único de la temática
 *         name:
 *           type: string
 *           description: Nombre de la temática
 *         permissions:
 *           type: array
 *           description: Permisos de contenido (imágenes, videos, textos)
 *           items:
 *             type: string
 *       example:
 *         _id: 60fc6b0f13557d001fe95b7c
 *         name: Ciencias
 *         permissions:
 *           - imágenes
 *           - videos
 *           - textos
 */

// Listar todas las temáticas
router.get("/", async (req, res) => {
  try {
    const collection = await db.collection("topic");
    const topics = await collection.find({}).toArray();
    res.status(200).json(topics);
  } catch (error) {
    console.error("Error al obtener temáticas:", error);
    res.status(500).send("Error al obtener temáticas");
  }
});

// Obtener una temática por su ID
router.get("/:id", async (req, res) => {
  try {
    const collection = await db.collection("topic");
    const topic = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!topic) {
      res.status(404).send("Temática no encontrada");
    } else {
      res.status(200).json(topic);
    }
  } catch (error) {
    console.error("Error al obtener temática:", error);
    res.status(500).send("Error al obtener temática");
  }
});

// Crear una nueva temática
router.post("/", async (req, res) => {
  try {
    const newTopic = {
      name: req.body.name,
      permissions: req.body.permissions // Permisos de contenido: permite imágenes, permite videos, permite textos
    };
    const collection = await db.collection("topic");
    const result = await collection.insertOne(newTopic);
    res.status(204).json(result);
  } catch (error) {
    console.error("Error al crear temática:", error);
    res.status(500).send("Error al crear temática");
  }
});

// Actualizar una temática por su ID
router.patch("/:id", async (req, res) => {
  try {
    const collection = await db.collection("topic");
    const query = { _id: new ObjectId(req.params.id) };
    const update = {
      $set: {
        name: req.body.name,
        permissions: req.body.permissions
      }
    };
    const result = await collection.updateOne(query, update);
    if (result.modifiedCount === 0) {
      res.status(404).send("Temática no encontrada");
    } else {
      res.status(200).send("Temática actualizada exitosamente");
    }
  } catch (error) {
    console.error("Error al actualizar temática:", error);
    res.status(500).send("Error al actualizar temática");
  }
});

// Eliminar una temática por su ID
router.delete("/:id", async (req, res) => {
  try {
    const collection = await db.collection("topic");
    const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      res.status(404).send("Temática no encontrada");
    } else {
      res.status(200).send("Temática eliminada exitosamente");
    }
  } catch (error) {
    console.error("Error al eliminar temática:", error);
    res.status(500).send("Error al eliminar temática");
  }
});

// Obtener temas por temática
router.get("/tematica/:tematica", async (req, res) => {
  try {
    const tematica = req.params.tematica;
    const collection = await db.collection("topic");
    const topics = await collection.find({ name: tematica }).toArray();
    res.status(200).json(topics);
  } catch (error) {
    console.error("Error al buscar temas por temática:", error);
    res.status(500).send("Error al buscar temas por temática");
  }
});


export default router;
