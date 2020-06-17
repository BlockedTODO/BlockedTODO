resource "google_sql_database" "database" {
  name = "${var.project_name}-production-db"
  instance = google_sql_database_instance.instance.name
}

resource "google_sql_database_instance" "instance" {
  name = "${var.project_name}-production-db-instance"
  database_version = "POSTGRES_12"
  region = var.gcp_region

  settings {
    tier = "db-f1-micro"
  }
}
