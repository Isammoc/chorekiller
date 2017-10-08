package models

import play.api.db.slick.DatabaseConfigProvider
import play.api.db.slick.HasDatabaseConfigProvider
import javax.inject.Inject
import scala.concurrent.ExecutionContext
import slick.jdbc.JdbcProfile
import scala.concurrent.Future

case class Grocery(id: Long, name: String, completed: Boolean)

class GroceryDAO @Inject() (protected val dbConfigProvider: DatabaseConfigProvider)(implicit executionContet: ExecutionContext) extends HasDatabaseConfigProvider[JdbcProfile] {
  import profile.api._

  private val Groceries = TableQuery[GroceryTable]

  def findAll: Future[Seq[Grocery]] = db.run {
    Groceries.result
  }

  def add(name: String): Future[Grocery] = db.run {
    (Groceries returning Groceries.map(_.id) into ((grocery, id) => grocery.copy(id = id))) += Grocery(0, name, false)
  }

  def delete(id: Long): Future[Int] = db.run {
    Groceries.filter(_.id === id).delete
  }

  private class GroceryTable(tag: Tag) extends Table[Grocery](tag, "grocery") {

    def id = column[Long]("id", O.AutoInc, O.PrimaryKey)
    def name = column[String]("name")
    def completed = column[Boolean]("completed")

    def * = (id, name, completed) <> (Grocery.tupled, Grocery.unapply)
  }

}