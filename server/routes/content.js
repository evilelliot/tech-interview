import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Multimedia Content
 *   description: API de gestión de contenido multimedia
 * components:
 *   schemas:
 *     Content:
 *       type: object
 *       required:
 *         - title
 *         - type
 *         - content
 *         - credits
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único del contenido multimedia
 *         title:
 *           type: string
 *           description: Título del contenido multimedia
 *         type:
 *           type: string
 *           description: Tipo de contenido multimedia (imagen, video, texto)
 *         content:
 *           type: string
 *           description: Contenido real del multimedia (URL, texto, etc.)
 *         credits:
 *           type: string
 *           description: Créditos del contenido multimedia (username)
 *       example:
 *         _id: 60fc6b0f13557d001fe95b7c
 *         title: Imagen1
 *         type: imagen
 *         content: https://example.com/imagen1.jpg
 *         credits: usuario1
 */

/**
 * @swagger
 * /content:
 *   get:
 *     summary: Obtiene todo el contenido multimedia
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Content'
 */

/**
 * @swagger
 * /content/{id}:
 *   get:
 *     summary: Obtiene contenido multimedia por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del contenido multimedia
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       404:
 *         description: Contenido multimedia no encontrado
 */

/**
 * @swagger
 * /content:
 *   post:
 *     summary: Crea nuevo contenido multimedia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Content'
 *     responses:
 *       204:
 *         description: Contenido multimedia creado exitosamente
 *       500:
 *         description: Error al crear contenido multimedia
 */

/**
 * @swagger
 * /content/{id}:
 *   patch:
 *     summary: Actualiza contenido multimedia por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del contenido multimedia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Content'
 *     responses:
 *       200:
 *         description: Contenido multimedia actualizado exitosamente
 *       404:
 *         description: Contenido multimedia no encontrado
 *       500:
 *         description: Error al actualizar contenido multimedia
 */

/**
 * @swagger
 * /content/{id}:
 *   delete:
 *     summary: Elimina contenido multimedia por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del contenido multimedia
 *     responses:
 *       200:
 *         description: Contenido multimedia eliminado exitosamente
 *       404:
 *         description: Contenido multimedia no encontrado
 *       500:
 *         description: Error al eliminar contenido multimedia
 */

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

// Obtener contenido multimedia por temática
router.get("/tematica/:tematica", async (req, res) => {
  try {
    const tematica = req.params.tematica;
    const collection = await db.collection("content");
    const multimediaPorTematica = await collection.find({ type: tematica }).toArray();
    res.status(200).json(multimediaPorTematica);
  } catch (error) {
    console.error("Error al obtener contenido multimedia por temática:", error);
    res.status(500).send("Error al obtener contenido multimedia por temática");
  }
});

export default router;
