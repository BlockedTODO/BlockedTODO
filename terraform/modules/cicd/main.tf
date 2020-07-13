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
        _WEBSITE_SERVICE_NAME = var.website_service_name
        _HELM_PRODUCTION_VALUES_SECRET_ID = var.helm_production_values_secret_id
        _CLUSTER_NAME = var.cluster_name
        _CLUSTER_LOCATION = var.cluster_location
    }
}
