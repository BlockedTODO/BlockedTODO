output "connection_name" {
    value = google_sql_database_instance.instance.connection_name
}

output "public_ip_address" {
    value = google_sql_database_instance.instance.public_ip_address
}

output "self_link" {
    value = google_sql_database_instance.instance.self_link
}
