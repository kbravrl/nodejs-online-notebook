const request = require("supertest"); 
const express = require("express"); 
const bodyParser = require("body-parser"); 
const notesRoutes = require("../routes/notes"); 

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "pug");
app.use("/notes", notesRoutes);

describe("Notlar Rotaları", () => {

  it("Tüm notları listelemeli", async () => {
    const res = await request(app).get("/notes"); // Sending GET request to the /notes route..
    expect(res.statusCode).toEqual(200); // Verifying that the status code is 200.
    expect(res.text).toContain("Notlar");  // Verifying that the response contains the word "Notes".
  });

  it("Not ekleme formunu göstermeli", async () => {
    const res = await request(app).get("/notes/add"); // Sending GET request to the /notes/add route.
    expect(res.statusCode).toEqual(200); // Verifying that the status code is 200.
    expect(res.text).toContain("Yeni Not Ekle"); // Verifying that the response contains the phrase 'Add New Note'.
  });

  it("Mevcut olmayan bir notu düzenleme sayfasına yönlendirmemeli", async () => {
    const res = await request(app).get("/notes/edit/999"); // Sending GET request to the /notes/edit/999 route.
    expect(res.statusCode).toEqual(302); // Verifying that the status code is 302 (redirect).
    expect(res.headers.location).toBe("/notes"); // Verifying that the redirect location is /notes..
  });
  
});
