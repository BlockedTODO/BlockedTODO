# A secret that contains production overrides for helm/values.yaml
resource "google_secret_manager_secret" "helm_production_values" {
    secret_id = var.helm_production_values_secret_id

    labels = {
        environment = "production",
        builder = "helm"
    }

    replication {
        user_managed {
            replicas {
                location = var.gcp_region
            }
        }
    }
}
