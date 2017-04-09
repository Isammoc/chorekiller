package services

import javax.inject.Singleton
import javax.inject.Inject
import models.User
import scala.concurrent.Future

@Singleton
class UserService @Inject() {
  def findByLogin(login: String): Future[Option[User]] = Future.successful(
      if(login == "admin")
        Some(User("admin", "Administrateur", true))
      else
        None
    )
}
