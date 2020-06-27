output "production_secret_id" {
    value = google_secret_manager_secret.production_values.secret_id
}
