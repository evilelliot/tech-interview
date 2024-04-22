// Importar express y otras dependencias necesarias
import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Listar todos los usuarios
router.get("/", async (req, res) => {
  try {
    const collection = await db.collection("users");
    const users = await collection.find({}).toArray();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).send("Error al obtener usuarios");
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

// Crear un nuevo usuario si no existe previamente
router.post("/", async (req, res) => {
  try {
    // Verificar si ya existe un usuario con el mismo correo electrónico
    const collection = await db.collection("users");
    const existingUser = await collection.findOne({ correo: req.body.correo });
    if (existingUser) {
      return res.status(409).send("Ya existe un usuario con este correo electrónico");
    }

    // Crear el nuevo usuario si no existe previamente
    const nuevoUsuario = {
      alias: req.body.alias,
      correo: req.body.correo,
      tipo: req.body.tipo // Tipo de usuario: Lector, Creador, Admin
    };
    const resultado = await collection.insertOne(nuevoUsuario);
    res.status(204).json(resultado);
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).send("Error al crear usuario");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { correo, alias } = req.body;

    // Verificar si existe un usuario con el correo electrónico y el alias proporcionados
    const collection = await db.collection("users");
    const usuario = await collection.findOne({ correo, alias });

    if (!usuario) {
      return res.status(404).send("Usuario no encontrado");
    }

    // Si se encuentra el usuario, se puede realizar cualquier lógica de inicio de sesión aquí

    // Por ahora, simplemente devolvemos el usuario encontrado como respuesta
    res.status(200).json(usuario);
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).send("Error al iniciar sesión");
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
