variable "gcp_project_id" {
    type = string
}

variable "remote_repo_owner" {
    type = string
}

variable "remote_repo_name" {
    type = string
}

variable "backend_service_name" {
    type = string
}

variable "frontend_service_name" {
    type = string
}

variable "website_service_name" {
    type = string
}

variable "helm_production_values_secret_id" {
    type = string
}

variable "cluster_name" {
    type = string
}

variable "cluster_location" {
    type = string
}
