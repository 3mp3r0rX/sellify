package db

import (
	"database/sql"
	"fmt"

	"github.com/mremperorx/sellify/entity"
	"golang.org/x/crypto/bcrypt"
)

func StoreUser(user *entity.SignUpRequest) (bool, string) {
	var err error
	email := user.Email
	userName := user.UserName
	password, err := bcrypt.GenerateFromPassword([]byte(user.Password), 10)

	if err != nil {
		return false, "Failed to hash the password"
	}
	query := "INSERT INTO users (user_name, user_email, user_password) values ($1, $2, $3)"

	_, err = DB.Exec(query, userName, email, password)

	if err != nil {
		fmt.Println(err)
		return false, "Account already exists"
	}

	return true, "Signup Successfuly"
}

func ValidateIfUserExists(email string) (int, error) {
	query := "SELECT id FROM users WHERE user_email = $1"
	var id int
	err := DB.QueryRow(query, email).Scan(&id)
	if err != nil {
		if err == sql.ErrNoRows {
			return 0, nil
		}
		return 0, err
	}
	return id, nil
}

func GetUserPassword(email string) string {
	query := "SELECT user_password FROM users WHERE user_email = $1"
	row := DB.QueryRow(query, email)
	var pass string
	err := row.Scan(&pass)
	if err != nil {
		return ""
	}
	return pass
}
