#!/bin/bash

set -ex

BASH_HISTORY_PATH=".devcontainer/bun/root/.bash_history"
if [ ! -f $BASH_HISTORY_PATH ]; then
		touch $BASH_HISTORY_PATH
fi

BASHRC_EXAMPLE_PATH=".devcontainer/bun/root/.bashrc.example"
BASHRC_PATH=".devcontainer/bun/root/.bashrc"
if [ ! -f $BASHRC_PATH ]; then
		cp $BASHRC_EXAMPLE_PATH $BASHRC_PATH
fi
