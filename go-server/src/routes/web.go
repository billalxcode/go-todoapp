package routes

import (
	"go-server/src/controller"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Routes(db *gorm.DB) *gin.Engine {
	route := gin.Default()
	route.Use(func(context *gin.Context) {
		context.Set("db", db)
	})
	route.Use(cors.Default())

	route.GET("/tasks", controller.GetAllTodos)
	route.POST("/tasks", controller.CreateTodo)
	route.GET("/tasks/:id", controller.FindTask)
	route.PATCH("/tasks/:id", controller.UpdateTask)
	route.DELETE("/tasks/:id", controller.DeleteTask)
	route.PATCH("/tasks/:id/completed", controller.CompletedTask)
	route.Run(":1412")

	return route
}
