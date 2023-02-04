// Generellt:
// Ska helmet användas...?

// Felhantering:
// Skapa felhantering för när för långa snippets läggs till. Det som skrivs sist i error message är: "is longer than the maximum allowed length (1000)."
// Gör en snygg hantering av 403 - if-sats i server.js + en ejs
// ^^ Använda paketet http error...?
// ^^ Ska post i router också ha authorization...?

// server.js:
// Kommentera tillbaka en del av felhanteringen

// Inloggning mm:
// Meddelande till användaren att användarnamn eller lösenord inte stämmer - EJ specificera vad exakt det är - visa ett flash-meddelande + skicka en 401 Unauthorized

// Vad ska hända?
// Kommer till startsidan - finns möjlighet att kolla på snippets eller logga in
// Logga in - möjlighet att skapa konto också
// Logga in --> läsa snippets + flash "Welcome username!"

// Inloggning:
// (Efter implementation av att skicka 403 etc) Dölja de olika knapparna beroende på inloggad eller ej

// Om jag hinner:
// Formatera snippets som kod
