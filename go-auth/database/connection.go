package database

import (
	"database/sql" // package to encode and decode the json into struct and vice versa
	"fmt"          // models package where User schema is defined
	"log"          // used to access the request and response object of the api
	"os"           // used to read the environment variable

	"github.com/joho/godotenv" // package used to read the .env file
	_ "github.com/lib/pq"      // postgres golang driver
)

var DB *sql.DB

type response struct {
	ID      int64  `json:"id,omitempty"`
	Message string `json:"message,omitempty"`
}

func CreateConnection() {
	// load .env file
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalf("Error loading .env file")
	}
	var (
		host   = os.Getenv("DB_HOST")
		port   = os.Getenv("DB_PORT")
		user   = os.Getenv("DB_USER")
		pass   = os.Getenv("DB_PASS")
		dbname = os.Getenv("DB_NAME")
	)

	psqlInfo := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", host, port, user, pass, dbname)
	// Open the connection
	db, err := sql.Open("postgres", psqlInfo)

	if err != nil {
		panic(err)
	}

	// check the connection
	err = db.Ping()

	if err != nil {
		panic(err)
	}

	fmt.Println("Successfully connected!")
	// return the connection
	DB = db
}
