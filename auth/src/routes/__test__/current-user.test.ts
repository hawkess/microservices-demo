import request from "supertest";
import { app } from "../../app";

it("responds with details about the current user", async () => {
  const email = "test@test.com";
  const password = "password";
  const res = await request(app)
    .post("/api/users/signup")
    .send({ email, password });
  const cookie = res.get("Set-Cookie");
  const id = res.body.id;

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.id).toEqual(id);
});

it("responds with null if not authenticated", async () => {
  const response = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
