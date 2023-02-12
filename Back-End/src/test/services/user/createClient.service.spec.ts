import request from "supertest";
import app from "../../../app";
import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";

describe("Testing the user routes", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be able to create a new user", async () => {
    const mockBody = {
        email: "test@mail.com",
        name: "Teste",
        phone: "(48)988605345"
    }

    const { status, body } = await request(app).post('/clients').send(mockBody)

    expect(status).toBe(201)
    expect(body).toHaveProperty("email", mockBody.email)
    expect(body).toHaveProperty("name", mockBody.name)
    expect(body).toHaveProperty("age", mockBody.phone)
    expect(body).toHaveProperty("created_at")
  });
});