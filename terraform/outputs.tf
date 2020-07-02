output "registry_bucket_url" {
    value = module.registry.registry_bucket_url
}

output "cluster_name" {
    value = module.cluster.cluster_name
}

output "cluster_location" {
    value = module.cluster.cluster_location
}

output "ingress_ip" {
    value = module.dns.ip_address
}

output "dns_name_servers" {
    value = module.dns.dns_name_servers
}

output "production_secret_id" {
    value = module.secrets.production_secret_id
}
