variable "project_name" {
    type = string
}

variable "cluster_name" {
    type = string
}

variable "gcp_region" {
    type = string
}

variable "gcp_zone" {
    type = string
}

variable "initial_node_count" {
    default = "2"
}

variable "min_node_count" {
    default = "1"
}

variable "max_node_count" {
    default = "4"
}

variable "node_disk_size" {
    default = "10"
}

variable "node_machine_type" {
    default = "custom-1-2048"
}
