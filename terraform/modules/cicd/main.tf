# The following resource requires some manual setup on GitHub.
# See docs/deployment.md for more info.

resource "google_cloudbuild_trigger" "filename-trigger" {
    provider = google-beta
    description = "Push to any branch"
    filename = "cloudbuild.yaml"
    project = var.gcp_project_id

    github {
        owner = var.remote_repo_owner
        name = var.remote_repo_name
        push {
            branch = ".*"
        }
    }

    substitutions = {
        _BACKEND_SERVICE_NAME = var.backend_service_name
        _FRONTEND_SERVICE_NAME = var.frontend_service_name
        _DATABASE_NAME = var.database_name
        _DATABASE_USER = var.database_user
        _DATABASE_PASSWORD = var.database_password
        _DATABASE_HOST = var.database_host
        _DATABASE_PORT = var.database_port
    }
}
