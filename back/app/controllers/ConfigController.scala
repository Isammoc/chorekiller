package controllers

import javax.inject.Singleton
import javax.inject.Inject
import play.api.mvc.Controller
import play.api.mvc.Action
import play.api.libs.json.Json
import play.api.Configuration
import play.api.mvc.DefaultActionBuilder
import play.api.mvc.BaseController
import play.api.mvc.ControllerComponents
import play.api.mvc.AbstractController

@Singleton
class ConfigController @Inject() (
    cc: ControllerComponents,
    conf: Configuration
  ) extends AbstractController(cc) {

  def get = Action {
    Ok(Json.toJson(Map(
        "name" -> conf.get[String]("app.name")
        , "version" -> conf.get[String]("app.version")
        )))
  }
}
