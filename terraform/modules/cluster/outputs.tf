output "cluster_name" {
    value = google_container_cluster.primary.name
}

output "cluster_location" {
    value = google_container_cluster.primary.location
}

output "cluster_version" {
    value = google_container_cluster.primary.master_version
}

output "database_backups_bucket_name" {
    value = google_storage_bucket.cluster_database_backups.name
}
