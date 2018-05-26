FROM alpine:3.7

# Install JAVA
ENV LANG C.UTF-8
ENV JAVA_HOME /usr/lib/jvm/java-1.8-openjdk
ENV PATH $PATH:/usr/lib/jvm/java-1.8-openjdk/jre/bin:/usr/lib/jvm/java-1.8-openjdk/bin
ENV JAVA_VERSION 8u171
ENV JAVA_ALPINE_VERSION 8.171.11-r0

RUN apk add --no-cache openjdk8="$JAVA_ALPINE_VERSION"

# Install Maven
ENV MAVEN_VERSION 3.5.3
ENV MAVEN_HOME /usr/lib/mvn
ENV PATH $MAVEN_HOME/bin:$PATH
ENV MAVEN_CONFIG /root/.m2

RUN wget http://archive.apache.org/dist/maven/maven-3/$MAVEN_VERSION/binaries/apache-maven-$MAVEN_VERSION-bin.tar.gz
RUN tar -zxvf apache-maven-$MAVEN_VERSION-bin.tar.gz
RUN rm apache-maven-$MAVEN_VERSION-bin.tar.gz
RUN mv apache-maven-$MAVEN_VERSION /usr/lib/mvn

# Copy our maven settings.xml
COPY settings.xml /usr/lib/mvn/conf/


# Create an app folder
RUN mkdir -p /app
WORKDIR /app

# Build and run the app
COPY . /app
RUN mvn clean install