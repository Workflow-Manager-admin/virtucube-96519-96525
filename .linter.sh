#!/bin/bash
cd /home/kavia/workspace/code-generation/virtucube-96519-96525/main_container_for_virtu_cube
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

