const request = require("supertest");
const express = require("express");
const session = require("express-session");
const authRoutes = require("../routes/auth");

const app = express();

// Configuring the Express application
app.use(express.urlencoded({ extended: false }));

app.use(
  session({ secret: "secret-key", resave: false, saveUninitialized: true })
);

app.set("view engine", "pug");

app.use("/auth", authRoutes);

describe("Kimlik Doğrulama Rotaları", () => {
  it("Giriş sayfasını göstermeli", async () => {
    const res = await request(app).get("/auth/login"); // Sending GET request to the /auth/login route.

    expect(res.statusCode).toEqual(200); // Verifying that the status code is 200.
    expect(res.text).toContain("Giriş Yap"); // Verifying that the response contains the phrase 'Log In'.
  });
});

it("Yanlış kimlik bilgileriyle giriş yapmamalı", async () => {
    const res = await request(app)
      .post("/auth/login") // Sending POST request to the /auth/login route.
      .send({ username: "kubra", password: "yanlis" }); // Sending incorrect credentials.
  
    expect(res.statusCode).toEqual(401); // Verifying that the status code is 401.
    expect(res.text).toContain("Geçersiz kullanıcı adı ve şifre"); // Verifying that the response contains the error message.
  });
  
  it("Çıkış yapmalı", async () => {
    const agent = request.agent(app); // Creating a SuperTest agent to log in.
  
    await agent
      .post("/auth/login") // Sending POST request to the /auth/login route.
      .send({ username: "kubra", password: "1234" }); // Sending correct credentials.
  
    const res = await agent.get("/auth/logout"); // Sending GET request to /auth/logout as a logged-in user.
    
    expect(res.statusCode).toEqual(302); // Verifying that the status code is 302 (redirect).
    expect(res.headers.location).toBe("/auth/login"); // Verifying that the redirect location is /auth/login.
  });
  