const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
const express = require('express');
const axios = require('axios');

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  const app = express();

  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  http.createServer(app).listen(8000);

  const axios = require('axios');

  setTimeout(()=>{
    async function sendRequests() {
      const requests = [];
      for (let i = 0; i < 10; i++) {
        requests.push(axios.get('http://localhost:8000/'));
      }
      await Promise.all(requests);
      console.log('All requests completed.');
    }
  
    sendRequests();
  },2000)


  console.log(`Worker ${process.pid} started`);
}
// const express = require('express');

// const app = express();

// // Define a route
// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// // Start the server
// const port = 8000;
//   setTimeout(()=>{
//     async function sendRequests() {
//       const requests = [];
//       for (let i = 0; i < 10; i++) {
//         requests.push(axios.get('http://localhost:8000/'));
//       }
//       await Promise.all(requests);
//       console.log('All requests completed.');
//     }
  
//     sendRequests();
//   },2000)
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
