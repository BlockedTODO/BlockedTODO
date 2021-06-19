# The Kubernetes cluster to which all of the application containers will be deployed.
resource "google_container_cluster" "primary" {
    name = var.cluster_name
    location = var.gcp_zone

    # We can't create a cluster with no node pool defined, but we want to only use
    # separately managed node pools. So we create the smallest possible default
    # node pool and immediately delete it.
    remove_default_node_pool = true
    initial_node_count = 1

    release_channel {
        channel = "REGULAR"
    }

    monitoring_service = "monitoring.googleapis.com/kubernetes"
    logging_service = "logging.googleapis.com/kubernetes"
}

# The primary node pool for the Kubernetes cluster.
resource "google_container_node_pool" "primary_preemptible_nodes" {
    name = "${google_container_cluster.primary.name}-node-pool"
    cluster = google_container_cluster.primary.name
    location = var.gcp_zone

    initial_node_count = var.initial_node_count

    autoscaling {
        min_node_count = var.min_node_count
        max_node_count = var.max_node_count
    }

    management {
        auto_upgrade = true
    }

    node_config {
        preemptible  = true
        disk_size_gb = var.node_disk_size
        machine_type = var.node_machine_type

        metadata = {
            disable-legacy-endpoints = "true"
        }

        # List of available scopes: https://cloud.google.com/sdk/gcloud/reference/container/clusters/create#--scopes
        oauth_scopes = ["compute-rw", "storage-rw", "logging-write", "monitoring", "datastore", "pubsub"]
    }
}

# Storage bucket for backups of the in-cluster database.
resource "google_storage_bucket" "cluster_database_backups" {
    name = "${var.project_name}-cluster-database-backups"
    location = var.gcp_region
    storage_class = "NEARLINE"
}
