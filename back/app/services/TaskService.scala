package services

import scala.concurrent.ExecutionContext

import javax.inject.Inject
import javax.inject.Singleton
import models.TaskDAO

@Singleton
class TaskService @Inject() (taskDao: TaskDAO)(implicit executionContext: ExecutionContext) {
  def findAll = taskDao.findAll
  def add(name: String) = taskDao.add(name)
  def delete(id: Long) = taskDao.delete(id)
  def changeCompletion(id: Long, complete: Boolean) =
    if (complete)
      taskDao.complete(id)
    else
      taskDao.uncomplete(id)
}
