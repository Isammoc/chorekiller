package controllers

import scala.concurrent.Future

import play.api.mvc.Action
import play.api.mvc.Controller
import javax.inject.Inject
import play.api.libs.json.Json
import models.User
import play.Logger

import services.UserService
import scala.concurrent.ExecutionContext

class UsersController @Inject() (val userService: UserService)(implicit executionContext: ExecutionContext) extends Controller with Secured {

  case class LoginRequest(login: String, password: String)

  def authenticate = Action.async { implicit request =>
    request.body.asJson.flatMap(_.asOpt(Json.reads[LoginRequest])) match {
      case Some(data) =>
        userService.login(data.login, data.password).map {
          case Some(u) =>
            Ok(Json.toJson(u)(Json.writes[User])).addingToJwtSession("login", data.login)
          case _ =>
            BadRequest("No matching login/password")
        }
      case None => Future.successful(BadRequest("Unreadable request"))
    }
  }

  def getCurrent = AuthenticatedAction { implicit request =>
    Ok(Json.toJson(request.user)(Json.writes[User]))
  }
}
