output "helm_production_values_secret_id" {
    value = google_secret_manager_secret.helm_production_values.secret_id
}
