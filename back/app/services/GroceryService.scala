package services

import scala.concurrent.ExecutionContext

import javax.inject.Inject
import javax.inject.Singleton
import models.GroceryDAO

@Singleton
class GroceryService @Inject() (groceryDao: GroceryDAO)(implicit executionContext: ExecutionContext) {
  def findAll = groceryDao.findAll
  def add(name: String) = groceryDao.add(name)
  def delete(id: Long) = groceryDao.delete(id)
  def changeCompletion(id: Long, complete: Boolean) =
    if (complete)
      groceryDao.complete(id)
    else
      groceryDao.uncomplete(id)
}
