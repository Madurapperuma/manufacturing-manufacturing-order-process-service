#openfaas
FROM --platform=${TARGETPLATFORM:-linux/amd64} 328680294982.dkr.ecr.ap-southeast-1.amazonaws.com/openfaas/of-watchdog:0.7.2 as watchdog
ARG TARGETPLATFORM

#rapid base
FROM 328680294982.dkr.ecr.ap-southeast-1.amazonaws.com/rapid/rapid-base:latest as build

WORKDIR /usr/src/app
COPY . .
RUN npm run build

#rapid production
FROM 328680294982.dkr.ecr.ap-southeast-1.amazonaws.com/rapid/rapid-production:latest as prod

COPY --from=watchdog /fwatchdog /usr/bin/fwatchdog
RUN chmod +x /usr/bin/fwatchdog


WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist
RUN chown node:node -R /usr/src/app/dist
USER node

ENV cgi_headers="true"
ENV fprocess="node dist/main"
ENV mode="http"
ENV upstream_url="http://127.0.0.1:3080"

ENV exec_timeout="10s"
ENV write_timeout="15s"
ENV read_timeout="15s"

HEALTHCHECK --interval=3s CMD [ -e /tmp/.lock ] || exit 1

CMD ["fwatchdog"]

#CMD ["npm", "run", "start:prod"]
