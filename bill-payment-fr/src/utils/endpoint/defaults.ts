import { Method } from "axios";

export const defaults = {
    methods: {
      GET: { method: 'GET' as Method},
      POST: { method: 'POST' as Method},
      PUT: { method: 'PUT' as Method},
      DELETE: { method: 'DELETE' as Method},
    },
  
    versions: {
      v1: { version: '' },
    },
  };