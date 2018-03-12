# Setting up Kubernetes and Containers

[My Kubernetes Tutorial](https://github.com/zoltan-nz/kubernetes)

Setup Docker and VM support:

```
$ brew install docker-machine-driver-xhyve
$ brew info docker-machine-driver-xhyve
```

Install `minicube`:

```
$ brew cask install minicube
$ minikube version
```

Install `kubectl`:

```
$ brew install kubectl
```

## Creating a cluster

```
$ minikube version
```

Make sure that the Docker daemon is started.

```
$ docker images
```

Note: [Use hyperkit instead of xhyve](https://github.com/kubernetes/minikube/blob/master/docs/drivers.md#hyperkit-driver)

```
minikube start --vm-driver=hyperkit
```

```
$ minikube status
```

```
$ kubectl version
$ kubectl cluster-info
$ kubectl get nodes
```
