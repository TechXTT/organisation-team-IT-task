package models

import (
	"time"
)

type User struct {
	Id       uint   `json:"id"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password []byte `json:"-"`
}

type Workspace struct {
	Id     uint   `json:"id"`
	Name   string `json:"name"`
	UserId uint   `json:"uid"`
}

type Task struct {
	Id          uint      `json:"id"`
	Name        string    `json:"name"`
	Importance  int       `json:"importance"`
	Done        bool      `json:"done"`
	CreatedAt   time.Time `json:"created_at"`
	ExpiresAt   time.Time `json:"expires_at"`
	Note        string    `json:"note"`
	WorkspaceId uint      `json:"wsid"`
	UserId      uint      `json:"uid"`
}
