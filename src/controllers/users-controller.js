/**
 * Module for the UsersController.
 *
 * @author Maria Fredriksson
 * @version 1.0.0
 */

import { User } from '../models/user.js'

/**
 * Encapsulates a controller.
 */
export class UsersController {
  /**
   * TODO: Skriv nåt bra här.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  create (req, res) {
    res.render('users/create')
  }

  /**
   * TODO: Skriv nåt bra här.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async createPost (req, res, next) {
    try {
      const user = new User({
        username: req.body.username,
        password: req.body.password
      })

      await user.save()

      req.session.flash = { type: 'success', text: `Welcome ${user.username}!` }
      res.redirect('./login')
    } catch (error) {
      if (error.message.includes('E11000 duplicate key error collection')) {
        error.message = 'The username is already taken. Please try another one.'
      }
      //* Displays an error flash message to the user
      req.session.flash = { type: 'danger', text: error.message }
      //* Redirects the user to the create page, so they can try again
      res.redirect('./create')
    }
  }

  /**
   * TODO: Skriv nåt bra här.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  login (req, res) {
    res.render('users/login')
  }

  /**
   * TODO: Skriv nåt bra här.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async loginPost (req, res, next) {
    try {
      const user = await User.authenticate(req.body.username, req.body.password)
      req.session.regenerate(() => {
        // Vad sk hända när användaren har loggat in?

        // Skicka med något för att säga att användaren är inloggad...?
        // ^^ Går det text att sätta något eget påhitta såhär:
        req.session.user = user.username

        // Testar
        req.session.flash = { type: 'success', text: `Welcome ${user.username}!` }
        res.redirect('../snippets')
      })
    } catch (error) {
      req.session.flash = { type: 'danger', text: 'Login failed. Please try again' }
      res.redirect('./login')
    }
  }

  /**
   * TODO: Skriv nåt bra här.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  logout (req, res) {
    res.render('users/logout')
  }

  /**
   * TODO: Skriv nåt bra här.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async logoutPost (req, res, next) {
    try {
      req.session.destroy((err) => {
        if (err) {
          throw err
        }
        //! Hur kan jag veta att cookien verkligen har tagits bort?
        res.clearCookie('connect.sid')

        // ^^ Är det vettigt att lägga denna delete här...? Nope... Sessionen tas ju bort
        // delete req.session.user

        // req.session.flash = { type: 'success', text: 'Bye, bye!' }
        res.redirect('..')
      })
    } catch (error) {
      next(error)
    }
  }
}

// Använda paketet http error för att kasta undantag vid authorize fel

// CRUD anteckningar från handledning
// Skapa egen route fil
// Login vy (login när man ska logga in och log ut när man ska logga ut)
// Separera
// Controllerkoden måste exekveras när knappen klickas på av användaren
// Om det går bra så ska vi skapa en session

// Sista steget är om anvävsteb ska kunna. Vad i applikationen kräver att user är inloggade? Styrs i routsen. Om du inte är inloggad så är routsen skyddade, tex create. Authorise. Vilken typ av användare är du? Admin, premium? If satsen. Äger användaren snippet? Inloggad = skapa snippet. If sats kompletteras med kontroll, äger användaren snippets. Då kan hen också redigera eller ta bort.

// 404, men för vanliga användare är det bättre att dölja knappar också när de ändå inte kan använda dem. Kan testa först att ha alla knappar synliga för att testa felkoderna, för att sedan dölja/ta bort knapparna. Olika felkoder beroende på situation.
