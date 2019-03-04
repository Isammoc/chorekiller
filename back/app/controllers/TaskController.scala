package controllers

import play.api.mvc.ControllerComponents
import services.TaskService
import play.api.mvc.AbstractController
import javax.inject.Inject
import scala.concurrent.ExecutionContext
import play.api.libs.json.Json
import models.Task
import scala.concurrent.Future

class TaskController @Inject() (
    authenticatedAction: AuthenticatedAction,
    taskService: TaskService,
    cc: ControllerComponents)(implicit executionContext: ExecutionContext) extends AbstractController(cc) {

  def findAll = authenticatedAction.async {
    taskService.findAll.map { tasks =>
      implicit val _ = Json.writes[Task]
      Ok(Json.toJson(Map("tasks" -> tasks)))
    }
  }

  case class NewTask(name: String)
  def add = authenticatedAction.async { request =>
    request.body.asJson.flatMap(_.asOpt(Json.reads[NewTask])) match {
      case Some(data) =>
        taskService.add(data.name).map { _ => NoContent }
      case None => Future.successful(BadRequest("Unreadable request"))
    }
  }

  def delete(id: Long) = authenticatedAction.async {
    taskService.delete(id).map {
      case i if i == 0 => NotFound
      case _ => NoContent
    }
  }

  def complete(id: Long) = authenticatedAction.async {
    taskService.changeCompletion(id, true).map { _ => NoContent }
  }

  def uncomplete(id: Long) = authenticatedAction.async {
    taskService.changeCompletion(id, false).map { _ => NoContent }
  }
}
