# latest = latest
version=latest
docker-user=jaredhanson11
name=${docker-user}/pigeon-backend

build:
	docker build . --build-arg PIP_EXTRA_INDEX_URL=${PIP_EXTRA_INDEX_URL} -t ${name}:${version}
push: build
	docker push ${name}:${version}
