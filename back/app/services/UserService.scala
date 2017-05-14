package services

import javax.inject.Singleton
import javax.inject.Inject
import models.User
import scala.concurrent.Future
import models.UserDAO
import scala.concurrent.ExecutionContext
import org.mindrot.jbcrypt.BCrypt

@Singleton
class UserService @Inject() (userDao: UserDAO)(implicit executionContext: ExecutionContext) {

  def findByLogin(login: String): Future[Option[User]] = userDao.findUserByLogin(login)

  def login(login:String, password: String): Future[Option[User]] = userDao.findLoginUserByLogin(login).map {
    case Some((encrypted, u))  if BCrypt.checkpw(password, encrypted) => Some(u)
    case _ => None
  }
}
