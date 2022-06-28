package controllers

import (
	"time"

	"github.com/TechXTT/organisation-team-IT-task/go-rest/database"
	"github.com/TechXTT/organisation-team-IT-task/go-rest/models"

	"strconv"

	"github.com/gofiber/fiber/v2"
)

func CreateTask(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	uid, _ := strconv.ParseUint(data["uid"], 10, 64)
	wsid, _ := strconv.ParseUint(data["wsid"], 10, 64)
	importance, _ := strconv.Atoi(data["importance"])
	done := data["done"] == "true"
	created_at, _ := time.Parse("2006-01-02", data["created_at"])
	expires_at, _ := time.Parse("2006-01-02", data["expires_at"])

	task := models.Task{
		Name:        data["name"],
		UserId:      uint(uid),
		WorkspaceId: uint(wsid),
		Importance:  importance,
		Done:        done,
		CreatedAt:   created_at,
		ExpiresAt:   expires_at,
		Note:        data["note"],
	}

	sqlStatement := `INSERT INTO tasks (name, uid, wsid, importance, done, created_at, expires_at, note) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`
	id := 0

	err := database.DB.QueryRow(sqlStatement, task.Name, task.UserId, task.WorkspaceId, task.Importance, task.Done, task.CreatedAt, task.ExpiresAt, task.Note).Scan(&id)
	if err != nil {
		return c.JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.JSON(task)
}

func GetTasks(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	uid, _ := strconv.ParseUint(data["uid"], 10, 64)
	wsid, _ := strconv.ParseUint(data["wsid"], 10, 64)

	sqlStatement := `SELECT * FROM tasks WHERE uid = $1 AND wsid = $2`
	rows, err := database.DB.Query(sqlStatement, uint(uid), uint(wsid))
	if err != nil {
		return c.JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	tasks := []models.Task{}

	for rows.Next() {
		var task models.Task

		err := rows.Scan(&task.Id, &task.Name, &task.UserId, &task.WorkspaceId, &task.Importance, &task.Done, &task.CreatedAt, &task.ExpiresAt, &task.Note)
		if err != nil {
			return c.JSON(fiber.Map{
				"message": err.Error(),
			})
		}

		tasks = append(tasks, task)
	}

	return c.JSON(tasks)
}

func UpdateTask(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	id, _ := strconv.ParseUint(data["id"], 10, 64)
	uid, _ := strconv.ParseUint(data["uid"], 10, 64)
	wsid, _ := strconv.ParseUint(data["wsid"], 10, 64)
	importance, _ := strconv.Atoi(data["importance"])
	done := data["done"] == "true"
	created_at, _ := time.Parse("2006-01-02", data["created_at"])
	expires_at, _ := time.Parse("2006-01-02", data["expires_at"])

	task := models.Task{
		Id:          uint(id),
		Name:        data["name"],
		UserId:      uint(uid),
		WorkspaceId: uint(wsid),
		Importance:  importance,
		Done:        done,
		CreatedAt:   created_at,
		ExpiresAt:   expires_at,
		Note:        data["note"],
	}

	sqlStatement := `UPDATE tasks SET name = $1, uid = $2, wsid = $3, importance = $4, done = $5, created_at = $6, expires_at = $7, note = $8 WHERE id = $9`

	_, err := database.DB.Exec(sqlStatement, task.Name, task.UserId, task.WorkspaceId, task.Importance, task.Done, task.CreatedAt, task.ExpiresAt, task.Note, task.Id)
	if err != nil {
		return c.JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.JSON(task)
}

func DeleteTask(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	id, _ := strconv.ParseUint(data["id"], 10, 64)

	sqlStatement := `DELETE FROM tasks WHERE id = $1`

	_, err := database.DB.Exec(sqlStatement, uint(id))
	if err != nil {
		return c.JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"message": "success",
	})
}
