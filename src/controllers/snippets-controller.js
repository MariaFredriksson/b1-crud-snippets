/**
 * Module for the SnippetsController.
 *
 * @author Maria Fredriksson
 * @version 1.0.0
 */

import { Snippet } from '../models/snippet.js'

/**
 * Encapsulates a controller.
 */
//* Class with different methods, where each method hanlde a http requests that comes though a route
export class SnippetsController {
  /**
   * Displays a list of snippets.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  //* This method is called when the url ends with just '/snippets'
  async index (req, res, next) {
    try {
      const viewData = {
        //* Uses the mongoose method find() to get all the snippets from the database
        //* Then uses map to take what is returned and turn it into an array of objects in plain javascript
        snippets: (await Snippet.find())
          .map(snippet => snippet.toObject())
      }

      //* Tells which file (with sort of html code) to show to the user, and also sends the snippets - the viewData which is the array objects just created - so the snippets also can be shown to the user
      res.render('snippets/index', { viewData })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Returns a HTML form for creating a new snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async create (req, res) {
    res.render('snippets/create')
  }

  /**
   * Creates a new snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async createPost (req, res) {
    console.log(req.body)
    try {
      const snippet = new Snippet({
        //* Takes the snippettext from the request body and sets it as snippettext in the new snippet
        snippettext: req.body.snippettext,
        // ^^ Can I add the author like this...? Yes
        author: req.session.user
      })

      await snippet.save()

      //* If the save was successful, the code continues here and sends a flash message to the user
      req.session.flash = { type: 'success', text: 'The snippet was created successfully.' }
      //* Sends the user back to the page snippets/
      res.redirect('.')

      //* If there is an error during the save, the code goes here
    } catch (error) {
      if (error.message.includes('is longer than the maximum allowed length (1000)')) {
        error.message = 'The snippet is longer than the maximum allowed length (1000).'
      }
      //* Displays an error flash message to the user
      req.session.flash = { type: 'danger', text: error.message }
      //* Redirects the user to the create page, so they can try again
      res.redirect('./create')
    }
  }

  /**
   * Returns a HTML form for updating a snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async update (req, res) {
    try {
      const snippet = await Snippet.findById(req.params.id)

      res.render('snippets/update', { viewData: snippet.toObject() })
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('..')
    }
  }

  /**
   * Updates a specific snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async updatePost (req, res) {
    try {
      const snippet = await Snippet.findById(req.params.id)

      if (snippet) {
        snippet.snippettext = req.body.snippettext
        snippet.done = req.body.done === 'on'

        await snippet.save()

        req.session.flash = { type: 'success', text: 'The snippet was updated successfully.' }
      } else {
        req.session.flash = {
          type: 'danger',
          text: 'The snippet you attempted to update was removed by another user after you got the original values.'
        }
      }
      res.redirect('..')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('./update')
    }
  }

  /**
   * Returns a HTML form for deleting a snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async delete (req, res) {
    try {
      const snippet = await Snippet.findById(req.params.id)

      res.render('snippets/delete', { viewData: snippet.toObject() })
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('..')
    }
  }

  /**
   * Deletes the specified snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async deletePost (req, res) {
    try {
      await Snippet.findByIdAndDelete(req.body.id)

      req.session.flash = { type: 'success', text: 'The snippet was deleted successfully.' }
      res.redirect('..')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('./delete')
    }
  }

  /**
   * Middleware to check if the user is authorized to access the resource.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   *
   * @returns {undefined}
   */
  async authorizeLoggedin (req, res, next) {
    // If the user is not logged in
    if (!req.session.user) {
      const error = new Error('Forbidden')
      error.status = 403
      return next(error)
    }

    // If the user is logged in
    next()
  }

  /**
   * Middleware to check if the user is authorized to access the resource.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   *
   * @returns {undefined}
   */
  async authorizeUser (req, res, next) {
    try {
      const snippet = await Snippet.findById(req.params.id)

      // If the user is not the author
      if (req.session.user !== snippet.author) {
        const error = new Error('Forbidden')
        error.status = 403
        return next(error)
      }
      next()
    } catch (error) {
      next(error)
    }
  }
}
