package config

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func ConnectDatabase() *gorm.DB {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Failed to load env file")
	}

	hostname := os.Getenv("DATABASE_HOSTNAME")
	port := os.Getenv("DATABASE_PORT")
	username := os.Getenv("DATABASE_USERNAME")
	password := os.Getenv("DATABASE_PASSWORD")
	dbname := os.Getenv("DATABASE_NAME")

	database_source := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=true&loc=Local", username, password, hostname, port, dbname)
	db, err := gorm.Open(mysql.Open(database_source), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect mysql")
	} else {
		fmt.Println("Success connected to database")
	}
	return db
}

func DisconnectDatabase(db *gorm.DB) {
	sql, err := db.DB()
	if err != nil {
		log.Fatal("Failed to kill database connection")
	}
	sql.Close()
}
