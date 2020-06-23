provider "google" {
  version = "3.25.0"

  credentials = file("${var.project_name}-account.json")

  project = var.gcp_project_id
  region  = var.gcp_region
  zone = var.gcp_zone
}

provider "google-beta" {
    version = "3.25.0"

    credentials = file("${var.project_name}-account.json")

    project = var.gcp_project_id
    region  = var.gcp_region
    zone = var.gcp_zone
}

module "registry" {
    source = "./modules/registry"

    gcp_project_id = var.gcp_project_id
}

module "secrets" {
    source = "./modules/secrets"

    production_secret_id = "${var.project_name}-production-values"
    gcp_region = var.gcp_region
}

module "cicd" {
    source = "./modules/cicd"

    gcp_project_id = var.gcp_project_id
    remote_repo_name = var.remote_repo_name
    remote_repo_owner = var.remote_repo_owner
    backend_service_name = var.backend_service_name
    frontend_service_name = var.frontend_service_name

    production_secret_id = module.secrets.production_secret_id
}

module "storage" {
    source = "./modules/storage"

    project_name = var.project_name
    gcp_region = var.gcp_region
}

module "cluster" {
    source = "./modules/cluster"

    gcp_zone = var.gcp_zone
    cluster_name = "${var.project_name}-cluster"
    initial_node_count = var.cluster_initial_node_count
    node_machine_type = var.cluster_machine_type
    node_disk_size = var.cluster_disk_size
}
