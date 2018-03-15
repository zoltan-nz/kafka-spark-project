# Setting up Kubernetes and Containers

[My Kubernetes Tutorial](https://github.com/zoltan-nz/kubernetes)

Setting up Kubernetes on macOS.

Install `docker`.

Install `minicube`:

```bash
$ brew cask install minicube
$ minikube version
```

Install `kubectl`:

```bash
$ brew install kubectl
```

## Creating a cluster

Make sure that the Docker daemon is started.

```bash
$ docker images
```

Note: [Use hyperkit instead of xhyve](https://github.com/kubernetes/minikube/blob/master/docs/drivers.md#hyperkit-driver)

```bash
curl -LO https://storage.googleapis.com/minikube/releases/latest/docker-machine-driver-hyperkit \
&& chmod +x docker-machine-driver-hyperkit \
&& sudo mv docker-machine-driver-hyperkit /usr/local/bin/ \
&& sudo chown root:wheel /usr/local/bin/docker-machine-driver-hyperkit \
&& sudo chmod u+s /usr/local/bin/docker-machine-driver-hyperkit
```

```bash
$ minikube start --vm-driver=hyperkit
$ minikube status
```

Deploy the Dashboard:

```bash
$ kubectl create -f https://raw.githubusercontent.com/kubernetes/dashboard/master/src/deploy/recommended/kubernetes-dashboard.yaml
$ minikube dashboard
```

```bash
$ kubectl version
$ kubectl cluster-info
$ kubectl get nodes
```

## Kafka Docker Container

* Most popular Kafka Docker Container: https://hub.docker.com/r/wurstmeister/kafka/
* About Kafka Connectivity: https://github.com/wurstmeister/kafka-docker/wiki/Connectivity

```
$ docker pull wurstmeister/kafka
```

`docker-compose.yml`: https://github.com/wurstmeister/kafka-docker/blob/master/docker-compose.yml


### Performance Test

```
$ kafka-producer-perf-test --num-records 3000000 --record-size 1024 --topic test_performance --throughput 100000 --producer-props bootstrap.servers=localhost:9092
```
