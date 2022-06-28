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
	expires_at, _ := time.Parse("2006-01-02", data["expires_at"])

	task := models.Task{
		Name:        data["name"],
		UserId:      uint(uid),
		WorkspaceId: uint(wsid),
		ExpiresAt:   expires_at,
		Note:        data["note"],
	}

	sqlStatement := `INSERT INTO tasks (name, uid, wsid, expire_at, note) VALUES ($1, $2, $3, $4, $5) RETURNING id`
	id := 0

	err := database.DB.QueryRow(sqlStatement, task.Name, task.UserId, task.WorkspaceId, task.ExpiresAt, task.Note).Scan(&id)
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

	wsid, _ := strconv.ParseUint(data["wsid"], 10, 64)
	done := data["done"] == "true"

	task := models.Task{
		WorkspaceId: uint(wsid),
		Done:        done,
	}

	sqlStatement := `SELECT * FROM tasks WHERE wsid = $1 AND done = $2`
	rows, err := database.DB.Query(sqlStatement, task.WorkspaceId, task.Done)
	if err != nil {
		return c.JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	tasks := []models.Task{}

	for rows.Next() {
		var task models.Task

		err := rows.Scan(&task.Id, &task.Name, &task.Done, &task.CreatedAt, &task.ExpiresAt, &task.Note, &task.WorkspaceId, &task.UserId)
		if err != nil {
			return c.JSON(fiber.Map{
				"message": err.Error(),
			})
		}

		tasks = append(tasks, task)
	}

	return c.JSON(tasks)
}

func GetTask(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	id, _ := strconv.ParseUint(data["id"], 10, 64)
	wsid, _ := strconv.ParseUint(data["wsid"], 10, 64)

	sqlStatement := `SELECT * FROM tasks WHERE id = $1 AND wsid = $2`
	row := database.DB.QueryRow(sqlStatement, uint(id), uint(wsid))

	var task models.Task

	err := row.Scan(&task.Id, &task.Name, &task.Done, &task.CreatedAt, &task.ExpiresAt, &task.Note, &task.WorkspaceId, &task.UserId)
	if err != nil {
		return c.JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.JSON(task)
}

func UpdateTask(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	id, _ := strconv.ParseUint(data["id"], 10, 64)
	wsid, _ := strconv.ParseUint(data["wsid"], 10, 64)
	expires_at, _ := time.Parse("2006-01-02", data["expires_at"])

	task := models.Task{
		Id:          uint(id),
		Name:        data["name"],
		WorkspaceId: uint(wsid),
		ExpiresAt:   expires_at,
		Note:        data["note"],
	}

	sqlStatement := `UPDATE tasks SET name = $1, wsid = $2, expire_at = $3, note = $4 WHERE id = $5`

	_, err := database.DB.Exec(sqlStatement, task.Name, task.WorkspaceId, task.ExpiresAt, task.Note, task.Id)
	if err != nil {
		return c.JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.JSON(task)
}

func UpdateDoneTask(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	id, _ := strconv.ParseUint(data["id"], 10, 64)
	done := data["done"] == "true"

	task := models.Task{
		Id:   uint(id),
		Done: done,
	}

	sqlStatement := `UPDATE tasks SET done = $1 WHERE id = $2`

	_, err := database.DB.Exec(sqlStatement, task.Done, task.Id)
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
	wsid, _ := strconv.ParseUint(data["wsid"], 10, 64)

	task := models.Task{
		Id:          uint(id),
		WorkspaceId: uint(wsid),
	}

	sqlStatement := `DELETE FROM tasks WHERE id = $1 AND wsid = $2`

	_, err := database.DB.Exec(sqlStatement, task.Id, task.WorkspaceId)
	if err != nil {
		return c.JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"message": "success",
	})
}
