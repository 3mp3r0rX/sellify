package api

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/mremperorx/sellify/db"
	"github.com/mremperorx/sellify/entity"
)

func PostRequest() fiber.Handler {
	return func(c *fiber.Ctx) error {
		var body entity.Post
		err := c.BodyParser(&body)
		if err != nil {
			return c.Status(http.StatusServiceUnavailable).SendString("Failed parsing body request")
		}

		if err != nil {
			return c.Status(http.StatusUnauthorized).SendString("Failed retriving the session")
		}

		data := c.Locals("user_id")

		if data == nil {
			return c.Status(fiber.StatusUnauthorized).SendString("User ID not found in context")
		}

		userID, ok := data.(int)

		if !ok {
			return c.Status(fiber.StatusInternalServerError).SendString("Error casting user ID")
		}

		result, message := db.StorePost(&body, userID)

		if result {
			return c.Status(http.StatusOK).SendString(message)
		}

		return c.Status(http.StatusBadRequest).SendString(message)
	}
}
