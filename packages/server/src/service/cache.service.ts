import * as Redis from "ioredis";

export class CacheService {
  private client: Redis.Redis;

  constructor() {
    const connectionString = `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}`;
    const redis = new Redis(connectionString);

    redis.on("connect", () => console.log("Connetion to redis established"));

    redis.on("error", () =>
      console.log("Connetion to redis could not be established")
    );

    this.client = redis;
  }

  public get(key: string) {
    return this.client.get(key);
  }

  public set<T>(key: string, data: T, lifetime: number) {
    this.client.set(key, JSON.stringify(data), "EX", lifetime);
  }
}
