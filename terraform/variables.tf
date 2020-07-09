# GENERAL

variable "project_name" {
    default = "blockedtodo"
}

variable "domain" {
    default = "blockedtodo.com"
}

# GCP PROJECT

variable "gcp_project_id" {
    description = "unique identifier given to the gcp project - not to be confused with project number"
    default = "blockedtodo"
}

variable "gcp_location" {
    description = "TO REMOVE - this concept isn't used in this setup"
    default = "us-central"
}

variable "gcp_region" {
    description = "Some resources are hosted in specific locations denoted by their region (collection of zones)."
    default = "us-central1"
}

variable "gcp_zone" {
    description = "A zone is an isolated location within a region. Each region has 3 or more zones labeled a,b,c..."
    default = "us-central1-c"
}

# REPOSITORY

variable "remote_repo_owner" {
    default = "BlockedTODO"
}

variable "remote_repo_name" {
    default = "BlockedTODO"
}

# KUBERNETES CLUSTER

variable "cluster_initial_node_count" {
    default = "2"
}

variable "cluster_machine_type" {
    default = "n1-standard-1"
}

variable "cluster_disk_size" {
    default = "30"
}

# BACKEND SERVICE

variable "backend_service_name" {
    default = "blockedtodo-backend"
}

# FRONTEND SERVICE

variable "frontend_service_name" {
    default = "blockedtodo-frontend"
}

# WEBSITE SERVICE

variable "website_service_name" {
    default = "blockedtodo-website"
}
