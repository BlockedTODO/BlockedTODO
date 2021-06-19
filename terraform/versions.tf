terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "3.25.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "3.25.0"
    }
  }
  required_version = ">= 0.13"
}
