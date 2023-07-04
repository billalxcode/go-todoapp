package controller

import (
	"go-server/src/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type CreateTaskInput struct {
	Task      string `json:"task"`
	Completed bool   `json:"completed"`
}

type UpdateTaskCompletedInput struct {
	Completed bool `json:"completed"`
}

type UpdateTaskInput struct {
	Task      string `json:"task"`
	Completed bool   `json:"completed"`
}

func CreateTodo(context *gin.Context) {
	var data CreateTaskInput
	err := context.ShouldBindJSON(&data)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	task := models.Task{}
	task.Task = data.Task
	task.Completed = data.Completed

	db := context.MustGet("db").(*gorm.DB)
	db.Create(&task)

	context.JSON(http.StatusOK, gin.H{"data": task})
}

func FindTask(context *gin.Context) {
	var task models.Task

	db := context.MustGet("db").(*gorm.DB)
	data := db.Where("id = ?", context.Param("id")).First(&task)
	if data.Error != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Data tidak ditemukan!"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"data": task})
}

func GetAllTodos(context *gin.Context) {
	var tasks []models.Task

	db := context.MustGet("db").(*gorm.DB)
	db.Find(&tasks)

	context.JSON(http.StatusOK, gin.H{"data": tasks})
}

func UpdateTask(context *gin.Context) {
	db := context.MustGet("db").(*gorm.DB)
	var task models.Task
	data := db.Where("id = ?", context.Param("id")).First(&task)
	if data.Error != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Data tidak ditemukan!"})
		return
	}

	// validate input
	var input UpdateTaskInput
	err := context.ShouldBindJSON(&input)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var updatedInput models.Task
	updatedInput.Task = input.Task
	updatedInput.Completed = input.Completed

	db.Model(&task).Updates(updatedInput)

	context.JSON(http.StatusOK, gin.H{"data": task})
}

func DeleteTask(context *gin.Context) {
	db := context.MustGet("db").(*gorm.DB)
	var task models.Task
	data := db.Where("id = ?", context.Param("id")).First(&task)
	if data.Error != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Data tidak ditemukan!"})
		return
	}
	db.Delete(&task)
	context.JSON(http.StatusOK, gin.H{"data": true})
}

func CompletedTask(context *gin.Context) {
	db := context.MustGet("db").(*gorm.DB)
	var task models.Task
	data := db.Where("id = ?", context.Param("id")).First(&task)
	if data.Error != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Data tidak ditemukan!"})
		return
	}

	// validate data
	var input UpdateTaskCompletedInput
	err := context.ShouldBindJSON(&input)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"data": err.Error()})
		return
	}

	var updatedInput UpdateTaskInput
	updatedInput.Task = task.Task
	updatedInput.Completed = input.Completed

	db.Model(&task).Updates(&updatedInput)
	context.JSON(http.StatusOK, gin.H{"data": "Data has been updated"})
}
