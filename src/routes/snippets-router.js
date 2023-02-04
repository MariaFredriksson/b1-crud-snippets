/**
 * Snippets routes.
 *
 * @author Maria Fredriksson
 * @version 1.0.0
 */

import express from 'express'
import { SnippetsController } from '../controllers/snippets-controller.js'

export const router = express.Router()

const controller = new SnippetsController()

// Map HTTP verbs and route paths to controller action methods.

router.get('/', (req, res, next) => controller.index(req, res, next))

router.get('/create', controller.authorizeLoggedin, controller.create)
router.post('/create', (req, res, next) => controller.createPost(req, res, next))

router.get('/:id/update', controller.authorizeUser, controller.update)
router.post('/:id/update', (req, res, next) => controller.updatePost(req, res, next))

router.get('/:id/delete', controller.authorizeUser, controller.delete)
router.post('/:id/delete', (req, res, next) => controller.deletePost(req, res, next))
