package routes

import (
	authController "github.com/TechXTT/organisation-team-IT-task/go-rest/controllers/authController"
	taskController "github.com/TechXTT/organisation-team-IT-task/go-rest/controllers/taskController"
	workspaceController "github.com/TechXTT/organisation-team-IT-task/go-rest/controllers/workspaceController"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {

	app.Post("/api/register", authController.Register)
	app.Post("/api/login", authController.Login)
	app.Get("/api/get/user", authController.User)
	app.Post("/api/logout", authController.Logout)

	app.Post("/api/create/workspace", workspaceController.CreateWorkspace)
	app.Post("/api/get/workspaces", workspaceController.GetWorkspaces)
	app.Post("/api/get/workspace", workspaceController.GetWorkspace)
	app.Put("/api/update/workspace", workspaceController.UpdateWorkspace)
	app.Delete("/api/delete/workspace", workspaceController.DeleteWorkspace)

	app.Post("/api/create/task", taskController.CreateTask)
	app.Post("/api/get/tasks", taskController.GetTasks)
	app.Post("/api/get/task", taskController.GetTask)
	app.Put("/api/update/task", taskController.UpdateTask)
	app.Put("api/update/done", taskController.UpdateDoneTask)
	app.Delete("/api/delete/task", taskController.DeleteTask)
}
