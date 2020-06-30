# Prerequisites
1. Install Terraform

# Set up on Google Cloud Platform

1. Create a GCP project.
2. Purchase a domain.
3. Verify domain ownership on GCP.
4. Set Google cloud DNS as the nameserver. Instructions for namecheap on step 3 of [this page](https://www.typeeighty.com/add-domain-google-cloud/) (make sure nameservers match the ones on gcloud DNS for your dns zone)
5. Set up a service account as per the instructions [here](https://learn.hashicorp.com/terraform/gcp/build). Give it `owner` permissions.
6. Due to limitations with terraform and GCP, there is one manual step to perform on Github prior to running terraform:
    Enable the cloud build app from github (but don't add the build trigger manually on GCP).
7. Use terraform and specify all the variables listed in the `terraform/variables.tf` file to generate everything.
8. Add the following [cloud build service account roles](https://console.cloud.google.com/cloud-build/settings/service-account): `Kubernetes Engine Developer`, `Secret Manager Secret Accessor`.
9. Specify production values on [secret manager](https://console.cloud.google.com/security/secret-manager). See [helm/values.yaml](../helm/values.yaml) for details.
10. Create the helm community builder from the cloud console (see comment in [cloudbuild.yaml](../cloudbuild.yaml))
11. Read error messages to know which APIs to enable, quota increases, and for other potentially missing IAM permissions.
