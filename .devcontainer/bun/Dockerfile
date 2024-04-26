FROM mcr.microsoft.com/vscode/devcontainers/base:bullseye

ENV BUN_INSTALL=/bun
ENV PATH=${BUN_INSTALL}/bin:${PATH}

RUN mkdir -p ${BUN_INSTALL} && curl -fsSL https://bun.sh/install | bash
