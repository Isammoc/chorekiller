package models

import scala.concurrent.Future
import play.api.db.slick.DatabaseConfigProvider
import play.api.db.slick.HasDatabaseConfigProvider
import javax.inject.Inject
import scala.concurrent.ExecutionContext
import slick.jdbc.JdbcProfile

case class User(login: String, displayName: String, isAdmin: Boolean = false)

case class Login(login: String, password: String, userId: Long)

class UserDAO @Inject() (protected val dbConfigProvider: DatabaseConfigProvider)(implicit executionContet: ExecutionContext) extends HasDatabaseConfigProvider[JdbcProfile] {
  import profile.api._

  private val Users = TableQuery[UsersTable]

  def findUserByLogin(login: String) = db.run {
    (for {
      u <- Users if u.login === login
    } yield u).result.headOption
  }

  def findLoginUserByLogin(login: String) = db.run {
    (for {
      u <- Users if u.login === login
    } yield (u.password, u)).result.headOption
  }

  def changePassword(login: String, password: String) = db.run {
    (for {
      u <- Users if u.login === login
    } yield u.password).update(password)
  }
  
  private class UsersTable(tag: Tag) extends Table[User](tag, "user_account") {

    def id = column[Long]("id", O.PrimaryKey)
    def login = column[String]("login", O.Unique)
    def password = column[String]("passwd")
    def name = column[String]("name")
    def admin = column[Boolean]("admin")

    def * = (login, name, admin) <> (User.tupled, User.unapply)
  }
}
