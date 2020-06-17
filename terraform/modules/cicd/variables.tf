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

# Environment Variables

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
