# DNS configuration as per https://cloud.google.com/kubernetes-engine/docs/tutorials/configuring-domain-name-static-ip#step_2b_using_an_ingress

resource "google_compute_global_address" "primary" {
    name = var.ip_name
}

resource "google_dns_managed_zone" "prod" {
    depends_on = [google_compute_global_address.primary]

    name = var.dns_zone_name
    dns_name = "${var.domain}."
    description = "Production DNS Zone"
}

resource "google_dns_record_set" "base" {
    managed_zone = google_dns_managed_zone.prod.name

    name = google_dns_managed_zone.prod.dns_name
    type = "A"
    ttl = 300
    rrdatas = [google_compute_global_address.primary.address]
}

# Create individual A records for each subdomain
# We cannot use a wildcard certificate because Google-managed certificates only support non-wildcard certificates
# More info here: https://cloud.google.com/kubernetes-engine/docs/how-to/managed-certs#limitations
resource "google_dns_record_set" "www_base" {
    managed_zone = google_dns_managed_zone.prod.name

    name = "www.${google_dns_managed_zone.prod.dns_name}"
    type = "A"
    ttl = 300
    rrdatas = [google_compute_global_address.primary.address]
}

resource "google_dns_record_set" "backend" {
    managed_zone = google_dns_managed_zone.prod.name

    name = "backend.${google_dns_managed_zone.prod.dns_name}"
    type = "A"
    ttl = 300
    rrdatas = [google_compute_global_address.primary.address]
}

resource "google_dns_record_set" "www_backend" {
    managed_zone = google_dns_managed_zone.prod.name

    name = "www.backend.${google_dns_managed_zone.prod.dns_name}"
    type = "A"
    ttl = 300
    rrdatas = [google_compute_global_address.primary.address]
}

resource "google_dns_record_set" "frontend" {
    managed_zone = google_dns_managed_zone.prod.name

    name = "app.${google_dns_managed_zone.prod.dns_name}"
    type = "A"
    ttl = 300
    rrdatas = [google_compute_global_address.primary.address]
}

resource "google_dns_record_set" "www_frontend" {
    managed_zone = google_dns_managed_zone.prod.name

    name = "www.app.${google_dns_managed_zone.prod.dns_name}"
    type = "A"
    ttl = 300
    rrdatas = [google_compute_global_address.primary.address]
}
