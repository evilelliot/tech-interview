import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Content
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
 *           description: Tipo de contenido (imagen, video, texto)
 *         content:
 *           type: string
 *           description: Contenido real del multimedia (URL, texto, etc.)
 *         credits:
 *           type: string
 *           description: Créditos del contenido (nombre del autor, usuario, etc.)
 *       example:
 *         _id: 60fc6b0f13557d001fe95b7c
 *         title: Mi imagen
 *         type: imagen
 *         content: https://example.com/mi-imagen.jpg
 *         credits: usuario123
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
