For CodeBuild section, I didn't need to provide a yml file as i didn't create a front end app that needs to pull latest versions (ex: nodejs, npm)
I just put echo "test" in the codebuild section. 


Skipped the codeBuild portion as it's only used when a framework or such is involved
that requires a comile stage.

sample deploy stage configuration:
Action provider: Amazon S3
Region: [Your bucket's region]
Bucket: your-website-bucket
S3 object key: [Leave empty for root deployment]
Extract file before deploy: Yes
