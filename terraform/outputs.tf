output "registry_bucket_url" {
    value = module.registry.registry_bucket_url
}

output "db_connection_name" {
    value = module.storage.connection_name
}

output "db_public_ip_address" {
    value = module.storage.public_ip_address
}
