package api

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/session"
	"github.com/mremperorx/sellify/db"
	"github.com/mremperorx/sellify/entity"
	"golang.org/x/crypto/bcrypt"
)

func LoginRequest(store *session.Store) fiber.Handler {
	return func(c *fiber.Ctx) error {
		var body entity.LoginRequest
		err := c.BodyParser(&body)
		if err != nil {
			return c.Status(http.StatusUnauthorized).SendString("")
		}

		email := body.Email

		exists, err := db.ValidateUser(email)

		if exists {
			if err != nil {
				return c.Status(http.StatusBadRequest).SendString("Something went wrong please try again later")
			}

			hashedPass := db.GetUserPassword(email)

			if hashedPass == "" {
				return c.Status(http.StatusBadRequest).SendString("Something went wrong please try again later")
			}

			err := bcrypt.CompareHashAndPassword([]byte(hashedPass), []byte(body.Password))

			if err == bcrypt.ErrMismatchedHashAndPassword {
				return c.Status(http.StatusUnauthorized).SendString("Wrong email or password")
			}
			if err != nil {
				return c.Status(http.StatusBadRequest).SendString("Something went wrong please try again later")
			}
			sess, err := store.Get(c)

			if err != nil {
				return c.Status(http.StatusBadRequest).SendString("Something went wrong please try again later")
			}

			sess.Set("user_email", email)
			sess.Save()
			return c.Status(http.StatusOK).SendString("Login successful")
		}
		if !exists && err == nil {
			return c.Status(http.StatusUnauthorized).SendString("User not found")
		}
		return c.Status(http.StatusBadRequest).SendString("Something went wrong please try again later")

	}
}
