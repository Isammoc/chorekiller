package controllers

import javax.inject.Singleton
import javax.inject.Inject
import play.api.mvc.Controller
import play.api.mvc.Action
import play.api.libs.json.Json
import play.api.Configuration

@Singleton
class ConfigController @Inject() (conf: Configuration)  extends Controller {
  def get = Action {
    Ok(Json.toJson(Map(
        "name" -> conf.getString("app.name").getOrElse("unamed application")
        , "version" -> conf.getString("app.version").getOrElse("0.0.0")
        )))
  }
}