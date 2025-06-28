#!/bin/bash
cd /home/kavia/workspace/code-generation/quicknotes-94677-26223437/quicknotes_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

