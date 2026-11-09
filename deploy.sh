#!/bin/bash
set -e

echo "Deploying celiol.cloud..."
cd /var/www/celiol.cloud
git fetch origin main
git reset --hard origin/main
chown -R www-data:www-data /var/www/celiol.cloud
systemctl reload nginx
echo "Deployment successful!"
