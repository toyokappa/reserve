#! /bin/bash

# エラーで処理中止
set -ex

env=$1
front_app_name="sympl-reserve"
api_app_name="sympl-reserve-api"

# 一旦環境変数へ格納
app_host=$(aws ssm get-parameters --names /${front_app_name}/${env}/app_host --with-decryption --query "Parameters[0].Value")
payjp_api_token=$(aws ssm get-parameters --names /${front_app_name}/${env}/payjp_api_token --with-decryption --query "Parameters[0].Value")
api_base_url=$(aws ssm get-parameters --names /${front_app_name}/${env}/api_base_url --with-decryption --query "Parameters[0].Value")
api_basic_user=$(aws ssm get-parameters --names /${api_app_name}/${env}/api_basic_user --with-decryption --query "Parameters[0].Value")
api_basic_pass=$(aws ssm get-parameters --names /${api_app_name}/${env}/api_basic_pass --with-decryption --query "Parameters[0].Value")

echo "export APP_HOST=$app_host" >> $BASH_ENV
echo "export PAYJP_API_TOKEN=$payjp_api_token" >> $BASH_ENV
echo "export API_BASE_URL=$api_base_url" >> $BASH_ENV
echo "export API_BASIC_USER=$api_basic_user" >> $BASH_ENV
echo "export API_BASIC_PASS=$api_basic_pass" >> $BASH_ENV