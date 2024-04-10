REPO	:= zeusfyi
NAME    := mockingbird-ui
GIT_SHA := $(shell git rev-parse HEAD)
IMG     := ${REPO}/${NAME}:${GIT_SHA}
LATEST  := ${REPO}/${NAME}:latest
GOMODCACHE := $(shell go env GOMODCACHE)
GOCACHE := $(shell go env GOCACHE)
GOOS 	:= linux
GOARCH  := amd64

## --push

docker.pubbuildx:
	@ docker buildx build -t ${IMG} -t ${LATEST} --build-arg GOOS=${GOOS} --build-arg GOARCH=${GOARCH} --no-cache --platform=${GOOS}/${GOARCH} -f docker/Dockerfile .


