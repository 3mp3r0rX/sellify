package middleware

import (
	"log"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/session"
)

func Authentication(store *session.Store) fiber.Handler {
	return func(c *fiber.Ctx) error {
		sess, err := store.Get(c)
		if err != nil {
			return c.Status(http.StatusBadRequest).SendString("Failed to retrieve session")
		}

		data := sess.Get("user_id")
		log.Println(sess.Keys())

		if data == nil {
			return c.Status(http.StatusUnauthorized).SendString("Unauthorized access")
		}

		user_id, ok := data.(int)

		if !ok {
			return c.Status(http.StatusInternalServerError).SendString("Error validating user")
		}

		if user_id == 0 {
			return c.Status(http.StatusUnauthorized).SendString("Unauthorized: User does not exist")
		}
		c.Locals("user_id", user_id)
		return c.Next()
	}
}
