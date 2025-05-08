const amqp = require("amqplib");

// RabbitMQ configuration
const rabbitmqConfig = {
  url: process.env.RABBITMQ_URL || "amqp://localhost",
  exchanges: {
    moderator: "tmt.moderator",
  },
  queues: {
    moderationRequests: "tmt.moderation.requests",
    moderationResults: "tmt.moderation.results",
  },
};

// Connection management
let connection = null;
let channel = null;

// Only connect in production or if explicitly enabled
const shouldUseRabbitMQ =
  process.env.USE_RABBITMQ === "true" || process.env.NODE_ENV === "production";

/**
 * Connect to RabbitMQ
 */
async function connect() {
  if (!shouldUseRabbitMQ) {
    console.log(
      "RabbitMQ is disabled in development mode. Using mock implementation."
    );
    return;
  }

  try {
    connection = await amqp.connect(rabbitmqConfig.url);
    channel = await connection.createChannel();

    // Setup exchanges
    await channel.assertExchange(rabbitmqConfig.exchanges.moderator, "direct", {
      durable: true,
    });

    // Setup queues
    await channel.assertQueue(rabbitmqConfig.queues.moderationRequests, {
      durable: true,
    });
    await channel.assertQueue(rabbitmqConfig.queues.moderationResults, {
      durable: true,
    });

    // Bind queues to exchange
    await channel.bindQueue(
      rabbitmqConfig.queues.moderationRequests,
      rabbitmqConfig.exchanges.moderator,
      "request"
    );
    await channel.bindQueue(
      rabbitmqConfig.queues.moderationResults,
      rabbitmqConfig.exchanges.moderator,
      "result"
    );

    console.log("Connected to RabbitMQ");

    // Handle connection closure
    connection.on("close", () => {
      console.log("RabbitMQ connection closed. Attempting to reconnect...");
      setTimeout(connect, 5000);
    });
  } catch (error) {
    console.error("RabbitMQ connection error:", error);
    console.log("Attempting to reconnect in 5 seconds...");
    setTimeout(connect, 5000);
  }
}

// Mock implementations for development
const mockQueue = {
  messages: [],
  push: (message) => {
    mockQueue.messages.push(message);
    return Promise.resolve();
  },
  consume: (callback) => {
    setInterval(() => {
      if (mockQueue.messages.length > 0) {
        const message = mockQueue.messages.shift();
        callback({ content: Buffer.from(JSON.stringify(message)) });
      }
    }, 1000);
    return Promise.resolve();
  },
};

/**
 * Publish message to RabbitMQ
 * @param {string} exchange - Exchange name
 * @param {string} routingKey - Routing key
 * @param {Object} message - Message to publish
 */
async function publish(exchange, routingKey, message) {
  if (!shouldUseRabbitMQ) {
    console.log(`Mock RabbitMQ publish: ${exchange} -> ${routingKey}`, message);
    return mockQueue.push(message);
  }

  if (!channel) {
    throw new Error("RabbitMQ channel not established");
  }

  return channel.publish(
    exchange,
    routingKey,
    Buffer.from(JSON.stringify(message)),
    { persistent: true }
  );
}

/**
 * Consume messages from a queue
 * @param {string} queue - Queue name
 * @param {Function} callback - Message handler
 */
async function consume(queue, callback) {
  if (!shouldUseRabbitMQ) {
    console.log(`Mock RabbitMQ consume: ${queue}`);
    return mockQueue.consume(callback);
  }

  if (!channel) {
    throw new Error("RabbitMQ channel not established");
  }

  return channel.consume(queue, (msg) => {
    if (msg) {
      const content = JSON.parse(msg.content.toString());
      callback(content);
      channel.ack(msg);
    }
  });
}

// Initialize the connection if enabled
if (shouldUseRabbitMQ) {
  connect().catch(console.error);
}

module.exports = {
  config: rabbitmqConfig,
  connect,
  publish,
  consume,
};
