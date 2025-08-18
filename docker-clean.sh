#!/bin/bash
echo "🧹 Cleaning up Docker containers and networks..."

# Stop all running containers
docker stop $(docker ps -q) 2>/dev/null

# Remove all containers (running + stopped)
docker rm $(docker ps -aq) 2>/dev/null

# Remove dangling networks
docker network prune -f

echo "✅ Docker cleanup complete!"
