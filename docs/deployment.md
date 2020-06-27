# Prerequisites
1. Install Terraform

# Set up on Google Cloud Platform

1. Create a GCP project.
2. Purchase a domain.
3. Verify domain ownership on GCP.
4. Set up a service account as per the instructions [here](https://learn.hashicorp.com/terraform/gcp/build). Give it `owner` permissions.
5. Due to limitations with terraform and GCP, there is one manual step to perform on Github prior to running terraform:
    Enable the cloud build app from github (but don't add the build trigger manually on GCP).
6. Use terraform and specify all the variables listed in the `terraform/variables.tf` file to generate everything.
7. Add the following roles to the cloud build service account: `Service Account User`, `Secret Manager Secret Accessor`.
