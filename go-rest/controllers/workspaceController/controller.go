package controllers

import (
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
		Name:        data["name"],
		Description: data["description"],
		UserId:      uint(uid),
	}

	sqlStatement := `INSERT INTO workspaces (name, description, uid) VALUES ($1, $2, $3) RETURNING id`
	id := 0

	err := database.DB.QueryRow(sqlStatement, workspace.Name, workspace.Description, workspace.UserId).Scan(&id)
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

	sqlStatement := `SELECT * FROM workspaces WHERE uid = $1`
	rows, err := database.DB.Query(sqlStatement, uint(uid))
	if err != nil {
		return c.JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	workspaces := []models.Workspace{}

	for rows.Next() {
		var workspace models.Workspace

		err := rows.Scan(&workspace.Id, &workspace.Name, &workspace.Description, &workspace.UserId)
		if err != nil {
			return c.JSON(fiber.Map{
				"message": err.Error(),
			})
		}

		workspaces = append(workspaces, workspace)
	}

	return c.JSON(workspaces)
}

func GetWorkspace(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	wsid, _ := strconv.ParseUint(data["wsid"], 10, 64)

	sqlStatement := `SELECT * FROM workspaces WHERE id = $1`
	row := database.DB.QueryRow(sqlStatement, uint(wsid))

	workspace := models.Workspace{}

	err := row.Scan(&workspace.Id, &workspace.Name, &workspace.Description, &workspace.UserId)
	if err != nil {
		return c.JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.JSON(workspace)
}

func UpdateWorkspace(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	wsid, _ := strconv.ParseUint(data["wsid"], 10, 64)

	workspace := models.Workspace{
		Name:        data["name"],
		Description: data["description"],
		Id:          uint(wsid),
	}

	sqlStatement := `UPDATE workspaces SET name = $1, description = $2 WHERE id = $3`

	_, err := database.DB.Exec(sqlStatement, workspace.Name, workspace.Description, workspace.Id)
	if err != nil {
		return c.JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.JSON(workspace)
}

func DeleteWorkspace(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}
	uid, _ := strconv.ParseUint(data["uid"], 10, 64)
	wsid, _ := strconv.ParseUint(data["wsid"], 10, 64)

	sqlStatement := `DELETE FROM tasks WHERE wsid = $1`
	_, err := database.DB.Exec(sqlStatement, uint(wsid))
	if err != nil {
		return c.JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	sqlStatement = `DELETE FROM workspaces WHERE id = $1 AND uid = $2`
	_, err = database.DB.Exec(sqlStatement, uint(wsid), uint(uid))
	if err != nil {
		return c.JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	return c.JSON(fiber.Map{
		"message": "success",
	})

}
