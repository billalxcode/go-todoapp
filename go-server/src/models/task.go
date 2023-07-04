package models

import "time"

type Task struct {
	ID        uint      `json:"id" gorm:"primary_key"`
	Task      string    `json:"task"`
	Completed bool      `json:"completed"`
	CreatedAt time.Time `gorm:"autoCreateTime:true" json:"created_at"`
}
