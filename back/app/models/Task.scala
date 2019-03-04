package models

import play.api.db.slick.DatabaseConfigProvider
import play.api.db.slick.HasDatabaseConfigProvider
import javax.inject.Inject
import scala.concurrent.ExecutionContext
import slick.jdbc.JdbcProfile
import scala.concurrent.Future

case class Task(id: Long, name: String, completed: Boolean)

class TaskDAO @Inject() (protected val dbConfigProvider: DatabaseConfigProvider)(implicit executionContet: ExecutionContext) extends HasDatabaseConfigProvider[JdbcProfile] {
  import profile.api._

  private val Tasks = TableQuery[TaskTable]

  def findAll: Future[Seq[Task]] = db.run {
    Tasks.sortBy(_.id).result
  }

  def add(name: String): Future[Task] = db.run {
    (Tasks returning Tasks.map(_.id) into ((task, id) => task.copy(id = id))) += Task(0, name, false)
  }

  def delete(id: Long): Future[Int] = db.run {
    Tasks.filter(_.id === id).delete
  }

  def complete(id: Long): Future[Int] = db.run {
    Tasks.filter(_.id === id).map(_.completed).update(true)
  }

  def uncomplete(id: Long): Future[Int] = db.run {
    Tasks.filter(_.id === id).map(_.completed).update(false)
  }

  private class TaskTable(tag: Tag) extends Table[Task](tag, "task") {

    def id = column[Long]("id", O.AutoInc, O.PrimaryKey)
    def name = column[String]("name")
    def completed = column[Boolean]("completed")

    def * = (id, name, completed) <> (Task.tupled, Task.unapply)
  }

}
