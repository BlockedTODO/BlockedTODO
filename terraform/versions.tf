terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "3.72.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "3.72.0"
    }
  }
  required_version = ">= 0.13"
}
