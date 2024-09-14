package db

import (
	"log"

	"github.com/mremperorx/sellify/entity"
)

func StorePost(post *entity.Post, user_id int) (bool, string) {
	log.Println(post.Category)
	query := "INSERT INTO post (user_id, category_id, title, content, price) VALUES ($1, $2, $3, $4, $5)"
	category_id := GetCategoryId(post.Category)
	_, err := DB.Exec(query, user_id, category_id, post.Title, post.Description, post.Price)
	if err != nil {
		return false, "Failed to store the post"
	}
	return true, "Success"
}
