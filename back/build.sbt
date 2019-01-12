lazy val root = (project in file(".")).enablePlugins(PlayScala)

import com.typesafe.config._

val conf = ConfigFactory.parseFile(new File("conf/application.conf")).resolve()
name    := conf.getString("app.name")
version := conf.getString("app.version")

scalaVersion := "2.12.8"

libraryDependencies ++= Seq(
  ws,
  guice,
  "com.pauldijou" %% "jwt-play" % "1.1.0",
  "com.typesafe.play" %% "play-json" % "2.6.13",
  "com.typesafe.play" %% "play-slick" % "3.0.3",
  "com.typesafe.play" %% "play-slick-evolutions" % "3.0.3",
  "org.postgresql" % "postgresql" % "42.2.5",
  "org.mindrot" % "jbcrypt" % "0.4",
  "org.scalatestplus.play" %% "scalatestplus-play" % "3.1.2" % Test
)
