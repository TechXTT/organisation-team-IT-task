package controllers

import (
	"time"

	"github.com/TechXTT/organisation-team-IT-task/go-rest/database"
	"github.com/TechXTT/organisation-team-IT-task/go-rest/models"

	"strconv"

	"github.com/gofiber/fiber/v2"
)

func CreateWorkspace(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	uid, _ := strconv.ParseUint(data["uid"], 10, 64)

	workspace := models.Workspace{
		Name:   data["name"],
		UserId: uint(uid),
	}

	sqlStatement := `INSERT INTO workspaces (name, user_id) VALUES ($1, $2) RETURNING id`
	id := 0

	err := database.DB.QueryRow(sqlStatement, workspace.Name, workspace.UserId).Scan(&id)
	if err != nil {
		return c.JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.JSON(workspace)
}

func GetWorkspaces(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	uid, _ := strconv.ParseUint(data["uid"], 10, 64)

	sqlStatement := `SELECT id, name FROM workspaces WHERE user_id = $1`
	rows, err := database.DB.Query(sqlStatement, uint(uid))
	if err != nil {
		return c.JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	workspaces := []models.Workspace{}

	for rows.Next() {
		var workspace models.Workspace

		err := rows.Scan(&workspace.Id, &workspace.Name)
		if err != nil {
			return c.JSON(fiber.Map{
				"message": err.Error(),
			})
		}

		workspaces = append(workspaces, workspace)
	}

	return c.JSON(workspaces)
}

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

	sqlStatement := `INSERT INTO tasks (name, user_id, workspace_id, importance, done, created_at, expires_at, note) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`
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

	sqlStatement := `SELECT id, name, importance, done, created_at, expires_at, note FROM tasks WHERE user_id = $1 AND workspace_id = $2`
	rows, err := database.DB.Query(sqlStatement, uint(uid), uint(wsid))
	if err != nil {
		return c.JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	tasks := []models.Task{}

	for rows.Next() {
		var task models.Task

		err := rows.Scan(&task.Id, &task.Name, &task.Importance, &task.Done, &task.CreatedAt, &task.ExpiresAt, &task.Note)
		if err != nil {
			return c.JSON(fiber.Map{
				"message": err.Error(),
			})
		}

		tasks = append(tasks, task)
	}

	return c.JSON(tasks)
}
