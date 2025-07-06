#!/bin/bash
cd /home/kavia/workspace/code-generation/goalpath-tracker-107883-8c1e3e98/goal_roadmap_visualizer_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

