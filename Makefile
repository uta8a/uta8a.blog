ARG=''

new:
	bash ./script.sh content/${ARG}

img:
	rsync -av --progress ./content/ ./public/content/ --exclude=*.md
