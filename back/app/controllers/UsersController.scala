package controllers

import scala.concurrent.Future

import play.api.mvc.Action
import play.api.mvc.AbstractController
import play.api.mvc.ControllerComponents
import javax.inject.Inject
import play.api.libs.json._
import models.User
import pdi.jwt.JwtSession._
import services.UserService
import scala.concurrent.ExecutionContext
import play.api.Logger

class UsersController @Inject() (authenticatedAction: AuthenticatedAction, userService: UserService, cc: ControllerComponents)(implicit executionContext: ExecutionContext) extends AbstractController(cc) {

  case class LoginRequest(login: String, password: String)

  def authenticate = Action.async { implicit request =>
    Logger.debug("authenticate request")    
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

  def getCurrent = authenticatedAction { implicit request =>
    Logger.debug("get me request")    
    Ok(Json.toJson(request.user)(Json.writes[User]))
  }

  def get(name: String) = authenticatedAction.async { implicit request =>
    userService.findByLogin(name).map {
      case Some(user) =>
          Ok(Json.toJson(user)(Json.writes[User]))
      case None => NotFound
    }
  }

  case class ChangePassword(oldPassword: String, newPassword: String)
  
  def changePassword = authenticatedAction.async(parse.json) { implicit request =>
    request.body.validate[ChangePassword](Json.format[ChangePassword]) match {
      case JsSuccess(ChangePassword(oldPassword: String, newPassword: String), _) =>
        userService.changePassword(request.user.login, oldPassword, newPassword).map {
          case Right(_) => NoContent
          case Left(s) => BadRequest(s)
        }
      case err@JsError(_) => Future.successful(BadRequest(JsError.toJson(err.errors)))
    }
  }
}
