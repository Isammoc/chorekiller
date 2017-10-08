package services

import scala.concurrent.ExecutionContext

import javax.inject.Inject
import javax.inject.Singleton
import models.GroceryDAO

@Singleton
class GroceryService @Inject() (groceryDao: GroceryDAO)(implicit executionContext: ExecutionContext) {
  def findAll = groceryDao.findAll
  def add(name: String) = groceryDao.add(name)
}
