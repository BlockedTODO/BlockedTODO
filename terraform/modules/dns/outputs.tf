output "ip_address" {
    value = google_compute_global_address.primary.address
}

output "dns_name_servers" {
    value = google_dns_managed_zone.prod.name_servers
}
