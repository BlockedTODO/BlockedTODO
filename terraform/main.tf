provider "google" {
  credentials = file("${var.project_name}-account.json")

  project = var.gcp_project_id
  region  = var.gcp_region
  zone = var.gcp_zone
}

provider "google-beta" {
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

    helm_production_values_secret_id = "helm-production-values"
    gcp_region = var.gcp_region
}

module "cicd" {
    source = "./modules/cicd"

    gcp_project_id = var.gcp_project_id
    remote_repo_name = var.remote_repo_name
    remote_repo_owner = var.remote_repo_owner
    backend_service_name = var.backend_service_name
    frontend_service_name = var.frontend_service_name
    website_service_name = var.website_service_name

    helm_production_values_secret_id = module.secrets.helm_production_values_secret_id
    cluster_name = module.cluster.cluster_name
    cluster_location = module.cluster.cluster_location
}

module "dns" {
    source = "./modules/dns"

    dns_zone_name = var.project_name
    domain = var.domain
    ip_name = "${var.project_name}-ip"
}

module "cluster" {
    source = "./modules/cluster"

    gcp_zone = var.gcp_zone
    gcp_region = var.gcp_region
    project_name = var.project_name
    cluster_name = "${var.project_name}-cluster"
    initial_node_count = var.cluster_initial_node_count
    node_machine_type = var.cluster_machine_type
    node_disk_size = var.cluster_disk_size
}
