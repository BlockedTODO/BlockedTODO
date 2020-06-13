resource "google_container_registry" "registry" {
  project = var.gcp_project_id
}
