lazy val root = (project in file(".")).enablePlugins(PlayScala)

import com.typesafe.config._

val conf = ConfigFactory.parseFile(new File("conf/application.conf")).resolve()
name    := conf.getString("app.name")
version := conf.getString("app.version")

scalaVersion := "2.11.7"

libraryDependencies ++= Seq(
  cache,
  ws,
  "com.pauldijou" %% "jwt-play" % "0.12.1",
  "com.typesafe.play" %% "play-slick" % "2.1.0",
  "com.typesafe.play" %% "play-slick-evolutions" % "2.1.0",
  "org.postgresql" % "postgresql" % "42.0.0",
  "org.scalatestplus.play" %% "scalatestplus-play" % "1.5.1" % Test
)
