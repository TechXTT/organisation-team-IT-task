package routes

import (
	authController "github.com/TechXTT/organisation-team-IT-task/go-rest/controllers/authController"
	taskController "github.com/TechXTT/organisation-team-IT-task/go-rest/controllers/taskController"
	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {

	app.Post("/api/register", authController.Register)
	app.Post("/api/login", authController.Login)
	app.Get("/api/get/user", authController.User)
	app.Post("/api/logout", authController.Logout)
	app.Post("/api/create/workspace", taskController.CreateWorkspace)
	app.Post("/api/get/workspace", taskController.GetWorkspaces)
	app.Post("/api/create/task", taskController.CreateTask)
	app.Post("/api/get/task", taskController.GetTasks)
}
