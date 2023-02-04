/**
 * Snippets routes.
 *
 * @author Maria Fredriksson
 * @version 1.0.0
 */

import express from 'express'
import { UsersController } from '../controllers/users-controller.js'
import { AuthorizationController } from '../controllers/authorization-controller.js'

export const router = express.Router()

const controller = new UsersController()
const authorizationController = new AuthorizationController()

// ^^ Kan allt bara gå dit...?
router.get('/', authorizationController.ifLoggedIn, controller.login)

router.get('/create', authorizationController.ifLoggedIn, controller.create)
router.post('/create', authorizationController.ifLoggedIn, controller.createPost)

router.get('/login', authorizationController.ifLoggedIn, controller.login)
router.post('/login', authorizationController.ifLoggedIn, controller.loginPost)

router.get('/logout', authorizationController.ifNOTLoggedIn, controller.logout)
router.post('/logout', authorizationController.ifNOTLoggedIn, controller.logoutPost)
