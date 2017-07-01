import play.api.mvc._
import services.UserService
import javax.inject.Inject
import javax.inject.Singleton
import scala.concurrent.ExecutionContext
import models.User
import scala.concurrent.Future
import play.api.mvc.Results.Unauthorized
import pdi.jwt.JwtPlayImplicits

package object controllers {

  class AuthenticatedRequest[A](val username: String, val user: User, request: Request[A]) extends WrappedRequest[A](request)

  case class Claim(username: String)

  @Singleton
  class AuthenticatedAction @Inject() (
    userService: UserService,
    playBodyParsers: PlayBodyParsers)(implicit val executionContext: ExecutionContext)
      extends ActionBuilder[AuthenticatedRequest, AnyContent] with JwtPlayImplicits {

    def parser: play.api.mvc.BodyParser[play.api.mvc.AnyContent] = playBodyParsers.anyContent

    def invokeBlock[A](request: Request[A], block: AuthenticatedRequest[A] => Future[Result]) =
      request.jwtSession.getAs[String]("login") match {
        case Some(username) => userService.findByLogin(username).flatMap {
          case Some(userAccount) => block(new AuthenticatedRequest(username, userAccount, request)).map(_.refreshJwtSession(request))
          case None => Future.successful(Unauthorized)
        }
        case _ =>
          Future.successful(Unauthorized)
      }
  }
}
