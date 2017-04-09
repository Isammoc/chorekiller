lazy val root = (project in file(".")).enablePlugins(PlayScala)

import com.typesafe.config._

val conf = ConfigFactory.parseFile(new File("conf/application.conf")).resolve()
name    := conf.getString("app.name")
version := conf.getString("app.version")

scalaVersion := "2.11.7"

libraryDependencies ++= Seq(
  jdbc,
  cache,
  ws,
  "com.pauldijou" %% "jwt-play" % "0.12.1",
  "org.scalatestplus.play" %% "scalatestplus-play" % "1.5.1" % Test
)

