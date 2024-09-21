const request = require('supertest');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const authRoutes = require('../routes/auth');
const profileRoutes = require('../routes/profile');

const app = express();

// Configuring the Express application
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({ secret: 'secret-key', resave: false, saveUninitialized: true })
);

app.set('view engine', 'pug');
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

describe('Profil Rotaları', () => {
  let agent;

  beforeEach(async () => {
    agent = request.agent(app);
  
    await agent
      .post('/auth/login') // Sending POST request to the /auth/login route.
      .send({ username: 'kubra', password: '1234' }); // Sending correct credentials.
  });
  
  it('Yanlış eski şifre ile profil bilgilerini güncellemeyi test etme', async () => {
    const res = await agent
      .post('/profile/update') // Sending POST request to the /profile/update route.
      .send({
        username: 'kubra',
        oldPassword: 'wrong_password', // Sending an incorrect old password.
        newPassword: '5678',
      });
  
    expect(res.statusCode).toEqual(200); // Verifying that the status code is 200.
    expect(res.text).toContain('Eski şifre yanlış.'); // Verifying that the response contains the error message.
  });
  

  
});
