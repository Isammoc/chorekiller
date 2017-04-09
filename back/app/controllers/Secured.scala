package controllers

import play.api.mvc.WrappedRequest
import play.api.mvc.Request
import play.api.mvc.ActionBuilder
import scala.concurrent.Future
import play.api.mvc.Result
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.mvc.Results.Unauthorized
import pdi.jwt._
import play.api.inject.Injector
import play.api.Play
import services.UserService
import javax.inject.Inject
import models.User

class AuthenticatedRequest[A](val username: String, val user: User, request: Request[A]) extends WrappedRequest[A](request)

case class Claim(username: String)

trait Secured extends JwtPlayImplicits {
  def userService: UserService

  object AuthenticatedAction extends ActionBuilder[AuthenticatedRequest] {
    def invokeBlock[A](request: Request[A], block: AuthenticatedRequest[A] => Future[Result]) =
      request.jwtSession.getAs[String]("login") match {
        case Some(username) => userService.findByLogin(username).flatMap {
          case Some(userAccount) => block(new AuthenticatedRequest(username, userAccount, request)).map(_.refreshJwtSession(request))
          case None => Future.successful(Unauthorized)
        }
        case _ => Future.successful(Unauthorized)
      }
  }
}
