package db

import (
	"database/sql"
	"fmt"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

var DB *sql.DB

func ConnectDB() {
	var err error
	err = godotenv.Load(".env")
	if err != nil {
		panic("failed to get variables from env")
	}

	connStr := os.Getenv("DB_CONN_STR")

	DB, err = sql.Open("postgres", connStr)

	if err != nil {
		fmt.Println(err)
		panic("Failed to connect to database")
	}

	err = DB.Ping()
	if err != nil {
		panic("Failed to reach the Database")
	}
}

func CreateTables() error {
	sqlBytes, err := os.ReadFile("Tables.sql")
	if err != nil {
		return fmt.Errorf("failed to read SQL file: %v", err)
	}
	sqlString := string(sqlBytes)

	_, err = DB.Exec(sqlString)
	if err != nil {
		return fmt.Errorf("failed to execute SQL commands: %v", err)
	}

	return nil
}

func InesrtDataInCategory() error {
	sqlBytes, err := os.ReadFile("insertcategories.sql")
	if err != nil {
		return fmt.Errorf("failed to read SQL file: %v", err)
	}
	sqlString := string(sqlBytes)

	_, err = DB.Exec(sqlString)
	if err != nil {
		return fmt.Errorf("failed to execute SQL commands: %v", err)
	}

	return nil
}
