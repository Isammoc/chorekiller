package controllers

import play.api.mvc.ControllerComponents
import services.GroceryService
import play.api.mvc.AbstractController
import javax.inject.Inject
import scala.concurrent.ExecutionContext
import play.api.libs.json.Json
import models.Grocery

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
}