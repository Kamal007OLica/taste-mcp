#!/usr/bin/env node
// Local stdio transport: claude mcp add taste -- npx -y github:Kamal007OLica/taste-mcp
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createServer } from '../src/create-server.js';

await createServer().connect(new StdioServerTransport());
