/**
 * Snippets routes.
 *
 * @author Maria Fredriksson
 * @version 1.0.0
 */

import express from 'express'
import { UsersController } from '../controllers/users-controller.js'

export const router = express.Router()

const controller = new UsersController()

// router.get('/', (req, res, next) => controller.index(req, res, next))

router.get('/create', (req, res, next) => controller.create(req, res, next))
router.post('/create', (res, req, next) => controller.createPost(res, req, next))

router.get('/login', (req, res, next) => controller.login(req, res, next))
router.post('/login', (res, req, next) => controller.loginPost(res, req, next))

router.get('/logout', (req, res, next) => controller.logout(req, res, next))
router.post('/logout', (res, req, next) => controller.logoutPost(res, req, next))
