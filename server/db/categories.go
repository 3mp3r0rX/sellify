package db

import (
	"github.com/gofiber/fiber/v2/log"
)

func GetCategoryId(name string) int {
	query := "SELECT id FROM categories WHERE category_name = $1"
	var id int
	row := DB.QueryRow(query, name)
	err := row.Scan(&id)

	if err != nil {
		log.Errorf("Something Wrong in retreving category: %v", err)
	}
	return id
}
