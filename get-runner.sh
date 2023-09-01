#!/bin/bash
mkdir actions-runner && cd actions-runner
wget -q "$(curl -s https://api.github.com/repos/actions/runner/releases/latest | grep url | cut -d\" -f4 | grep 'actions-runner-linux-x64-[0-9.]\+tar.gz')"
tar xzf ./actions-runner-linux-x64-*.tar.gz