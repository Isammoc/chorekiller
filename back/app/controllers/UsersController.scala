package controllers

import scala.concurrent.Future

import play.api.mvc.Action
import play.api.mvc.Controller
import javax.inject.Inject
import play.api.libs.json.Json
import models.User
import play.Logger

import services.UserService

class UsersController @Inject() (val userService: UserService) extends Controller with Secured {

  case class LoginRequest(login: String, password: String)

  def authenticate = Action { implicit request =>
    request.body.asJson.flatMap(_.asOpt(Json.reads[LoginRequest])) match {
      case Some(data) => if (data.login == "admin" && data.password == "changeit") {
        Ok(Json.toJson(User("admin", "Administrateur"))(Json.writes[User])).addingToJwtSession("login", "admin")
      } else {
        BadRequest("No matching login/password")
      }
      case None => BadRequest("Unreadable request")
    }
  }

  def getCurrent = AuthenticatedAction { implicit request =>
    Ok(Json.toJson(request.user)(Json.writes[User]))
  }
}
