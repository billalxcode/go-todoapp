package main

import (
	"go-server/src/config"
	"go-server/src/models"
	"go-server/src/routes"

	"gorm.io/gorm"
)

var (
	db *gorm.DB = config.ConnectDatabase()
)

func main() {
	// db.Migrator().CreateTable(&models.Task{})
	db.AutoMigrate(&models.Task{})

	defer config.DisconnectDatabase(db)

	routes.Routes(db)
}
