## Refresh Testing Site plunkd
aws cloudfront create-invalidation --distribution-id E9Q4ST2D9O5M4 --paths "/*"

## Refresh Testing Site smd
aws s3 cp /Users/cott/Repos/spudfund/spudweb/build/ s3://tatertech.net --recursive
aws s3 cp /Users/cott/Repos/spudfund/spudweb/data/perf.csv s3://spudfund.tatertech.net/data/perf.csv

aws cloudfront create-invalidation --distribution-id E3L4ZAXBM4Y7RU --paths "/*"

