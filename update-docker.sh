sudo sh build.sh
sudo docker stop personal_site
sudo docker rm personal_site
sudo docker run --name personal_site -d -p 80:80 personal_site_image
