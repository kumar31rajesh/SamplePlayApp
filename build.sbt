name := "Cerrid Analytics"

version := "1.0-SNAPSHOT"

libraryDependencies ++= Seq(
  javaJdbc,
  javaEbean,
  cache
)     

resolvers += (
    "LocalRepository" at "file:///"+Path.userHome.absolutePath+"/cerrid/cerrid/codebase/cerrid-app/lib/"
)

playAssetsDirectories <+= baseDirectory / "css" 


play.Project.playJavaSettings
