/**
 * Home controller.
 *
 * @author Maria Fredriksson
 * @version 1.0.0
 */

import { Snippet } from '../models/snippet.js'

/**
 * Encapsulates a controller.
 */
export class HomeController {
  /**
   * Renders a view and sends the rendered HTML string as an HTTP response.
   * index GET.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    try {
      const viewData = {
        snippets: (await Snippet.find())
          .map(snippet => snippet.toObject())
      }
      res.render('home/index', { viewData })
    } catch (error) {
      next(error)
    }
  }

  // TODO: The old way. Se vad som kan behövas ha kvar sen
  //* next is included as an parameter so that later on some middleware can be added eg for error handling or authentication
  // index (req, res, next) {
  //   //* Renders a template ejs-file that is in home/index, and sends the response as a done HTML page to the client
  //   //* res.render only works if a template engine (like ejs) is used and there is a specific structure for folders and files
  //   //* See in server.js for how ejs finds where to look for the templates
  //   res.render('home/index')
  // }
}
