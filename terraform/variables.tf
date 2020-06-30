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

# FRONTEND SERVICE

variable "frontend_service_name" {
    default = "blockedtodo-frontend"
}

variable "backend_protocol" {
    default = "https"
}

variable "backend_host" {
    default = "backend.blockedtodo.com"
}

variable "backend_port" {
    default = "80"
}

# BACKEND SERVICE

variable "backend_service_name" {
    default = "blockedtodo-backend"
}

variable "database_name" {
    type = string
}

variable "database_user" {
    type = string
}

variable "database_password" {
    type = string
}

variable "database_host" {
    type = string
}

variable "database_port" {
    type = string
}

variable "token_secret" {
    type = string
}

variable "github_webhooks_secret" {
    type = string
}

variable "github_app_id" {
    type = string
}

variable "github_app_private_key" {
    type = string
}
