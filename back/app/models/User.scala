package models

case class User(login: String, displayName: String, isAdmin: Boolean = false)
