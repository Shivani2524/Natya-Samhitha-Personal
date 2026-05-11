import hashlib
import json
from typing import Any, Dict, Optional
from upstash_redis.asyncio import Redis
from ai_core.config import ai_settings

class CacheService:
    def __init__(self):
        self.url = ai_settings.UPSTASH_REDIS_REST_URL.strip('"\'') if ai_settings.UPSTASH_REDIS_REST_URL else ""
        self.token = ai_settings.UPSTASH_REDIS_REST_TOKEN.strip('"\'') if ai_settings.UPSTASH_REDIS_REST_TOKEN else ""
        self.client = None
        self.enabled = False

        if self.url and self.token:
            try:
                self.client = Redis(url=self.url, token=self.token)
                self.enabled = True
            except Exception as e:
                print(f"Failed to initialize Upstash Redis: {e}")

    def _generate_key(self, query: str) -> str:
        """Generate a consistent cache key for a given query."""
        normalized_query = query.strip().lower()
        query_hash = hashlib.md5(normalized_query.encode("utf-8")).hexdigest()
        return f"natya:query:{query_hash}"

    async def get_cached_query(self, query: str) -> Optional[Dict[str, Any]]:
        """Retrieve cached query response if available."""
        if not self.enabled or not self.client:
            return None
        
        key = self._generate_key(query)
        try:
            cached_data = await self.client.get(key)
            if cached_data:
                # upstash-redis auto-deserializes JSON if it can, but let's be safe
                if isinstance(cached_data, str):
                    return json.loads(cached_data)
                return cached_data
        except Exception as e:
            print(f"Cache GET error: {e}")
        return None

    async def set_cached_query(self, query: str, response_data: Dict[str, Any], ttl: int = 86400):
        """Store the query response in cache for `ttl` seconds."""
        if not self.enabled or not self.client:
            return
        
        key = self._generate_key(query)
        try:
            await self.client.set(key, json.dumps(response_data), ex=ttl)
        except Exception as e:
            print(f"Cache SET error: {e}")

# Global singleton
cache_service = CacheService()
