import { Router } from 'express';

import CreateDoctorService from '../services/CreateDoctorService';
import GetDoctorService from '../services/GetDoctorService';
import UpdateDoctorService from '../services/UpdateDoctorService';
import DeleteDoctorService from '../services/DeleteDoctorService';

const routes = new Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Doctor:
 *       type: object
 *       required:
 *         - doctor
 *         - crm
 *         - uf 
 *         - speciality
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the doctor
 *         crm:
 *           type: string
 *           description: The doctor's number on the Regional Council of Medicine
 *         uf:
 *           type: string
 *           description: The acronym for states
 *         speciality:
 *           type: string
 *           description: The medical specialty
 *       example:
 *         _id: 60ba6ec5c718f82c64a8fa05
 *         doctor: Mariana Leite Frisoni
 *         crm: 900389
 *         uf: RJ
 *         speciality: Gastroenterologista
 */

 /**
  * @swagger
  * tags:
  *   name: Doctors
  *   description: The doctors managing API
  */

/**
 * @swagger
 * /doctors:
 *   get:
 *     summary: Returns the list of all the doctors
 *     tags: [Doctors]
 *     responses:
 *       200:
 *         description: The list of the doctors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Doctor'
 */

routes.get('/', GetDoctorService.index);
routes.get('/doctors', GetDoctorService.index);

/**
 * @swagger
 * /doctors/{id}:
 *   get:
 *     summary: Get the doctor by id
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The doctor id
 *     responses:
 *       200:
 *         description: The doctor description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Doctor'
 *       404:
 *         description: The doctor was not found
 */

routes.get('/doctors/:id', GetDoctorService.show);

/**
 * @swagger
 * /doctors:
 *   post:
 *     summary: Create a new doctor
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Doctor'
 *     responses:
 *       200:
 *         description: The Doctor was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Doctor'
 *       500:
 *         description: Some server error
 */

routes.post('/doctors', CreateDoctorService.store);

/**
 * @swagger
 * /doctors/{id}:
 *  put:
 *    summary: Update the doctor by the id
 *    tags: [Doctors]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The doctor id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Doctor'
 *    responses:
 *      200:
 *        description: The doctor was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Doctor'
 *      404:
 *        description: The doctor was not found
 *      500:
 *        description: Some error happened
 */

routes.put('/doctors', UpdateDoctorService.update);

/**
 * @swagger
 * /doctors/{id}:
 *   delete:
 *     summary: Remove the doctor by id
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The doctor id
 * 
 *     responses:
 *       200:
 *         description: The doctor was deleted
 *       404:
 *         description: The doctor was not found
 */
routes.delete('/doctors/:id', DeleteDoctorService.delete);

export default routes;