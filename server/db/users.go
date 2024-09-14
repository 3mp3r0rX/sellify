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

func ValidateUser(email string) (bool, error) {
	query := "SELECT 1 FROM users WHERE user_email = $1"
	var exists bool
	row := DB.QueryRow(query, email)
	err := row.Scan(&exists)
	if err == sql.ErrNoRows {
		return false, nil
	}
	if err != nil {
		return false, err
	}
	return true, nil
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
