package api

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/mremperorx/sellify/db"
	"github.com/mremperorx/sellify/entity"
)

func SignUpRequest(c *fiber.Ctx) error {
	var body entity.SignUpRequest

	if err := c.BodyParser(&body); err != nil {
		return c.Status(http.StatusBadRequest).SendString("Faild to create account")
	}

	result, message := db.StoreUser(&body)
	if result {
		return c.Status(http.StatusOK).SendString(message)
	}
	return c.Status(http.StatusBadRequest).SendString(message)
}
