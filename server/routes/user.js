import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Listar todos los users
router.get("/", async (req, res) => {
  try {
    const collection = await db.collection("users");
    const users = await collection.find({}).toArray();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener users:", error);
    res.status(500).send("Error al obtener users");
  }
});

// Obtener un usuario por su ID
router.get("/:id", async (req, res) => {
  try {
    const collection = await db.collection("users");
    const usuario = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!usuario) {
      res.status(404).send("Usuario no encontrado");
    } else {
      res.status(200).json(usuario);
    }
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).send("Error al obtener usuario");
  }
});

// Crear un nuevo usuario
router.post("/", async (req, res) => {
  try {
    const nuevoUsuario = {
      alias: req.body.alias,
      correo: req.body.correo,
      tipo: req.body.tipo // Tipo de usuario: Lector, Creador, Admin
    };
    const collection = await db.collection("users");
    const resultado = await collection.insertOne(nuevoUsuario);
    res.status(204).json(resultado);
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).send("Error al crear usuario");
  }
});

// Actualizar un usuario por su ID
router.patch("/:id", async (req, res) => {
  try {
    const collection = await db.collection("users");
    const query = { _id: new ObjectId(req.params.id) };
    const actualizacion = {
      $set: {
        alias: req.body.alias,
        correo: req.body.correo,
        tipo: req.body.tipo
      }
    };
    const resultado = await collection.updateOne(query, actualizacion);
    if (resultado.modifiedCount === 0) {
      res.status(404).send("Usuario no encontrado");
    } else {
      res.status(200).send("Usuario actualizado exitosamente");
    }
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).send("Error al actualizar usuario");
  }
});

// Eliminar un usuario por su ID
router.delete("/:id", async (req, res) => {
  try {
    const collection = await db.collection("users");
    const resultado = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
    if (resultado.deletedCount === 0) {
      res.status(404).send("Usuario no encontrado");
    } else {
      res.status(200).send("Usuario eliminado exitosamente");
    }
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).send("Error al eliminar usuario");
  }
});

export default router;
