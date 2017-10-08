package controllers

import play.api.mvc.ControllerComponents
import services.GroceryService
import play.api.mvc.AbstractController
import javax.inject.Inject
import scala.concurrent.ExecutionContext
import play.api.libs.json.Json
import models.Grocery
import scala.concurrent.Future

class GroceriesController @Inject() (
    authenticatedAction: AuthenticatedAction,
    groceryService: GroceryService,
    cc: ControllerComponents)(implicit executionContext: ExecutionContext) extends AbstractController(cc) {

  def findAll = authenticatedAction.async {
    groceryService.findAll.map { groceries =>
      implicit val _ = Json.writes[Grocery]
      Ok(Json.toJson(Map("groceries" -> groceries)))
    }.recover{ case a => InternalServerError(a.getMessage)}
  }

  case class NewItem(name: String)
  def add = authenticatedAction.async { request =>
    request.body.asJson.flatMap(_.asOpt(Json.reads[NewItem])) match {
      case Some(data) =>
        groceryService.add(data.name).map {_ => Ok}
      case None => Future.successful(BadRequest("Unreadable request"))
    }
  }
}
