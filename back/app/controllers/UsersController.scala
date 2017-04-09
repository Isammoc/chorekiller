package controllers

import scala.concurrent.Future

import play.api.mvc.Action
import play.api.mvc.Controller
import javax.inject.Inject
import play.api.libs.json.Json
import models.User
import play.Logger

class UsersController @Inject() extends Controller {

  case class LoginRequest(login: String, password: String)

  def authenticate = Action { request =>
    Logger.error(request.body.toString)
    Logger.error(request.body.asJson.toString)
    request.body.asJson.flatMap(_.asOpt(Json.reads[LoginRequest])) match {
      case Some(data) => if (data.login == "admin" && data.password == "changeit") {
        Ok(Json.toJson(User("admin", "Administrateur"))(Json.writes[User]))
      } else {
        BadRequest("No matching login/password")
      }
      case None => BadRequest("Unreadable request")
    }
  }
}